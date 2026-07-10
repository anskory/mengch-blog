// 导入 Vite 配置定义函数
import { defineConfig } from 'vite'
// 导入 React 插件
import react from '@vitejs/plugin-react'
// 导入 tsconfig 路径别名插件，让 Vite 支持 TypeScript 中的路径映射
import tsconfigPaths from "vite-tsconfig-paths";

// Vite 配置文档：https://vite.dev/config/
export default defineConfig({
  // 应用基础路径，部署到子目录时需要修改
  base: '/',
  // 构建配置
  build: {
    // 生成隐藏的 sourcemap，不暴露给用户但便于调试
    sourcemap: 'hidden',
  },
  // Vite 插件列表
  plugins: [
    // React 插件配置
    react({
      babel: {
        plugins: [
          // 开发时定位组件的 Babel 插件
          'react-dev-locator',
        ],
      },
    }),
    // 支持 tsconfig 中的路径别名配置
    tsconfigPaths()
  ],
})
