import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm'; // Asegúrate que esta ruta sea correcta
import { useAuth } from '../contexts/AuthContext'; // Asegúrate que esta ruta sea correcta

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authIsLoading, user } = useAuth();

  // Redirigir si ya está autenticado y la información del usuario está cargada
  useEffect(() => {
    if (isAuthenticated && user && !authIsLoading) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, authIsLoading, navigate]);

  // Si AuthContext todavía está cargando la sesión inicial, muestra un loader
  // Esto evita un "flash" de la página de registro si el usuario ya tiene una sesión válida.
  if (authIsLoading) {
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
            Create your Account
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Join CodeBinX to save and manage your bins.
          </p>
        </div>

        <RegisterForm />

        <p className="mt-8 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-apple-blue hover:underline dark:hover:text-blue-400">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;