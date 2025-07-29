import React from 'react';

const Card = ({ shoe, addToCart }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', width: '300px' ,backgroundColor: '#f8f4ebff', borderRadius: '15px'}}>
      <img src={shoe.image} alt={shoe.name} style={{ width: '100%',height:'200px',border:'1px solid gray' ,borderRadius:'10px'}} />
      <h3>{shoe.name}</h3>
      <p>₹{shoe.price}</p>
      <button style={{backgroundColor:'#cdcbcbff'}}onClick={() => addToCart(shoe)}>Add to Cart</button>
    </div>
  );
};

export default Card;
