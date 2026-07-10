/**
 * 空状态组件
 * 用于在没有内容时展示空状态占位
 * 内容垂直水平居中显示
 */
import { cn } from '@/lib/utils'

/**
 * 空状态组件
 * 展示一个居中的 Empty 文本，用于空数据占位
 */
export default function Empty() {
  return (
    // 使用 cn 工具函数合并类名，实现垂直水平居中布局
    <div className={cn('flex h-full items-center justify-center')}>Empty</div>
  )
}
