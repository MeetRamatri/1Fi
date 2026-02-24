import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetailsPage() {
  const { slug } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedEmi, setSelectedEmi] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProductData(data);
        
        if (data.variants && data.variants.length > 0) {
            setSelectedVariant(data.variants[0]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch product details:", err);
        setError("Failed to load product details.");
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [slug]);

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!productData || !productData.product) return <div className="error">Product not found.</div>;

  const { product, variants, emiOptions } = productData;
  const displayPrice = selectedVariant ? selectedVariant.variant_price : product.base_price;

  return (
    <div className="app-container">
      <Link to="/" style={{ textDecoration: 'none', color: '#007bff', marginBottom: '20px', display: 'inline-block' }}>
        &larr; Back to Store
      </Link>
      
      <div className="product-details-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginTop: '20px' }}>
        
        {/* Left Col: Variants & Image */}
        <div style={{ flex: '1 1 300px', background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <div className="product-brand" style={{ fontSize: '14px', color: '#888', textTransform: 'uppercase' }}>{product.brand}</div>
            <h1 style={{ margin: '5px 0 15px 0' }}>{product.name}</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{formatINR(displayPrice)}</span>
                <span style={{ fontSize: '16px', color: '#999', textDecoration: 'line-through', marginLeft: '10px' }}>{formatINR(product.mrp)}</span>
            </div>

            <p style={{ color: '#555', lineHeight: '1.6' }}>{product.description}</p>
            
            <h3 style={{ marginTop: '30px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Select Variant</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px', marginTop: '15px' }}>
                {variants.map(variant => {
                    const isSelected = selectedVariant && selectedVariant._id === variant._id;
                    return (
                        <div 
                            key={variant._id} 
                            onClick={() => setSelectedVariant(variant)}
                            style={{ 
                                border: isSelected ? '2px solid #007bff' : '1px solid #ddd', 
                                backgroundColor: isSelected ? '#f4faff' : 'white',
                                borderRadius: '8px', 
                                padding: '10px', 
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <img src={variant.image_url} alt={`${product.name} ${variant.color}`} style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '10px' }} />
                            <div style={{ fontWeight: 'bold' }}>{variant.color}</div>
                            <div style={{ fontSize: '14px', color: '#666' }}>{variant.storage} | {variant.ram}</div>
                            <div style={{ color: '#007bff', fontWeight: 'bold', marginTop: '5px' }}>{formatINR(variant.variant_price)}</div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Right Col: EMI Options */}
        <div style={{ flex: '1 1 300px', background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h2 style={{ margin: '0 0 20px 0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Select EMI Option</h2>
            
            {emiOptions.length === 0 ? (
                <p>No EMI options available for this product.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {emiOptions.map(emi => {
                        const isSelected = selectedEmi && selectedEmi._id === emi._id;
                        return (
                            <div 
                                key={emi._id} 
                                onClick={() => setSelectedEmi(emi)}
                                style={{ 
                                    border: isSelected ? '2px solid #28a745' : '1px solid #ddd', 
                                    borderRadius: '8px', 
                                    padding: '15px', 
                                    background: isSelected ? '#f4fff4' : '#fafafa',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: isSelected ? '#28a745' : '#333' }}>
                                        {emi.tenure_month} Months x {formatINR(emi.monthly_amount)}
                                    </span>
                                    {isSelected && <span style={{ color: '#28a745', fontWeight: 'bold' }}>✓ Selected</span>}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#555' }}>
                                    <span>Interest: {emi.interest_rate}%</span>
                                    <span>Processing Fee: {formatINR(emi.processing_fee)}</span>
                                </div>
                                {emi.cashback_amount > 0 && (
                                    <div style={{ marginTop: '10px', color: '#28a745', fontWeight: 'bold', fontSize: '14px' }}>
                                        ✨ {formatINR(emi.cashback_amount)} Cashback Included!
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
            
            <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <button 
                    disabled={!selectedVariant || !selectedEmi}
                    style={{ 
                        backgroundColor: (!selectedVariant || !selectedEmi) ? '#cccccc' : '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        padding: '15px', 
                        borderRadius: '8px', 
                        cursor: (!selectedVariant || !selectedEmi) ? 'not-allowed' : 'pointer', 
                        width: '100%', 
                        fontWeight: 'bold',
                        fontSize: '16px',
                        transition: 'background-color 0.2s ease'
                    }}
                >
                    {(!selectedVariant || !selectedEmi) ? 'Select a Variant and EMI Plan to Continue' : 'Proceed to Checkout'}
                </button>
            </div>

        </div>

      </div>
    </div>
  );
}

export default ProductDetailsPage;
