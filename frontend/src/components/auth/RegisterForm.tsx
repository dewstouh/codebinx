import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Ajusta la ruta si es necesario
import { registerUser } from '../../services/authService'; // Ajusta la ruta a tu authService

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // Usamos 'login' del AuthContext ya que el registro también autentica

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        setIsLoading(false);
        return;
    }
    // Puedes añadir más validaciones del lado del cliente aquí si lo deseas
    // aunque el backend ya las tiene.

    try {
      const { user, token } = await registerUser({ username, email, password });
      login(user, token); // Actualiza el AuthContext con el nuevo usuario y token
      navigate('/dashboard', { replace: true }); // Redirige al dashboard

    } catch (err: any) {
      if (err.response && err.response.data) {
        if (err.response.data.errors && Array.isArray(err.response.data.errors)) {
          // Muestra errores de validación del backend
          const validationErrors = err.response.data.errors.map((e: { msg: string }) => e.msg).join(' ');
          setError(validationErrors || 'Registration failed. Please check your input.');
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Registration failed. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md" role="alert">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="username-register" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Username
        </label>
        <input
          id="username-register"
          name="username"
          type="text"
          autoComplete="username"
          required
          minLength={3}
          maxLength={30}
          pattern="^[a-zA-Z0-9_]+$" // Coincide con la validación del backend
          title="Username must be 3-30 characters and contain only letters, numbers, and underscores."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-apple-blue focus:border-apple-blue sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-70"
        />
      </div>

      <div>
        <label htmlFor="email-register" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email address
        </label>
        <input
          id="email-register"
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
        <label htmlFor="password-register" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          id="password-register"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6} // Coincide con la validación del backend
          title="Password must be at least 6 characters long."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-apple-blue focus:border-apple-blue sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-70"
        />
         <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Must be at least 6 characters long.</p>
      </div>

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
              Registering...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;