
import React, { useState, useCallback } from 'react';
import { MenuItem, CartItem } from './types';
import Header from './components/Header';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  const menuData: MenuItem[] = [
    { id: 1, name: 'Supreme Mango Graham Shake', description: 'Our bestseller! Creamy mango shake with layers of crushed graham and topped with fresh mango cubes.', price: 120, image: 'https://picsum.photos/id/1060/400/300' },
    { id: 2, name: 'Classic Halo-Mango', description: 'A twist on the classic Halo-Halo, with a generous serving of sweet mango chunks and mango ice cream.', price: 150, image: 'https://picsum.photos/id/1080/400/300' },
    { id: 3, name: 'Mango Float Supreme', description: 'Layers of sweet cream, graham crackers, and fresh Cebu mangoes. A delightful dessert box.', price: 180, image: 'https://picsum.photos/id/25/400/300' },
    { id: 4, name: 'Mango Sticky Rice', description: 'Authentic Thai dessert with a Cebuano twist. Sweet sticky rice with fresh mango slices and coconut milk.', price: 135, image: 'https://picsum.photos/id/431/400/300' },
    { id: 5, name: 'Mango Sago Cooler', description: 'A refreshing drink with fresh mango juice, chewy sago pearls, and mango bits.', price: 95, image: 'https://picsum.photos/id/102/400/300' },
    { id: 6, name: 'Spicy Mango Tango', description: 'A unique blend of sweet mangoes with a hint of chili for a surprising kick.', price: 125, image: 'https://picsum.photos/id/312/400/300' },
  ];

  const handleToggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  const handleAddToCart = useCallback((item: MenuItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((itemId: number, newQuantity: number) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.id !== itemId);
      }
      return prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const handlePlaceOrder = useCallback(() => {
    setCartItems([]);
    setIsCartOpen(false);
    setShowOrderSuccess(true);
    setTimeout(() => {
      setShowOrderSuccess(false);
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50 font-sans text-hm-dark flex flex-col">
      <Header cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} onCartClick={handleToggleCart} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Menu menuItems={menuData} onAddToCart={handleAddToCart} />
      </main>
      <Footer />
      <Cart 
        isOpen={isCartOpen} 
        onClose={handleToggleCart} 
        cartItems={cartItems} 
        onUpdateQuantity={handleUpdateQuantity}
        onPlaceOrder={handlePlaceOrder}
      />
      {showOrderSuccess && (
        <div className="fixed top-5 right-5 bg-green-500 text-white py-3 px-6 rounded-lg shadow-xl animate-bounce">
          Order placed successfully!
        </div>
      )}
    </div>
  );
};

export default App;
