import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Nav from "./Nav";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [isRemoving, setIsRemoving] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(stored);
  }, []);

  const updateCart = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const increaseQty = (id) => {
    const newCart = cart.map(item =>
      item._id === id && item.quantity < 10 ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(newCart);
  };

  const decreaseQty = (id) => {
    const newCart = cart
      .map(item => item._id === id ? { ...item, quantity: item.quantity - 1 } : item)
      .filter(item => item.quantity > 0);
    updateCart(newCart);
  };

  const removeItem = (id) => {
    setIsRemoving(id);
    setTimeout(() => {
      const newCart = cart.filter(item => item._id !== id);
      updateCart(newCart);
      setIsRemoving(null);
    }, 300); // Match animation duration
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">

      <Nav />
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-400">Your Shopping Cart</h1>
          <Link 
            to="/home" 
            className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-xl font-medium text-gray-300 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-4">Looks like you haven't added any items yet</p>
            <Link
              to="/home"
              className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {cart.map(item => (
                <div 
                  key={item._id} 
                  className={`relative border-b border-gray-700 last:border-b-0 transition-all duration-300 ${
                    isRemoving === item._id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}
                >
                  <div className="p-4 flex items-start sm:items-center gap-4">
                    <div className="flex-shrink-0">
                      <img 
                        src={item.url} 
                        alt={item.name} 
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2296%22%20height%3D%2296%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2096%2096%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18d2b8a6e9a%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18d2b8a6e9a%22%3E%3Crect%20width%3D%2296%22%20height%3D%2296%22%20fill%3D%22%23333%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2236%22%20y%3D%2251.5%22%3E96x96%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white truncate">{item.name}</h3>
                      <p className="text-emerald-400 font-medium">${item.price.toFixed(2)} each</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button 
                          onClick={() => decreaseQty(item._id)}
                          disabled={item.quantity <= 1}
                          className={`w-8 h-8 flex items-center justify-center rounded-full ${
                            item.quantity <= 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white'
                          } transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <span className="text-white font-medium w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => increaseQty(item._id)}
                          disabled={item.quantity >= 10}
                          className={`w-8 h-8 flex items-center justify-center rounded-full ${
                            item.quantity >= 10 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white'
                          } transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-white font-bold text-lg mb-2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button 
                        onClick={() => removeItem(item._id)}
                        className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-300">Order Summary</h2>
                <span className="text-gray-400">{cart.reduce((sum, item) => sum + item.quantity, 0)} items</span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-emerald-400">FREE</span>
                </div>
              </div>
              <div className="flex justify-between border-t border-gray-700 pt-4">
                <span className="text-xl font-bold text-white">Total</span>
                <span className="text-xl font-bold text-emerald-400">${total.toFixed(2)}</span>
              </div>
              <button className="w-full mt-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors duration-200">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;