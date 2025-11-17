import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { login as loginAPI, register as registerAPI, logout as logoutAPI } from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<any>;
  register: (userData: { name: string; email: string; password: string }) => Promise<any>;
  logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Carregar dados do localStorage quando o componente monta
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    console.log('🔄 Carregando dados do localStorage:', { storedToken, storedUser });
    
    // ✅ Verificar se os valores existem E não são "undefined" (string)
    if (storedToken && storedToken !== 'undefined' && storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('✅ Usuário carregado:', parsedUser);
        setUser(parsedUser);
        setToken(storedToken);
      } catch (error) {
        console.error('❌ Erro ao parsear usuário do localStorage:', error);
        // Limpar dados corrompidos
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } else {
      console.log('⚠️ Sem dados válidos no localStorage');
      // Limpar qualquer dado inválido
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      console.log('🔐 Iniciando login...');
      const data = await loginAPI(credentials);
      
      console.log('📦 Resposta do login:', data);
      
      // ✅ Validar se a resposta tem os dados necessários
      if (!data || !data.token || !data.user) {
        console.error('❌ Resposta inválida da API:', data);
        throw new Error('Dados de login incompletos. Verifique sua API.');
      }
      
      // ✅ Salvar no localStorage
      console.log('💾 Salvando no localStorage:', {
        token: data.token,
        user: data.user
      });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // ✅ Atualizar o estado
      setToken(data.token);
      setUser(data.user);
      
      console.log('✅ Login concluído com sucesso!');
      
      return data;
    } catch (error) {
      console.error('❌ Erro no login:', error);
      throw error;
    }
  };

  const register = async (userData: { name: string; email: string; password: string }) => {
    try {
      console.log('📝 Iniciando registro...');
      const data = await registerAPI(userData);
      
      console.log('📦 Resposta do registro:', data);
      
      // ✅ Validar resposta
      if (!data || !data.token || !data.user) {
        console.error('❌ Resposta inválida da API:', data);
        throw new Error('Dados de registro incompletos. Verifique sua API.');
      }
      
      // ✅ Salvar no localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // ✅ Atualizar estado
      setToken(data.token);
      setUser(data.user);
      
      console.log('✅ Registro concluído com sucesso!');
      
      return data;
    } catch (error) {
      console.error('❌ Erro no registro:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 Fazendo logout...');
      await logoutAPI();
    } catch (error) {
      console.error('⚠️ Erro ao fazer logout na API:', error);
    } finally {
      // ✅ Sempre limpar dados locais
      console.log('🧹 Limpando dados locais...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      console.log('✅ Logout concluído!');
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.is_admin || false,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};