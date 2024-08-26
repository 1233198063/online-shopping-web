import Featured from "../pages/Featured"
import Home from "../pages/Home"
import Recommended from "../pages/Recommended"
import Shop from "../pages/Shop"
import Detail from "../pages/Detail"
import ProductDetails from "../components/ProductDetails"

const routes = [
    {
        path:'/',
        element:<Home></Home>
    },
    {
        path:'/home',
        element:<Home></Home>
    },
    {
        path:'/shop',
        element:<Shop></Shop>,
        children:[
            {
                path:'detail/:id/:detail',
                element:<Detail></Detail>
            }
        ]
    },
    {
        path:'/featured',
        element:<Featured></Featured>
    },
    {
        path:'/recommended',
        element:<Recommended></Recommended>
    },
    {
        path:'/product/:id',
        element:<ProductDetails></ProductDetails>
    }
]

export default routes