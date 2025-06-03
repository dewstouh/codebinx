import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm'; // Asegúrate que esta ruta sea correcta
import { useAuth } from '../contexts/AuthContext';

// Icono de Google SVG (puedes moverlo a un archivo de assets si prefieres)
const GoogleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" {...props}>
    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.3 512 0 401.8 0 265.5S110.3 19 244 19c70.8 0 132.9 30.2 177.2 77.2l-63.1 61.9C329.5 130.1 290.8 110 244 110c-73.1 0-133.2 59.4-133.2 132.3s59.9 132.3 133.2 132.3c83.4 0 119.3-60.3 123.5-90.7H244v-74.3h234.3c2.5 11.3 4.7 23 4.7 35.8z"></path>
  </svg>
);

const LoginPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleGoogleToken, isAuthenticated, isLoading: authIsLoading, user } = useAuth();
  const [pageError, setPageError] = useState<string | null>(null); // Para errores específicos de la página (ej. Google Auth)

  // Redirigir si ya está autenticado y la información del usuario está cargada
  useEffect(() => {
    if (isAuthenticated && user && !authIsLoading) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, authIsLoading, navigate]);

  // Manejar el token de Google o errores del callback
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromGoogle = queryParams.get('token');
    const errorFromGoogle = queryParams.get('error');

    // Limpiar los parámetros de la URL después de leerlos para evitar reprocesamiento
    if (tokenFromGoogle || errorFromGoogle) {
      navigate('/login', { replace: true });
    }

    if (errorFromGoogle) {
      console.error('Google Auth Error on callback:', errorFromGoogle);
      setPageError(`Google authentication failed: ${errorFromGoogle === 'auth_failed' ? 'Authentication process failed.' : errorFromGoogle}`);
      return;
    }

    if (tokenFromGoogle && !authIsLoading && !isAuthenticated) {
      // Muestra un estado de carga específico para el proceso de Google
      setPageError(null); // Limpiar errores previos
      handleGoogleToken(tokenFromGoogle)
        .then(() => {
          // La redirección al dashboard ocurrirá por el primer useEffect cuando isAuthenticated y user se actualicen.
        })
        .catch((err) => {
          console.error('Failed to process Google token:', err);
          setPageError('Failed to log in with Google. Please try again.');
        });
    }
  }, [location.search, navigate, handleGoogleToken, authIsLoading, isAuthenticated]);

  // Si AuthContext todavía está cargando la sesión inicial, muestra un loader
  if (authIsLoading && !pageError && !(new URLSearchParams(location.search).get('token'))) {
     // Evita mostrar el loader si estamos procesando un token de Google para no interrumpir el flujo
    return (
      <div className="min-h-screen flex items-center justify-center bg-apple-gray-light dark:bg-apple-gray-dark">
        <p className="text-lg dark:text-white">Loading...</p> {/* Podrías usar un spinner aquí */}
      </div>
    );
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-apple-gray-light dark:bg-apple-gray-dark p-4 selection:bg-apple-blue selection:text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
        <div className="text-center">
          <Link to="/" className="inline-block text-3xl font-bold text-apple-gray-dark dark:text-white">
            CodeBin<span className="text-apple-blue">X</span>
          </Link>
          <h2 className="mt-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Login to your account
          </h2>
        </div>

        {pageError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{pageError}</span>
          </div>
        )}

        <LoginForm />

        <div className="my-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 dark:border-gray-600 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
          <p className="mx-4 mb-0 text-center font-semibold text-gray-500 dark:text-gray-400">OR</p>
        </div>

        <a
          href={`${import.meta.env.VITE_API_BASE_URL}/auth/google`}
          className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-apple-blue transition-colors duration-150"
        >
          <GoogleIcon className="w-5 h-5 mr-3" />
          Sign in with Google
        </a>

        <p className="mt-8 text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-apple-blue hover:underline dark:hover:text-blue-400">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;