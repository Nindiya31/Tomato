import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'

import MyOrders from './pages/MyOrders/MyOrders'
import OrderSuccess from './pages/OrderSuccess/OrderSucess'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)
  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

    <div className='app'>
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/Order' element={<PlaceOrder />} />
      <Route path='/ordersucess' element={<OrderSuccess />} />
      <Route path='/myorders' element={<MyOrders />} />
    </Routes>
      
    </div>
   
   
   <Footer />
    </>
  )
}

export default App
