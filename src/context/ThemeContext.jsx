import { createContext, useContext, useState, useEffect } from 'react';

const themes = {
  purple: { primary: '#8B5CF6', secondary: '#6D28D9', accent: '#EDE9FE' },
  blue:   { primary: '#3B82F6', secondary: '#1D4ED8', accent: '#DBEAFE' },
  green:  { primary: '#10B981', secondary: '#059669', accent: '#D1FAE5' },
  rose:   { primary: '#F43F5E', secondary: '#E11D48', accent: '#FFE4E6' },
  orange: { primary: '#F97316', secondary: '#EA580C', accent: '#FFEDD5' },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark');
  const [color, setColor] = useState(localStorage.getItem('themeColor') || 'purple');

  useEffect(() => {
    const t = themes[color];
    const root = document.documentElement;
    root.style.setProperty('--primary', t.primary);
    root.style.setProperty('--secondary', t.secondary);
    root.style.setProperty('--accent', t.accent);
    if (dark) {
      root.style.setProperty('--theme-bg', '#111111');
      root.style.setProperty('--card-bg', '#1e1e1e');
      root.style.setProperty('--sidebar-bg', '#161616');
      root.style.setProperty('--border', '#2d2d2d');
      root.style.setProperty('--text', '#f1f1f1');
      root.style.setProperty('--text-muted', '#888888');
    } else {
      root.style.setProperty('--theme-bg', '#f3f4f6');
      root.style.setProperty('--card-bg', '#ffffff');
      root.style.setProperty('--sidebar-bg', '#ffffff');
      root.style.setProperty('--border', '#e5e7eb');
      root.style.setProperty('--text', '#111827');
      root.style.setProperty('--text-muted', '#6b7280');
    }
    root.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    localStorage.setItem('themeColor', color);
  }, [dark, color]);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme: () => setDark(p => !p), color, setColor, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);