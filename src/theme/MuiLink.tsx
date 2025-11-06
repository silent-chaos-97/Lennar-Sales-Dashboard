import React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props
  const isExternal = (href as string).startsWith('http')
  if (isExternal) return <a href={href as string} ref={ref} {...other} />
  return <RouterLink ref={ref} to={href} {...other} />
