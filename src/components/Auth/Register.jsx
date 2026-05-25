
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

const API = import.meta.env.VITE_API_URL;

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
  
  // Validation states
  const [usernameValid, setUsernameValid] = useState(true);
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // Animated background effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setBgPosition({ x: e.clientX * 0.02, y: e.clientY * 0.02 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Username validation (alphanumeric and underscores only)
  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    setUsernameValid(regex.test(username) || username === '');
    return regex.test(username);
  };

  // Check username availability (simulated)
  const checkUsernameAvailability = async (username) => {
    if (username.length < 3) return;
    // Simulate API call - replace with actual API endpoint
    const takenUsernames = ['admin', 'user', 'test', 'root'];
    setUsernameAvailable(!takenUsernames.includes(username.toLowerCase()));
  };

  // Email validation
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(regex.test(email) || email === '');
    return regex.test(email);
  };

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    setPasswordStrength(Math.min(strength, 5));
    
    // Check password match with confirm password
    if (confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!validateUsername(form.username)) {
      Swal.fire({ 
        icon: 'warning', 
        title: 'Invalid Username', 
        text: 'Username must be 3-20 characters (letters, numbers, underscores only)', 
        confirmButtonColor: 'var(--primary)' 
      });
      return;
    }
    
    if (!validateEmail(form.email)) {
      Swal.fire({ 
        icon: 'warning', 
        title: 'Invalid Email', 
        text: 'Please enter a valid email address', 
        confirmButtonColor: 'var(--primary)' 
      });
      return;
    }
    
    if (form.password.length < 6) {
      Swal.fire({ 
        icon: 'warning', 
        title: 'Weak Password', 
        text: 'Password must be at least 6 characters', 
        confirmButtonColor: 'var(--primary)' 
      });
      return;
    }
    
    if (form.password !== confirmPassword) {
      Swal.fire({ 
        icon: 'warning', 
        title: 'Password Mismatch', 
        text: 'Passwords do not match', 
        confirmButtonColor: 'var(--primary)' 
      });
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/auth/register`, form);
      login(data.token, data.user);
      Swal.fire({ 
        toast: true, 
        position: 'top-end', 
        icon: 'success',
        title: `Account created! Welcome ${data.user.username} 🎉`,
        showConfirmButton: false, 
        timer: 3000, 
        timerProgressBar: true,
        background: 'var(--theme-bg)',
        color: 'var(--text-color)',
        iconColor: 'var(--primary)'
      });
      navigate('/');
    } catch (err) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Registration Failed',
        text: err.response?.data?.message || 'Something went wrong',
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
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const floatingIcons = ['🚀', '✨', '⭐', '💫', '🌟', '💎'];

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
        <div className="absolute inset-0" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 20% 50%, var(--primary) 1px, transparent 1px), radial-gradient(circle at 80% 20%, var(--primary) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            opacity: 0.1
          }} 
        />
      </div>

      {/* Floating Animated Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{ 
              y: [null, -30, 0, 30, 0],
              x: [null, 20, -20, 10, 0],
              rotate: [0, 10, -10, 5, 0],
              opacity: [0.2, 0.5, 0.3, 0.4, 0.2]
            }}
            transition={{ 
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${(i * 15) % 100}%`,
              top: `${(i * 12) % 100}%`
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* Left Premium Decorative Panel */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="hidden lg:flex w-1/2 flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #0f172a 100%)' }}
      >
        {/* Animated Grid / Particle effect */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ 
            backgroundImage: 'radial-gradient(circle at 50% 50%, white 2px, transparent 2px)',
            backgroundSize: '40px 40px' 
          }} 
        />
        
        {/* Glowing Ambient Shadows */}
        <motion.div 
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl mix-blend-screen"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl mix-blend-screen"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative z-10 text-center text-white px-16"
        >
          <motion.div 
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-8xl mb-8 drop-shadow-[0_10px_20px_rgba(255,255,255,0.25)]"
          >
            🚀
          </motion.div>
          
          <motion.h1 
            className="text-6xl font-black mb-6 leading-tight"
            animate={{ 
              textShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 20px rgba(255,255,255,0.5)",
                "0 0 0px rgba(255,255,255,0)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Join Community
          </motion.h1>
          
          <p className="text-xl opacity-90 font-light leading-relaxed">
            Create your account today and unlock full access to interactive features
          </p>

          <motion.div 
            className="mt-10 flex gap-4 justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {['👋', '💬', '🎨', '📸', '⚡', '🎉'].map((emoji, i) => (
              <motion.div 
                key={i}
                className="w-12 h-12 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center text-2xl backdrop-blur-sm cursor-pointer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ delay: i * 0.1, repeat: Infinity, duration: 2 }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-0 right-0 text-center text-xs text-white/40 tracking-wider">
          🔒 SECURE ENCRYPTION ENABLED
        </div>
      </motion.div>

      {/* Right Registration Form Panel */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="w-full lg:w-1/2 flex items-center justify-center px-6 relative z-10"
      >
        <motion.div 
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="text-center mb-10" variants={itemVariants}>
            <motion.h2 
              className="text-4xl font-black mb-2"
              style={{ color: 'var(--primary)' }}
              whileHover={{ scale: 1.05 }}
            >
              Create Account
            </motion.h2>
            <p className="text-gray-500 dark:text-gray-400">
              Join the community today
            </p>
          </motion.div>

          {/* Form */}
          <motion.form onSubmit={handleSubmit} className="space-y-5" variants={itemVariants}>
            
            {/* Username Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Username
              </label>
              <motion.div
                animate={{ 
                  scale: focusedField === 'username' ? 1.02 : 1,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="relative group"
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">
                  
                </div>
                <input 
                  type="text" 
                  required 
                  value={form.username}
                  onChange={e => {
                    setForm(p => ({ ...p, username: e.target.value }));
                    validateUsername(e.target.value);
                    checkUsernameAvailability(e.target.value);
                  }}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => {
                    setFocusedField(null);
                    validateUsername(form.username);
                  }}
                  placeholder="cooluser123"
                  className="w-full px-4 py-3 pl-12 rounded-xl border-2 outline-none transition-all duration-300 text-sm font-medium bg-white dark:bg-gray-900 dark:text-white"
                  style={{ 
                    borderColor: !usernameValid && form.username ? '#ef4444' : (focusedField === 'username' ? 'var(--primary)' : '#e5e7eb'),
                    boxShadow: focusedField === 'username' ? `0 0 0 3px ${'var(--primary)'}20` : 'none'
                  }}
                />
                <AnimatePresence>
                  {form.username && usernameValid && usernameAvailable && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-xl"
                    >
                      ✓
                    </motion.div>
                  )}
                  {form.username && !usernameValid && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-xl"
                    >
                      ✗
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <AnimatePresence>
                {form.username && !usernameValid && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs text-red-500 mt-1"
                  >
                    Username must be 3-20 characters (letters, numbers, underscores)
                  </motion.p>
                )}
                {form.username && usernameValid && !usernameAvailable && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs text-orange-500 mt-1"
                  >
                    Username already taken
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Email Address
              </label>
              <motion.div
                animate={{ 
                  scale: focusedField === 'email' ? 1.02 : 1,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="relative group"
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">
                  
                </div>
                <input 
                  type="email" 
                  required 
                  value={form.email}
                  onChange={e => {
                    setForm(p => ({ ...p, email: e.target.value }));
                    validateEmail(e.target.value);
                  }}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => {
                    setFocusedField(null);
                    validateEmail(form.email);
                  }}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 pl-12 rounded-xl border-2 outline-none transition-all duration-300 text-sm font-medium bg-white dark:bg-gray-900 dark:text-white"
                  style={{ 
                    borderColor: !emailValid && form.email ? '#ef4444' : (focusedField === 'email' ? 'var(--primary)' : '#e5e7eb'),
                    boxShadow: focusedField === 'email' ? `0 0 0 3px ${'var(--primary)'}20` : 'none'
                  }}
                />
                <AnimatePresence>
                  {form.email && emailValid && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-xl"
                    >
                      ✓
                    </motion.div>
                  )}
                  {form.email && !emailValid && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-xl"
                    >
                      ✗
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <AnimatePresence>
                {form.email && !emailValid && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs text-red-500 mt-1"
                  >
                    Please enter a valid email address
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Password
              </label>
              <motion.div
                animate={{ 
                  scale: focusedField === 'password' ? 1.02 : 1,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="relative group"
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">
                  
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={form.password}
                  onChange={e => {
                    setForm(p => ({ ...p, password: e.target.value }));
                    checkPasswordStrength(e.target.value);
                  }}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pl-12 rounded-xl border-2 outline-none transition-all duration-300 text-sm font-medium bg-white dark:bg-gray-900 dark:text-white pr-12"
                  style={{ 
                    borderColor: focusedField === 'password' ? 'var(--primary)' : '#e5e7eb',
                    boxShadow: focusedField === 'password' ? `0 0 0 3px ${'var(--primary)'}20` : 'none'
                  }}
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </motion.button>
              </motion.div>
              
              {/* Password Strength Indicator */}
              <AnimatePresence>
                {form.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2"
                  >
                    <div className="flex gap-1 h-1.5">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <motion.div
                          key={level}
                          className="flex-1 rounded-full transition-all duration-300"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          style={{
                            backgroundColor: level <= passwordStrength
                              ? level <= 2 ? '#ef4444' : level <= 3 ? '#f59e0b' : '#10b981'
                              : '#e5e7eb'
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-xs mt-1" style={{ color: passwordStrength <= 2 ? '#ef4444' : passwordStrength === 3 ? '#f59e0b' : '#10b981' }}>
                      {passwordStrength <= 2 && '⚠️ Weak password - use 8+ characters, uppercase, numbers'}
                      {passwordStrength === 3 && '👍 Medium password'}
                      {passwordStrength >= 4 && '✅ Strong password!'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Confirm Password
              </label>
              <motion.div
                animate={{ 
                  scale: focusedField === 'confirm' ? 1.02 : 1,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="relative group"
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">
                  
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={confirmPassword}
                  onChange={e => {
                    setConfirmPassword(e.target.value);
                    setPasswordMatch(form.password === e.target.value);
                  }}
                  onFocus={() => setFocusedField('confirm')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 pl-12 rounded-xl border-2 outline-none transition-all duration-300 text-sm font-medium bg-white dark:bg-gray-900 dark:text-white"
                  style={{ 
                    borderColor: confirmPassword && !passwordMatch ? '#ef4444' : (focusedField === 'confirm' ? 'var(--primary)' : '#e5e7eb'),
                    boxShadow: focusedField === 'confirm' ? `0 0 0 3px ${'var(--primary)'}20` : 'none'
                  }}
                />
                <AnimatePresence>
                  {confirmPassword && passwordMatch && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-xl"
                    >
                      ✓
                    </motion.div>
                  )}
                  {confirmPassword && !passwordMatch && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-xl"
                    >
                      ✗
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <AnimatePresence>
                {confirmPassword && !passwordMatch && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs text-red-500 mt-1"
                  >
                    Passwords do not match
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 rounded-xl text-white font-bold text-sm tracking-wide transition-all relative overflow-hidden group"
                style={{ background: 'var(--primary)' }}
                whileHover={{ scale: 1.02, opacity: 0.95 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    ⏳
                  </motion.div>
                ) : (
                  'Create Account →'
                )}
              </motion.button>
            </motion.div>
          </motion.form>

          {/* Terms & Conditions */}
          <motion.p 
            className="text-center mt-6 text-xs text-gray-500 dark:text-gray-400"
            variants={itemVariants}
          >
            By creating an account, you agree to our{' '}
            <button className="hover:underline" style={{ color: 'var(--primary)' }}>
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="hover:underline" style={{ color: 'var(--primary)' }}>
              Privacy Policy
            </button>
          </motion.p>

          {/* Login Link */}
          <motion.p 
            className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400"
            variants={itemVariants}
          >
            Already have an account?{' '}
            <motion.div
              whileHover={{ scale: 1.05, x: 5 }}
              className="inline-block"
            >
              <Link to="/login" className="font-bold hover:underline" style={{ color: 'var(--primary)' }}>
                Sign in →
              </Link>
            </motion.div>
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}