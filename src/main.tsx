// 导入 React 严格模式组件
import { StrictMode } from 'react'
// 导入 React DOM 的 createRoot 方法用于渲染应用
import { createRoot } from 'react-dom/client'
// 导入应用根组件
import App from './App'
// 导入全局样式
import './index.css'

// 创建 React 根节点并渲染应用
createRoot(document.getElementById('root')!).render(
  // 使用 StrictMode 启用严格模式，有助于发现潜在问题
  <StrictMode>
    <App />
  </StrictMode>,
)
