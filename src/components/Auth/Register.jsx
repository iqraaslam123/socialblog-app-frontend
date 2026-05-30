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

  const [usernameValid, setUsernameValid] = useState(true);
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setBgPosition({ x: e.clientX * 0.02, y: e.clientY * 0.02 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    setUsernameValid(regex.test(username) || username === '');
    return regex.test(username);
  };

  const checkUsernameAvailability = (username) => {
    if (username.length < 3) return;
    const takenUsernames = ['admin', 'user', 'test', 'root'];
    setUsernameAvailable(!takenUsernames.includes(username.toLowerCase()));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(regex.test(email) || email === '');
    return regex.test(email);
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    setPasswordStrength(Math.min(strength, 5));
    if (confirmPassword) setPasswordMatch(password === confirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUsername(form.username)) {
      Swal.fire({ icon: 'warning', title: 'Invalid Username', text: 'Username must be 3-20 characters (letters, numbers, underscores only)', confirmButtonColor: 'var(--primary)' });
      return;
    }
    if (!validateEmail(form.email)) {
      Swal.fire({ icon: 'warning', title: 'Invalid Email', text: 'Please enter a valid email address', confirmButtonColor: 'var(--primary)' });
      return;
    }
    if (form.password.length < 6) {
      Swal.fire({ icon: 'warning', title: 'Weak Password', text: 'Password must be at least 6 characters', confirmButtonColor: 'var(--primary)' });
      return;
    }
    if (form.password !== confirmPassword) {
      Swal.fire({ icon: 'warning', title: 'Password Mismatch', text: 'Passwords do not match', confirmButtonColor: 'var(--primary)' });
      return;
    }

    setLoading(true);
    try {
      // ✅ FIXED: /auth/register → /api/auth/register
      const { data } = await axios.post(`${API}/api/auth/register`, form);
      login(data.token, data.user);
      Swal.fire({
        toast: true, position: 'top-end', icon: 'success',
        title: `Account created! Welcome ${data.user.username} 🎉`,
        showConfirmButton: false, timer: 3000, timerProgressBar: true,
        background: 'var(--theme-bg)', color: 'var(--text-color)', iconColor: 'var(--primary)'
      });
      navigate('/');
    } catch (err) {
      Swal.fire({
        icon: 'error', title: 'Registration Failed',
        text: err.response?.data?.message || 'Something went wrong',
        confirmButtonColor: 'var(--primary)', background: 'var(--theme-bg)', color: 'var(--text-color)'
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
  const floatingIcons = ['🚀', '✨', '⭐', '💫', '🌟', '💎'];

  // Reusable SVG icons
  const UserIcon = ({ color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
  const MailIcon = ({ color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
  const LockIcon = ({ color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
  const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

  const iconColor = (field) => focusedField === field ? 'var(--primary)' : '#9ca3af';
  const borderColor = (field, invalid) =>
    invalid ? '#ef4444' : focusedField === field ? 'var(--primary)' : '#e5e7eb';
  const shadowStyle = (field) =>
    focusedField === field ? '0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent)' : 'none';

  return (
    <motion.div
      initial="hidden" animate="visible" variants={containerVariants}
      className="min-h-screen flex relative overflow-hidden"
      style={{ background: 'var(--theme-bg)' }}
    >
      {/* Animated Background Pattern */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ transform: `translate(${bgPosition.x}px, ${bgPosition.y}px)`, transition: 'transform 0.1s ease-out' }}
      >
        <div className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, var(--primary) 1px, transparent 1px), radial-gradient(circle at 80% 20%, var(--primary) 1px, transparent 1px)', backgroundSize: '50px 50px', opacity: 0.1 }}
        />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map((icon, i) => (
          <motion.div
            key={i} className="absolute text-4xl"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0 }}
            animate={{ y: [null, -30, 0, 30, 0], x: [null, 20, -20, 10, 0], rotate: [0, 10, -10, 5, 0], opacity: [0.2, 0.5, 0.3, 0.4, 0.2] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: 'easeInOut' }}
            style={{ left: `${(i * 15) % 100}%`, top: `${(i * 12) % 100}%` }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* Left Panel */}
      <motion.div
        initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="hidden lg:flex w-1/2 flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #0f172a 100%)' }}
      >
        <motion.div className="absolute inset-0 opacity-20" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity }}
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, white 2px, transparent 2px)', backgroundSize: '40px 40px' }}
        />
        <motion.div className="absolute top-1/3 right-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl mix-blend-screen"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }} transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl mix-blend-screen"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
          className="relative z-10 text-center text-white px-16"
        >
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="text-8xl mb-8 drop-shadow-[0_10px_20px_rgba(255,255,255,0.25)]"
          >🚀</motion.div>
          <motion.h1 className="text-6xl font-black mb-6 leading-tight"
            animate={{ textShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 20px rgba(255,255,255,0.5)', '0 0 0px rgba(255,255,255,0)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Join Community
          </motion.h1>
          <p className="text-xl opacity-90 font-light leading-relaxed">
            Create your account today and unlock full access to interactive features
          </p>
          <motion.div className="mt-10 flex gap-4 justify-center" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            {['👋', '💬', '🎨', '📸', '⚡', '🎉'].map((emoji, i) => (
              <motion.div key={i}
                className="w-12 h-12 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center text-2xl backdrop-blur-sm cursor-pointer"
                whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}
                animate={{ y: [0, -5, 0] }} transition={{ delay: i * 0.1, repeat: Infinity, duration: 2 }}
              >{emoji}</motion.div>
            ))}
          </motion.div>
        </motion.div>
        <div className="absolute bottom-8 left-0 right-0 text-center text-xs text-white/40 tracking-wider">
          🔒 SECURE ENCRYPTION ENABLED
        </div>
      </motion.div>

      {/* Right Form Panel */}
      <motion.div
        initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="w-full lg:w-1/2 flex items-center justify-center px-6 relative z-10 py-10"
      >
        <motion.div className="w-full max-w-md" variants={containerVariants} initial="hidden" animate="visible">
          {/* Header */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.h2 className="text-4xl font-black mb-2" style={{ color: 'var(--primary)' }} whileHover={{ scale: 1.05 }}>
              Create Account
            </motion.h2>
            <p className="text-gray-500 dark:text-gray-400">Join the community today</p>
          </motion.div>

          <motion.form onSubmit={handleSubmit} className="space-y-5" variants={itemVariants}>

            {/* ✅ Username Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Username
              </label>
              <motion.div
                className="relative"
                animate={{ scale: focusedField === 'username' ? 1.02 : 1, transition: { type: 'spring', stiffness: 300 } }}
              >
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <UserIcon color={iconColor('username')} />
                </span>
                <input
                  type="text" required value={form.username}
                  onChange={e => { setForm(p => ({ ...p, username: e.target.value })); validateUsername(e.target.value); checkUsernameAvailability(e.target.value); }}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => { setFocusedField(null); validateUsername(form.username); }}
                  placeholder="cooluser123"
                  className="w-full pl-11 pr-10 py-3 rounded-xl border-2 outline-none transition-all duration-300 text-sm font-medium bg-white dark:bg-gray-900 dark:text-white"
                  style={{ borderColor: borderColor('username', !usernameValid && form.username), boxShadow: shadowStyle('username') }}
                />
                <AnimatePresence>
                  {form.username && usernameValid && usernameAvailable && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 font-bold text-lg">✓</motion.span>
                  )}
                  {form.username && !usernameValid && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 font-bold text-lg">✗</motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              <AnimatePresence>
                {form.username && !usernameValid && (
                  <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="text-xs text-red-500 mt-1 ml-1">
                    Username must be 3-20 characters (letters, numbers, underscores)
                  </motion.p>
                )}
                {form.username && usernameValid && !usernameAvailable && (
                  <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="text-xs text-orange-500 mt-1 ml-1">
                    Username already taken
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ✅ Email Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Email Address
              </label>
              <motion.div
                className="relative"
                animate={{ scale: focusedField === 'email' ? 1.02 : 1, transition: { type: 'spring', stiffness: 300 } }}
              >
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <MailIcon color={iconColor('email')} />
                </span>
                <input
                  type="email" required value={form.email}
                  onChange={e => { setForm(p => ({ ...p, email: e.target.value })); validateEmail(e.target.value); }}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => { setFocusedField(null); validateEmail(form.email); }}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-10 py-3 rounded-xl border-2 outline-none transition-all duration-300 text-sm font-medium bg-white dark:bg-gray-900 dark:text-white"
                  style={{ borderColor: borderColor('email', !emailValid && form.email), boxShadow: shadowStyle('email') }}
                />
                <AnimatePresence>
                  {form.email && emailValid && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 font-bold text-lg">✓</motion.span>
                  )}
                  {form.email && !emailValid && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 font-bold text-lg">✗</motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              <AnimatePresence>
                {form.email && !emailValid && (
                  <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="text-xs text-red-500 mt-1 ml-1">
                    Please enter a valid email address
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ✅ Password Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Password
              </label>
              <motion.div
                className="relative"
                animate={{ scale: focusedField === 'password' ? 1.02 : 1, transition: { type: 'spring', stiffness: 300 } }}
              >
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <LockIcon color={iconColor('password')} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'} required value={form.password}
                  onChange={e => { setForm(p => ({ ...p, password: e.target.value })); checkPasswordStrength(e.target.value); }}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border-2 outline-none transition-all duration-300 text-sm font-medium bg-white dark:bg-gray-900 dark:text-white"
                  style={{ borderColor: borderColor('password', false), boxShadow: shadowStyle('password') }}
                />
                <motion.button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </motion.button>
              </motion.div>

              {/* Password Strength Bar */}
              <AnimatePresence>
                {form.password && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2">
                    <div className="flex gap-1 h-1.5">
                      {[1, 2, 3, 4, 5].map(level => (
                        <div key={level} className="flex-1 rounded-full transition-all duration-300"
                          style={{ backgroundColor: level <= passwordStrength ? (level <= 2 ? '#ef4444' : level <= 3 ? '#f59e0b' : '#10b981') : '#e5e7eb' }}
                        />
                      ))}
                    </div>
                    <p className="text-xs mt-1" style={{ color: passwordStrength <= 2 ? '#ef4444' : passwordStrength === 3 ? '#f59e0b' : '#10b981' }}>
                      {passwordStrength <= 2 && '⚠️ Weak — use 8+ chars, uppercase, numbers'}
                      {passwordStrength === 3 && '👍 Medium password'}
                      {passwordStrength >= 4 && '✅ Strong password!'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ✅ Confirm Password Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Confirm Password
              </label>
              <motion.div
                className="relative"
                animate={{ scale: focusedField === 'confirm' ? 1.02 : 1, transition: { type: 'spring', stiffness: 300 } }}
              >
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <LockIcon color={iconColor('confirm')} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'} required value={confirmPassword}
                  onChange={e => { setConfirmPassword(e.target.value); setPasswordMatch(form.password === e.target.value); }}
                  onFocus={() => setFocusedField('confirm')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Confirm your password"
                  className="w-full pl-11 pr-10 py-3 rounded-xl border-2 outline-none transition-all duration-300 text-sm font-medium bg-white dark:bg-gray-900 dark:text-white"
                  style={{ borderColor: borderColor('confirm', confirmPassword && !passwordMatch), boxShadow: shadowStyle('confirm') }}
                />
                <AnimatePresence>
                  {confirmPassword && passwordMatch && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 font-bold text-lg">✓</motion.span>
                  )}
                  {confirmPassword && !passwordMatch && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 font-bold text-lg">✗</motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              <AnimatePresence>
                {confirmPassword && !passwordMatch && (
                  <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="text-xs text-red-500 mt-1 ml-1">
                    Passwords do not match
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit" disabled={loading}
                className="w-full py-3 rounded-xl text-white font-bold text-sm tracking-wide transition-all relative overflow-hidden"
                style={{ background: 'var(--primary)' }}
                whileHover={{ scale: 1.02, opacity: 0.95 }} whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="inline-block">⏳</motion.span>
                ) : 'Create Account →'}
              </motion.button>
            </motion.div>
          </motion.form>

          {/* Terms */}
          <motion.p className="text-center mt-6 text-xs text-gray-500 dark:text-gray-400" variants={itemVariants}>
            By creating an account, you agree to our{' '}
            <button className="hover:underline" style={{ color: 'var(--primary)' }}>Terms of Service</button>
            {' '}and{' '}
            <button className="hover:underline" style={{ color: 'var(--primary)' }}>Privacy Policy</button>
          </motion.p>

          {/* Login link */}
          <motion.p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400" variants={itemVariants}>
            Already have an account?{' '}
            <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
              <Link to="/login" className="font-bold hover:underline" style={{ color: 'var(--primary)' }}>
                Sign in →
              </Link>
            </motion.span>
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
