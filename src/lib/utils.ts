/**
 * 样式类名工具函数
 * 合并多个 Tailwind CSS 类名，自动处理冲突和条件渲染
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 合并类名的工具函数
 * 结合 clsx（条件类名）和 tailwind-merge（解决 Tailwind 类名冲突）
 * @param inputs - 任意数量的类名参数，可以是字符串、对象、数组等
 * @returns 合并并去重后的类名字符串
 *
 * @example
 * cn('btn', isActive && 'btn-active', 'text-red-500')
 * // => 'btn btn-active text-red-500'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
