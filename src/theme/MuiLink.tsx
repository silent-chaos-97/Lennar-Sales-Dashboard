import React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
>((props, ref) => {
  const { href, ...other } = props
  const isExternal = (href as string).startsWith('http')
