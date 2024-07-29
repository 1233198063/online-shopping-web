import React from 'react'
import {NavLink, useRoutes, useNavigate} from 'react-router-dom'
import routes from '../route'

export default function Layout() {
    const element = useRoutes(routes)
  return (
    <div>
      <NavLink to={'/home'}>Home</NavLink>
      <br />
      <NavLink to={'/shop'}>Shop</NavLink>
      <br />
      <NavLink to={'/featured'}>Featured</NavLink>
      <br />
      <NavLink to={'/recommended'}>Recommended</NavLink>
      {element}
    </div>
  )
}
