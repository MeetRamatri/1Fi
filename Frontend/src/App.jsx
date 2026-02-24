import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please ensure the backend server is running.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>1Fi Premium Store</h1>
        <p>Explore our exclusive collection of flagship devices</p>
      </header>

      <main>
        {loading && (
          <div className="loading">
            <p>Loading premium collection...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="loading">
            <p>No products found in the catalog.</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <span className="product-badge">New</span>
                <div className="product-info">
                  <div className="product-brand">{product.brand}</div>
                  <h2 className="product-title">{product.name}</h2>
                  <p className="product-desc">{product.description}</p>
                </div>
                
                <div className="price-container">
                  <div>
                    <div className="price-label">Starting from</div>
                    <div>
                      <span className="base-price">{formatINR(product.base_price)}</span>
                      <span className="mrp-price">{formatINR(product.mrp)}</span>
                    </div>
                  </div>
                </div>
                
                <button className="view-btn">View Details & EMI</button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
