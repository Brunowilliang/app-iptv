import { Text as RNText, TextProps } from 'react-native'

interface Props extends TextProps {
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  h5?: boolean
  h6?: boolean
  bold?: boolean
  semibold?: boolean
  medium?: boolean
  regular?: boolean
  left?: boolean
  center?: boolean
  right?: boolean
}

export function Text(p: Props) {
  const classNames = []

  if (p.h1) classNames.push('text-2xl')
  if (p.h2) classNames.push('text-xl')
  if (p.h3) classNames.push('text-lg')
  if (p.h4) classNames.push('text-base')
  if (p.h5) classNames.push('text-sm')
  if (p.h6) classNames.push('text-xs')
  if (p.bold) classNames.push('font-strong')
  if (p.semibold) classNames.push('font-balanced')
  if (p.medium) classNames.push('font-standard')
  if (p.regular) classNames.push('font-soft')
  if (p.left) classNames.push('text-left')
  if (p.center) classNames.push('text-center')
  if (p.right) classNames.push('text-right')

  return <RNText className={classNames.join(' ')} {...p} />
}
