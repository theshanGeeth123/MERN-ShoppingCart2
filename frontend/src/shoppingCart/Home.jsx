import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [addedToCartId, setAddedToCartId] = useState(null); 

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: parseInt(quantity),
    }));
  };

  const addToCart = (product) => {
    if (!product.availability) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const selectedQty = quantities[product._id] || 1;

    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      if (existing.quantity + selectedQty > 10) {
        return;
      }
      existing.quantity += selectedQty;
    } else {
      cart.push({ ...product, quantity: selectedQty });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Show check icon temporarily
    setAddedToCartId(product._id);
    setTimeout(() => setAddedToCartId(null), 1000); // Hide after 1 second
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-400 mb-8">Our Products</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div 
              key={product._id} 
              className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-1 ${
                !product.availability ? 'opacity-70' : ''
              }`}
            >
              <div className="relative">
                <img 
                  src={product.url} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
                {/* Availability Badge */}
                <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
                  product.availability ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {product.availability ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                <p className="text-gray-300 text-sm mb-2 line-clamp-2">{product.description}</p>
                <p className="text-emerald-400 font-bold text-lg mb-3">${product.price.toFixed(2)}</p>

                {/* Quantity Selector */}
                <div className="flex items-center mb-4">
                  <label htmlFor={`qty-${product._id}`} className="text-gray-300 mr-2 text-sm">Quantity:</label>
                  <select
                    id={`qty-${product._id}`}
                    value={quantities[product._id] || 1}
                    onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                    className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    disabled={!product.availability}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className={`w-full px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    product.availability 
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!product.availability}
                >
                  {addedToCartId === product._id ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Added
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;