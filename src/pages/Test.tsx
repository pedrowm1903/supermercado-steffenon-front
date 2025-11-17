import { useState, useEffect } from 'react';
import * as api from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
}

export default function Test() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, login, logout, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      alert('Login realizado com sucesso!');
    } catch (err: any) {
      alert('Erro no login: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🧪 Teste de Conexão Backend + Frontend</h1>
      
      <div style={{ background: '#f0f0f0', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
        <h2>Status de Autenticação</h2>
        {isAuthenticated ? (
          <div>
            <p>✅ Usuário logado: <strong>{user?.name}</strong></p>
            <p>Email: {user?.email}</p>
            <p>Admin: {user?.is_admin ? 'Sim' : 'Não'}</p>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div>
            <p>❌ Não autenticado</p>
            <form onSubmit={handleLogin}>
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginRight: '10px', padding: '5px' }}
              />
              <input 
                type="password" 
                placeholder="Senha" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginRight: '10px', padding: '5px' }}
              />
              <button type="submit">Login</button>
            </form>
          </div>
        )}
      </div>

      <div>
        <h2>Produtos da API</h2>
        {loading && <p>Carregando produtos...</p>}
        {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
        
        {!loading && !error && products.length === 0 && (
          <p>Nenhum produto encontrado.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
            {products.map(product => (
              <div key={product.id} style={{ 
                border: '1px solid #ddd', 
                padding: '15px', 
                borderRadius: '8px',
                background: 'white'
              }}>
                {product.image_url && (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                )}
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><strong>R$ {parseFloat(String(product.price)).toFixed(2)}</strong></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}