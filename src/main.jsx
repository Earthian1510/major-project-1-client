import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from './store.js'
import ProductsView from './features/product/ProductsView.jsx'
import ProductDetails from './features/product/ProductDetails.jsx'
import Wishlist from './features/wishlist/Wishlist.jsx'
import Cart from './features/cart/Cart.jsx'
import UserProfile from './features/user/UserProfile.jsx'
import UserInvoice from './features/user/UserInvoice.jsx'
import UserAddressForm from './features/user/UserAddressForm.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/user',
    element: <UserProfile />
  },
  {
    path: '/user/addAddress',
    element: <UserAddressForm />
  },
  {
    path: '/user/invoice',
    element: <UserInvoice />
  },
  {
    path: '/products',
    element: <ProductsView />
  },
  {
    path: '/products/:category',
    element: <ProductsView />
  },
  {
    path: '/products/wishlist',
    element: <Wishlist />
  },
  {
    path: '/products/cart',
    element: <Cart />
  },
  {
    path: '/products/:category',
    element: <ProductsView />
  },
  {
    path: '/products/product/:productId',
    element: <ProductDetails />
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
