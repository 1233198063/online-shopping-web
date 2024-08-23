import React from 'react'
import { Link, Outlet} from 'react-router-dom'
import ShopProducts from '../components/ShopProducts'

export default function Shop() {
    
  return (
    <div className="main-content">
      <ShopProducts></ShopProducts>
      {/* <ul>
        {
            productsList.map(item => {
                return (
                    <li key={item.id}>
                        <Link to={`detail/${item.id}/${item.detail}`}>{item.content}</Link>
                    </li>
                )
            })
        }
      </ul> */}
      <Outlet></Outlet>
    </div>
  )
}
