import React, { useState } from 'react'
import './Css/style.css'



//Cart
function Cart({ cart, removeItem }) {
  const CountByProduct = cart.reduce((acc, product) => {
    acc[product.id] = (acc[product.id] || 0) + 1
    return acc
  }, {})
  const cartItems = Object.keys(CountByProduct).map(productId => {
    const product = cart.find(p => p.id === parseInt(productId))
    return ({
      ...product,
      count: CountByProduct[productId]
    }


    )
  })
  const totalPrice = cart.reduce((acc, product) => acc + product.price, 0)
  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (<p>Ur Shopping Cart Is Empty</p>) : (
        <ul>
          {cartItems.map(product => <li key={product.id}>
            {product.name}  -  {product.price}
            mmk x {product.count}
            <button onClick={_ => removeItem(product.id)}>Remove</button></li>)}
          <li id='total'>Total : {totalPrice}  $</li>
        </ul>
      )}
    </div>
  )
}
//data
function ProductsList({ addToCart }) {
  const products = [
    { id: 1, name: 'T shirt', price: 32000 },
    { id: 2, name: 'Smooth Shirt', price: 20000 },
    { id: 3, name: 'Short Pant', price: 22000 },
    { id: 4, name: 'Coat', price: 62000 }]

  return (
    <div>

      <h2>Item: </h2>
      <ul>
        {
          products.map(product =>
            <li key={product.id}>
              {product.name}  -  {product.price}
              <button onClick={_ => addToCart(product)}>Add</button>
            </li>

          )}
      </ul>
    </div>
  )
}
const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);

  };
  const removeItem = productId => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }
  return (
    <div className='position '>
      <ProductsList addToCart={addToCart} />
      <Cart cart={cart} removeItem={removeItem} />

    </div>
  )
}

export default App;