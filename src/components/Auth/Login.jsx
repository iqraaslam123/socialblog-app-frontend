import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setBgPosition({ x: e.clientX * 0.02, y: e.clientY * 0.02 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ FIXED: /auth/login → /api/auth/login
      const { data } = await axios.post(`${API}/api/auth/login`, form);
      login(data.token, data.user);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `Welcome back, ${data.user.username}! 👋`,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        background: 'var(--theme-bg)',
        color: 'var(--text-color)',
        iconColor: 'var(--primary)'
      });
      navigate('/');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.response?.data?.message || 'Invalid credentials',
        confirmButtonColor: 'var(--primary)',
        background: 'var(--theme-bg)',
        color: 'var(--text-color)'
      });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, when: 'beforeChildren', staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  const floatingIcons = ['🌟', '✨', '⭐', '💫', '⚡', '🔥'];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex relative overflow-hidden"
      style={{ background: 'var(--theme-bg)' }}
    >
      {/* Animated Background Pattern */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          transform: `translate(${bgPosition.x}px, ${bgPosition.y}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, var(--primary) 1px, transparent 1px), radial-gradient(circle at 80% 20%, var(--primary) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            opacity: 0.1
          }}
        />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0 }}
            animate={{ y: [null, -30, 0, 30, 0], x: [null, 20, -20, 10, 0], rotate: [0, 10, -10, 5, 0], opacity: [0.2, 0.5, 0.3, 0.4, 0.2] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: 'easeInOut' }}
            style={{ left: `${(i * 15) % 100}%`, top: `${(i * 12) % 100}%` }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* Left Decorative Panel */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="hidden lg:flex w-1/2 flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'var(--primary)' }}
      >
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, white 2px, transparent 2px), radial-gradient(circle at 80% 20%, white 2px, transparent 2px)',
              backgroundSize: '60px 60px'
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <motion.div
          className="relative z-10 text-center text-white px-12"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className="text-7xl mb-6"
            animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            ✦
          </motion.div>
          <motion.h1
            className="text-6xl font-black mb-4 leading-tight"
            animate={{ textShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 20px rgba(255,255,255,0.5)', '0 0 0px rgba(255,255,255,0)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Social<br />App
          </motion.h1>
          <p className="text-xl opacity-90 font-light">Connect. Share. Discover.</p>
          <motion.div
            className="mt-10 flex gap-4 justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {['🌍', '💬', '❤️', '📸', '🎨', '✨'].map((emoji, i) => (
              <motion.div
                key={i}
                className="w-12 h-12 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center text-2xl backdrop-blur-sm cursor-pointer"
                whileHover={{ scale: 1.2, rotate: 5, backgroundColor: 'rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.9 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ delay: i * 0.1, repeat: Infinity, duration: 2 }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right Login Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="w-full lg:w-1/2 flex items-center justify-center px-6 relative z-10"
      >
        <motion.div className="w-full max-w-md" variants={containerVariants} initial="hidden" animate="visible">
          {/* Header */}
          <motion.div className="text-center mb-10" variants={itemVariants}>
            <motion.h2 className="text-4xl font-black mb-2" style={{ color: 'var(--primary)' }} whileHover={{ scale: 1.05 }}>
              Welcome back
            </motion.h2>
            <p className="text-gray-500 dark:text-gray-400">Sign in to your account</p>
          </motion.div>

          <motion.form onSubmit={handleSubmit} className="space-y-5" variants={itemVariants}>

            {/* ✅ Email Field — improved with icon */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Email
              </label>
              <motion.div
                className="relative"
                animate={{ scale: focusedField === 'email' ? 1.02 : 1, transition: { type: 'spring', stiffness: 300 } }}
              >
                {/* Mail Icon */}
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focusedField === 'email' ? 'var(--primary)' : '#9ca3af' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border-2 outline-none transition-all duration-300 text-sm font-medium bg-white dark:bg-gray-900 dark:text-white"
                  style={{
                    borderColor: focusedField === 'email' ? 'var(--primary)' : '#e5e7eb',
                    boxShadow: focusedField === 'email' ? '0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent)' : 'none'
                  }}
                />
              </motion.div>
            </motion.div>

            {/* ✅ Password Field — improved with icon */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Password
              </label>
              <motion.div
                className="relative"
                animate={{ scale: focusedField === 'password' ? 1.02 : 1, transition: { type: 'spring', stiffness: 300 } }}
              >
                {/* Lock Icon */}
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focusedField === 'password' ? 'var(--primary)' : '#9ca3af' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border-2 outline-none transition-all duration-300 text-sm font-medium bg-white dark:bg-gray-900 dark:text-white"
                  style={{
                    borderColor: focusedField === 'password' ? 'var(--primary)' : '#e5e7eb',
                    boxShadow: focusedField === 'password' ? '0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent)' : 'none'
                  }}
                />
                {/* Toggle visibility button */}
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-white font-bold text-sm tracking-wide transition-all relative overflow-hidden"
                style={{ background: 'var(--primary)' }}
                whileHover={{ scale: 1.02, opacity: 0.95 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="inline-block"
                  >
                    ⏳
                  </motion.span>
                ) : (
                  'Sign In →'
                )}
              </motion.button>
            </motion.div>
          </motion.form>

          {/* Register link */}
          <motion.div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400" variants={itemVariants}>
            No account?{' '}
            <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
              <Link to="/register" className="font-bold hover:underline" style={{ color: 'var(--primary)' }}>
                Create one →
              </Link>
            </motion.span>
          </motion.div>

          {/* Social login */}
          <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-xs text-gray-500 mb-4">Or continue with</p>
            <div className="flex gap-3 justify-center">
              {['Google', 'Github', 'Twitter'].map(provider => (
                <motion.button
                  key={provider}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{ background: 'var(--theme-surface)', color: 'var(--text-color)' }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    Swal.fire({
                      icon: 'info',
                      title: `${provider} Login`,
                      text: `${provider} login feature coming soon!`,
                      confirmButtonColor: 'var(--primary)',
                      background: 'var(--theme-bg)',
                      color: 'var(--text-color)'
                    });
                  }}
                >
                  {provider}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-4">
            <motion.button
              className="text-xs hover:underline"
              style={{ color: 'var(--primary)' }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                Swal.fire({
                  icon: 'info',
                  title: 'Forgot Password?',
                  text: 'Please contact support to reset your password',
                  confirmButtonColor: 'var(--primary)',
                  background: 'var(--theme-bg)',
                  color: 'var(--text-color)'
                });
              }}
            >
              Forgot password?
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
