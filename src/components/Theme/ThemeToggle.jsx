import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { dark, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-yellow-400">
      {dark ? '☀️' : '🌙'}
    </button>
  );
}