import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Ajusta la ruta si tu AuthContext está en otro lugar
import { loginUser } from '../../services/authService'; // Ajusta la ruta a tu authService

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // Obtén la función login del contexto

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Limpiar errores previos
    setIsLoading(true);

    try {
      // Llama al servicio de login con las credenciales
      const { user, token } = await loginUser({ email, password });

      // Llama a la función login del AuthContext para actualizar el estado global
      login(user, token);

      // Redirige al dashboard o a la página principal después de un login exitoso
      navigate('/dashboard', { replace: true }); // 'replace: true' evita que esta página de login quede en el historial de navegación

    } catch (err: any) {
      // Manejo de errores desde la API
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md" role="alert">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="email-login" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email address
        </label>
        <input
          id="email-login" // ID único para el campo de email en este formulario
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-apple-blue focus:border-apple-blue sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-70"
        />
      </div>

      <div>
        <label htmlFor="password-login" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          id="password-login" // ID único para el campo de contraseña
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-apple-blue focus:border-apple-blue sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-70"
        />
      </div>

      {/* Podrías añadir un enlace de "¿Olvidaste tu contraseña?" aquí si lo implementas */}
      {/* <div className="flex items-center justify-end">
        <div className="text-sm">
          <a href="#" className="font-medium text-apple-blue hover:text-opacity-80 dark:hover:text-blue-400">
            Forgot your password?
          </a>
        </div>
      </div> */}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-apple-blue hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-apple-blue disabled:opacity-60 disabled:cursor-not-allowed transition-opacity duration-150"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;