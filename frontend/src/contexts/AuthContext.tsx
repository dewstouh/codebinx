import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
  useContext,
} from 'react';
import { type IUserResponse } from '@codebinx/shared'; // Asegúrate que la ruta a tus tipos compartidos sea correcta
import { getItem, setItem, removeItem } from '../utils/localStorage'; // Asumiendo que este archivo existe en src/utils/
import api from '../services/apiService'; // Tu instancia de Axios configurada
import { getProfile as fetchUserProfileService } from '../services/authService'; // Servicio para obtener el perfil

interface AuthContextType {
  isAuthenticated: boolean;
  user: IUserResponse | null;
  token: string | null;
  isLoading: boolean; // Para el estado de carga inicial y durante operaciones async
  login: (userData: IUserResponse, token: string) => void;
  logout: () => void;
  handleGoogleToken: (googleToken: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateUserSession = useCallback(
    (userData: IUserResponse | null, authToken: string | null) => {
      setUser(userData);
      setToken(authToken);
      if (authToken && userData) {
        setItem<string>('authToken', authToken);
        setItem<IUserResponse>('authUser', userData); // Opcional, pero puede evitar un fetch inicial
        api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      } else {
        removeItem('authToken');
        removeItem('authUser');
        delete api.defaults.headers.common['Authorization'];
      }
    },
    []
  );

  useEffect(() => {
    const attemptAutoLogin = async () => {
      const storedToken = getItem<string>('authToken');
      if (storedToken) {
        try {
          const userProfile = await fetchUserProfileService(); // Usa el servicio de getProfile
          updateUserSession(userProfile, storedToken);
        } catch (error) {
          console.error('Auto login failed, token might be invalid:', error);
          updateUserSession(null, null); // Limpiar sesión si el token es inválido
        }
      }
      setIsLoading(false);
    };

    attemptAutoLogin();
  }, [updateUserSession]);

  const login = useCallback(
    (userData: IUserResponse, authToken: string) => {
      updateUserSession(userData, authToken);
    },
    [updateUserSession]
  );

  const logout = useCallback(() => {
    updateUserSession(null, null);
    // Aquí podrías redirigir o hacer otras limpiezas.
    // Ejemplo: window.location.href = '/login'; (si no usas useNavigate aquí)
  }, [updateUserSession]);

  const handleGoogleToken = useCallback(
    async (googleToken: string) => {
      setIsLoading(true);
      try {
        // Establecer temporalmente el token para que la llamada a getProfile lo use
        api.defaults.headers.common['Authorization'] = `Bearer ${googleToken}`;
        const userProfile = await fetchUserProfileService(); // El backend ya ha creado/asociado al usuario
        updateUserSession(userProfile, googleToken);
      } catch (error) {
        console.error('Failed to process Google token and fetch profile:', error);
        updateUserSession(null, null); // Limpiar en caso de error
        throw error; // Re-lanzar para página de login pueda manejarlo
      } finally {
        setIsLoading(false);
      }
    },
    [updateUserSession]
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        user,
        token,
        isLoading,
        login,
        logout,
        handleGoogleToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};