import React from 'react'

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props
  const isExternal = (href as string).startsWith('http')
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  if (isExternal) return <a href={href as string} ref={ref} {...other} />
  return <RouterLink ref={ref} to={href} {...other} />
})

