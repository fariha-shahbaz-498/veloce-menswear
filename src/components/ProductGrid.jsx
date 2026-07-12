import React, { useEffect, useState } from 'react';
import { fetchAllProducts } from '../services/productService';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const result = await fetchAllProducts();
        setProducts(result.data);
      } catch (error) {
        console.error("Failed to load catalog:", error);
      } finally {
        setLoading(false);
      }
    };
    loadInventory();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading premium collections...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '1px' }}>
        LATEST MERCHANDISE
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: '1px solid #eaeaea', borderRadius: '4px', padding: '1rem', background: '#fff' }}>
            <img 
              src={product.images[0]} 
              alt={product.name} 
              style={{ width: '100%', height: '340px', objectFit: 'cover', background: '#f9f9f9', marginBottom: '1rem' }} 
            />
            <h3 style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>{product.name}</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{product.category}</p>
            <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;