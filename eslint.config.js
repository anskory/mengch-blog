/**
 * ESLint 配置文件
 *
 * 配置说明：
 * 使用 ESLint Flat Config 格式，为 React + TypeScript 项目提供代码质量检查。
 * 包含 JavaScript 推荐规则、TypeScript 推荐规则、React Hooks 规则和热更新规则。
 */

// 导入 ESLint 核心 JavaScript 规则
import js from '@eslint/js'
// 导入全局变量定义（浏览器环境）
import globals from 'globals'
// 导入 React Hooks 规则插件
import reactHooks from 'eslint-plugin-react-hooks'
// 导入 React 热更新规则插件
import reactRefresh from 'eslint-plugin-react-refresh'
// 导入 TypeScript ESLint 配置工具
import tseslint from 'typescript-eslint'

/**
 * ESLint 配置导出
 * 采用 Flat Config 格式，使用数组形式定义多个配置对象
 */
export default tseslint.config(
  // 配置1：全局忽略规则 - 构建产物目录不进行 lint 检查
  { ignores: ['dist'] },

  // 配置2：主要 lint 规则
  {
    // 继承的基础规则集：JS 推荐 + TypeScript 推荐
    extends: [js.configs.recommended, ...tseslint.configs.recommended],

    // 应用规则的文件范围：所有 TypeScript 和 TSX 文件
    files: ['**/*.{ts,tsx}'],

    // 语言选项配置
    languageOptions: {
      // ECMAScript 版本：2020
      ecmaVersion: 2020,
      // 全局变量：浏览器环境（window, document 等）
      globals: globals.browser,
    },

    // 启用的插件
    plugins: {
      // React Hooks 规则：确保 Hooks 的正确使用
      'react-hooks': reactHooks,
      // React 热更新规则：确保组件可以安全地热更新
      'react-refresh': reactRefresh,
    },

    // 自定义规则
    rules: {
      // 启用 React Hooks 推荐规则
      ...reactHooks.configs.recommended.rules,

      // React Refresh 规则：只允许导出组件，常量导出例外
      // 级别：warn（警告而非错误）
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
