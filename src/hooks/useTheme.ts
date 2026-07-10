/**
 * 主题切换 Hook
 * 提供亮色/暗色主题切换功能，支持本地存储和系统偏好自动检测
 */
import { useState, useEffect } from 'react';

/** 主题类型：亮色或暗色 */
type Theme = 'light' | 'dark';

/**
 * 主题管理 Hook
 * - 初始化时优先读取 localStorage 中保存的主题
 * - 若无保存记录，则跟随系统偏好设置
 * - 切换主题时自动更新 <html> 标签的 class 和 localStorage
 *
 * @returns 主题状态和切换方法
 */
export function useTheme() {
  // 初始化主题：优先本地存储，其次系统偏好
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // 主题变化时更新 DOM class 和本地存储
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  /** 切换亮色/暗色主题 */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return {
    /** 当前主题 */
    theme,
    /** 切换主题的函数 */
    toggleTheme,
    /** 是否为暗色模式 */
    isDark: theme === 'dark'
  };
}
