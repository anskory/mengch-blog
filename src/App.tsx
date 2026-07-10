// 导入 React Router 相关组件
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// 导入 React 钩子函数
import { useEffect } from 'react';
// 导入导航栏组件
import Navbar from '@/components/Navbar';
// 导入页脚组件
import Footer from '@/components/Footer';
// 导入首页
import Home from '@/pages/Home';
// 导入文章列表页
import ArticleList from '@/pages/ArticleList';
// 导入文章详情页
import ArticleDetail from '@/pages/ArticleDetail';
// 导入关于页面
import About from '@/pages/About';
// 导入 404 页面
import NotFound from '@/pages/NotFound';

// 滚动到顶部组件：路由切换时自动滚动到页面顶部
function ScrollToTop() {
  // 获取当前路由路径
  const { pathname } = useLocation();
  // 监听路径变化，切换路由时滚动到顶部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

// 应用根组件：配置路由和整体页面布局
export default function App() {
  return (
    // 使用 HashRouter 作为路由模式
    <Router>
      {/* 路由切换时自动滚动到顶部 */}
      <ScrollToTop />
      {/* 页面整体容器：最小高度占满屏幕，使用 flex 布局实现 sticky footer */}
      <div className="min-h-screen flex flex-col">
        {/* 顶部导航栏 */}
        <Navbar />
        {/* 主要内容区域：flex-1 使其占满剩余空间 */}
        <main className="flex-1">
          {/* 路由配置 */}
          <Routes>
            {/* 首页路由 */}
            <Route path="/" element={<Home />} />
            {/* 文章列表路由 */}
            <Route path="/articles" element={<ArticleList />} />
            {/* 文章详情路由，支持动态 id 参数 */}
            <Route path="/articles/:id" element={<ArticleDetail />} />
            {/* 关于页面路由 */}
            <Route path="/about" element={<About />} />
            {/* 404 页面：匹配所有未定义的路由 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {/* 底部页脚 */}
        <Footer />
      </div>
    </Router>
  );
}
