const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

const fetchAPI = async (endpoint: string, options: FetchOptions = {}): Promise<any> => {
  const token = localStorage.getItem('token');
  
  const config: FetchOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    console.log('🔵 Requisição:', {
      url: `${API_BASE_URL}${endpoint}`,
      method: options.method || 'GET',
      headers: config.headers,
      body: options.body
    });

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // ✅ Verificar se a resposta é JSON antes de tentar parsear
    const contentType = response.headers.get('content-type');
    console.log('📄 Content-Type:', contentType);
    
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('❌ Resposta não é JSON:', text.substring(0, 200));
      
      if (response.status === 401) {
        throw new Error('Sessão expirada. Faça login novamente.');
      }
      
      if (response.status === 404) {
        throw new Error(`Rota não encontrada: ${endpoint}`);
      }
      
      throw new Error(`API retornou HTML em vez de JSON. Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log('🟢 Resposta da API:', {
      status: response.status,
      ok: response.ok,
      data: data
    });
    
    if (!response.ok) {
      console.error('❌ Erro na resposta:', data);
      throw new Error(data.message || 'Erro na requisição');
    }
    
    return data;
  } catch (error) {
    console.error('❌ Erro na API:', error);
    throw error;
  }
};

// ✅ Login com validação de resposta
export const login = async (credentials: { email: string; password: string }): Promise<any> => {
  const response = await fetchAPI('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  
  console.log('🔐 Dados de login recebidos:', response);
  
  // ✅ Extrair dados do objeto "data" retornado pelo Laravel
  const { data } = response;
  
  if (!data || !data.token || !data.user) {
    console.error('⚠️ Dados inválidos na resposta!', response);
    throw new Error('Resposta da API inválida: token ou usuário não encontrados');
  }
  
  // ✅ Retornar no formato esperado pelo AuthContext
  return {
    token: data.token,
    user: data.user
  };
};

export const register = async (userData: { name: string; email: string; password: string }): Promise<any> => {
  const response = await fetchAPI('/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  
  console.log('📝 Dados de registro recebidos:', response);
  
  // ✅ Extrair dados do objeto "data" retornado pelo Laravel
  const { data } = response;
  
  if (!data || !data.token || !data.user) {
    console.error('⚠️ Dados inválidos na resposta!', response);
    throw new Error('Resposta da API inválida');
  }
  
  // ✅ Retornar no formato esperado pelo AuthContext
  return {
    token: data.token,
    user: data.user
  };
};

export const logout = async (): Promise<any> => {
  return fetchAPI('/logout', { method: 'POST' });
};

export const getProducts = async (): Promise<any> => {
  return fetchAPI('/products');
};

export const getProduct = async (id: number): Promise<any> => {
  return fetchAPI(`/products/${id}`);
};

export const createProduct = async (productData: any): Promise<any> => {
  return fetchAPI('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });
};

export const updateProduct = async (id: number, productData: any): Promise<any> => {
  return fetchAPI(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
};

export const deleteProduct = async (id: number): Promise<any> => {
  return fetchAPI(`/products/${id}`, { method: 'DELETE' });
};

export const getCart = async (): Promise<any> => {
  console.log('📥 getCart - Buscando carrinho...');
  
  const response = await fetchAPI('/cart');
  
  console.log('📥 getCart - Resposta completa:', JSON.stringify(response, null, 2));
  
  return response;
};

export const addToCart = async (product_id: number, quantity: number): Promise<any> => {
  console.log('🛒 addToCart - Parâmetros:', { product_id, quantity });
  
  const response = await fetchAPI('/cart/add', {
    method: 'POST',
    body: JSON.stringify({ product_id, quantity }),
  });
  
  console.log('🛒 addToCart - Resposta completa:', JSON.stringify(response, null, 2));
  
  return response;
};

export const removeFromCart = async (product_id: number): Promise<any> => {
  return fetchAPI('/cart/remove', {
    method: 'DELETE',
    body: JSON.stringify({ product_id }),
  });
};

export const clearCart = async (): Promise<any> => {
  return fetchAPI('/cart/clear', { method: 'DELETE' });
};

export const checkout = async (): Promise<any> => {
  return fetchAPI('/checkout', { method: 'POST' });
};

export const getMyOrders = async (): Promise<any> => {
  return fetchAPI('/my-orders');
};