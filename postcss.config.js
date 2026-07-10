/**
 * PostCSS 配置文件
 *
 * 配置说明：
 * PostCSS 是一个 CSS 处理工具，用于对 CSS 进行转换和优化。
 * 本项目配置了两个核心插件：
 * - Tailwind CSS：提供原子化 CSS 框架支持
 * - Autoprefixer：自动添加浏览器前缀，确保跨浏览器兼容性
 *
 * 注意：此文件通常由脚手架自动生成，一般不需要手动修改。
 */

export default {
  // PostCSS 插件列表
  plugins: {
    // Tailwind CSS 插件：扫描内容文件并生成对应的原子 CSS 类
    tailwindcss: {},
    // Autoprefixer：根据浏览器兼容性目标，自动为 CSS 属性添加厂商前缀
    autoprefixer: {},
  },
};
