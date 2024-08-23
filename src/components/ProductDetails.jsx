import React from 'react';

const ProductDetails = ({ product }) => {
  const { 
    availableColors, 
    brand, 
    description, 
    image, 
    imageCollection, 
    name, 
    price, 
    sizes 
  } = product;

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', width: '300px', margin: '10px' }}>
      <img src={image} alt={name} style={{ width: '100%' }} />
      <h2>{name}</h2>
      <p>Brand: {brand}</p>
      <p>Price: ${price}</p>
      <p>{description}</p>
      <p>Sizes: {sizes.join(', ')}</p>
      <p>Available Colors:</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        {availableColors.map((color, index) => (
          <div 
            key={index} 
            style={{ 
              backgroundColor: color, 
              width: '20px', 
              height: '20px', 
              borderRadius: '50%' 
            }} 
          />
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>Additional Images:</p>
        {imageCollection.map(img => (
          <img 
            key={img.id} 
            src={img.url} 
            alt={`${name} additional`} 
            style={{ width: '50px', marginRight: '10px' }} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;