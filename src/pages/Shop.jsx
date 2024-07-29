import React from 'react'
import { Link, Outlet} from 'react-router-dom'

export default function Shop() {
    const productsList = [
        {id: 1, content: 'product1', detail: 'glasses1'},
        {id: 2, content: 'product2', detail: 'glasses2'},
        {id: 3, content: 'product3', detail: 'glasses3'},
        {id: 4, content: 'product4', detail: 'glasses4'},
        {id: 5, content: 'product5', detail: 'glasses5'},
    ]
  return (
    <div>
      Shop
      <ul>
        {
            productsList.map(item => {
                return (
                    <li key={item.id}>
                        <Link to={`detail/${item.id}/${item.detail}`}>{item.content}</Link>
                    </li>
                )
            })
        }
      </ul>
      <Outlet></Outlet>
    </div>
  )
}
