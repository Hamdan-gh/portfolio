import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('Attempting login with:', email);

    try {
      const response = await login(email, password);
      console.log('Login successful:', response);
      toast.success('Login successful!');
      
      // Small delay to ensure state is updated
      setTimeout(() => {
        navigate('/admin');
      }, 100);
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-gray-400">Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-400">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark-200 border border-primary/30 rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-400 hover:text-primary">
            ← Back to Home
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
