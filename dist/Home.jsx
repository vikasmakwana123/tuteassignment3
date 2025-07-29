import React from 'react';
import Card from '../components/card.jsx';

const Home = () => {
  const [cartItems, setCartItems] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [NoofItems, setNoOfItems] = React.useState(0);

  const shoes = [
    {
      id: 1,
      name: "Nike Air Max 270",
      price: 9999,
      image: "https://sneakernews.com/wp-content/uploads/2020/11/Nike-Air-Max-270-DH0268_100-Release-Info-4.jpg",
    },
    {
      id: 2,
      name: "Adidas Ultraboost 22",
      price: 8999,
      image: "https://sneakernews.com/wp-content/uploads/2021/12/adidas-UltraBOOST-22-GX3061-0.jpg",
    },
    {
      id: 3,
      name: "Puma RS-X",
      price: 7499,
      image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/369579/01/sv01/fnd/IND/fmt/png",
    },
    {
      id: 4,
      name: "Reebok Classic Leather",
      price: 5999,
      image: "https://reebok.ca/cdn/shop/products/1ZeCTa3GN9l1FUM1m5Ga-1Q6uhW72Jr8L.jpg",
    },
    {
      id: 5,
      name: "New Balance 574",
      price: 6999,
      image: "https://www.80scasualclassics.co.uk/blog/wp-content/uploads/2018/08/New-Balance-574-Trainers-Navy-Yellow-1024x1024.jpg",
    },
  ];

  const addToCart = (shoe) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === shoe.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === shoe.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...shoe, quantity: 1 }];
      }
    });
    setTotalPrice((prev) => prev + shoe.price);
    setNoOfItems((prev) => prev + 1);
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    const shoe = cartItems.find((item) => item.id === id);
    if (shoe) {
      setTotalPrice((prev) => prev + shoe.price);
      setNoOfItems((prev) => prev + 1);
    }
  };

  const decreaseQuantity = (id) => {
    const shoe = cartItems.find((item) => item.id === id);
    if (!shoe) return;

    if (shoe.quantity === 1) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }

    setTotalPrice((prev) => prev - shoe.price);
    setNoOfItems((prev) => prev - 1);
  };

  return (
    <div style={{width:'100vw'}}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 30px', backgroundColor: '#d1cdcdff', borderRadius: '10px' }}>
        <h2 style={{ fontSize: '27px' }}>Shoe store</h2>
        <div style={{ display: 'flex', gap: '20px', fontSize: '18px', fontWeight: 'bold' }}>
          <span>Home</span>
          <span>About Us</span>
          <span>Contact</span>

        </div>
      </header>

      <div style={{ display: 'flex', gap: '20px', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
        {/* Product Cards */}
        <div style={{ display: 'grid', padding: '10px', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginLeft: '40px' }}>
          {shoes.map((shoe) => (
            <Card key={shoe.id} shoe={shoe} addToCart={addToCart} />
          ))}
        </div>

        {/* Cart Section */}
        {cartItems.length === 0 ? (
          <div
            style={{
              marginLeft: '40px',
              border: '2px solid #ccc',
              padding: '20px',
              background: '#ece7e7cd',
              borderRadius: '10px',
              height: 'fit-content',
              flex: 1, // Ensures it expands within the flex container
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              minWidth: '300px'
            }}
          >
            Your cart is empty
          </div>
        ) : (<div style={{ marginLeft: '40px', border: '2px solid #ccc', padding: '20px', background: '#ece7e7cd', borderRadius: '10px', height: 'fit-content' }}>
          <h2>Cart Items</h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {cartItems.map((item) => (
              <li
                key={item.id}
                style={{
                  padding: '10px 25px',
                  border: '1px solid #ccc',
                  borderRadius: '5px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{item.name} - ₹{item.price}</span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <div
                      style={{
                        backgroundColor: '#bbb',
                        padding: '8px 20px',
                        borderRadius: '5px'
                      }}
                    >
                      {item.quantity}
                    </div>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <p>Total Items: {NoofItems}</p>
          <p>Total Price: ₹{totalPrice}</p>
        </div>)
        }
      </div>
    </div>
  );
};

export default Home;
