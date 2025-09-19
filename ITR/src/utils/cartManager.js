// Cart manager utility with backend integration
export const cartManager = {
  // Get cart from localStorage
  getCart() {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
      return [];
    }
  },

  // Save cart to localStorage
  saveCart(cart) {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      // Dispatch event to update other components
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      return true;
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
      return false;
    }
  },

  // Add item to cart with backend sync
  async addToCart(product) {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');
      
      console.log('CartManager - User ID:', userId, 'Token exists:', !!token);
      
      if (!userId || !token) {
        console.error('User not authenticated');
        return false;
      }

      // Add to localStorage first for immediate UI update
      const cart = this.getCart();
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1
        });
      }
      
      this.saveCart(cart);
      console.log('Cart saved to localStorage:', cart);

      // Sync with backend
      const backendData = {
        productId: product.id.toString(),
        productName: product.name,
        productPrice: product.price,
        productImage: product.image,
        quantity: existingItem ? existingItem.quantity : 1
      };

      console.log('Sending to backend:', backendData);
      console.log('Backend URL: http://localhost:4200/api/cart/add');
      console.log('Authorization header:', `Bearer ${token.substring(0, 20)}...`);

      const response = await fetch('http://localhost:4200/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(backendData)
      });

      console.log('Backend response status:', response.status);
      console.log('Backend response headers:', response.headers);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Cart item added to backend successfully:', responseData);
        return true;
      } else {
        const errorData = await response.json();
        console.error('Failed to add item to backend cart:', errorData);
        // Remove from localStorage if backend fails
        if (existingItem) {
          existingItem.quantity -= 1;
          if (existingItem.quantity === 0) {
            const filteredCart = cart.filter(item => item.id !== product.id);
            this.saveCart(filteredCart);
          } else {
            this.saveCart(cart);
          }
        } else {
          const filteredCart = cart.filter(item => item.id !== product.id);
          this.saveCart(filteredCart);
        }
        return false;
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return false;
    }
  },

  // Update item quantity with backend sync
  async updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) return false;
    
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');
      
      if (!userId || !token) {
        console.error('User not authenticated');
        return false;
      }

      // Update localStorage first
      const cart = this.getCart();
      const itemIndex = cart.findIndex(item => item.id === productId);
      
      if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        this.saveCart(cart);

        // Sync with backend
        const response = await fetch(`http://localhost:4200/api/cart/update/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ quantity: newQuantity })
        });

        if (response.ok) {
          console.log('Cart item quantity updated in backend successfully');
          return true;
        } else {
          console.error('Failed to update quantity in backend');
          return false;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error updating quantity:', error);
      return false;
    }
  },

  // Remove item from cart with backend sync
  async removeFromCart(productId) {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');
      
      if (!userId || !token) {
        console.error('User not authenticated');
        return false;
      }

      // Remove from localStorage first
      const cart = this.getCart();
      const filteredCart = cart.filter(item => item.id !== productId);
      this.saveCart(filteredCart);

      // Sync with backend
      const response = await fetch(`http://localhost:4200/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        console.log('Cart item removed from backend successfully');
        return true;
      } else {
        console.error('Failed to remove item from backend cart');
        return false;
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      return false;
    }
  },

  // Clear entire cart with backend sync
  async clearCart() {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');
      
      if (!userId || !token) {
        console.error('User not authenticated');
        return false;
      }

      // Clear localStorage first
      localStorage.removeItem('cart');
      window.dispatchEvent(new CustomEvent('cartUpdated'));

      // Sync with backend
      const response = await fetch('http://localhost:4200/api/cart/clear', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        console.log('Cart cleared from backend successfully');
        return true;
      } else {
        console.error('Failed to clear cart from backend');
        return false;
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  },

  // Load cart from backend
  async loadCartFromBackend() {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');
      
      console.log('loadCartFromBackend - User ID:', userId, 'Token exists:', !!token);
      
      if (!userId || !token) {
        console.log('User not authenticated, using localStorage cart');
        return this.getCart();
      }

      console.log('Loading cart from backend for user:', userId);
      console.log('Backend URL: http://localhost:4200/api/cart');
      console.log('Authorization header:', `Bearer ${token.substring(0, 20)}...`);

      const response = await fetch('http://localhost:4200/api/cart', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Backend response status:', response.status);
      console.log('Backend response headers:', response.headers);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Backend cart response:', responseData);
        
        // Backend returns { cart: { userId, items: [], totalAmount: 0 } }
        const backendCart = responseData.cart;
        console.log('Extracted backend cart:', backendCart);
        
        if (backendCart && backendCart.items && backendCart.items.length > 0) {
          // Convert backend format to frontend format
          const convertedCart = backendCart.items.map(item => ({
            id: parseInt(item.productId),
            name: item.productName,
            price: item.productPrice,
            image: item.productImage,
            quantity: item.quantity
          }));
          
          console.log('Converted cart:', convertedCart);
          
          // Update localStorage with backend data
          this.saveCart(convertedCart);
          return convertedCart;
        } else {
          // Backend cart is empty, clear localStorage
          console.log('Backend cart is empty, clearing localStorage');
          this.saveCart([]);
          return [];
        }
      } else {
        console.error('Failed to load cart from backend, status:', response.status);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        return this.getCart();
      }
    } catch (error) {
      console.error('Error loading cart from backend:', error);
      return this.getCart();
    }
  },

  // Get cart item count
  getCartItemCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  // Get cart total amount
  getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
};
