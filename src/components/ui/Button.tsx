import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'cobalt' | 'mint' | 'yellow' | 'outline' | 'dark'
type Size = 'sm' | 'md' | 'lg'

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

interface RouterButtonProps extends CommonProps {
  to: string
}

interface AnchorButtonProps extends CommonProps {
  href: string
  onClick?: () => void
  download?: boolean | string
}

interface NativeButtonProps extends CommonProps {
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export type ButtonProps = RouterButtonProps | AnchorButtonProps | NativeButtonProps

function buildClass(variant: Variant, size: Size, className: string) {
  return ['btn', `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(' ')
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className = '', children } = props
  const cls = buildClass(variant, size, className)

  if ('to' in props) {
    return (
      <Link to={props.to} className={cls}>
        {children}
      </Link>
    )
  }

  if ('href' in props) {
    const external = /^(https?:|mailto:)/.test(props.href)
    return (
      <a
        href={props.href}
        className={cls}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        download={props.download}
        onClick={props.onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      className={cls}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {children}
    </button>
  )
}
