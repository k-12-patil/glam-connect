// Order manager utility with backend integration
export const orderManager = {
  // Get user's orders from backend
  async getOrders() {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');
      
      if (!userId || !token) {
        throw new Error('User not authenticated');
      }

      const response = await fetch('http://localhost:4200/api/orders', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch orders');
      }

      const result = await response.json();
      return result.orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Create new order
  async createOrder(orderData) {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');
      
      if (!userId || !token) {
        throw new Error('User not authenticated');
      }

      const response = await fetch('http://localhost:4200/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        let message = `HTTP ${response.status}`;
        const ct = response.headers.get('content-type') || '';
        try {
          if (ct.includes('application/json')) {
            const errorData = await response.json();
            message = errorData.message || message;
          } else {
            const text = await response.text();
            if (text && text.length < 500) message = text;
          }
        } catch (e) {
          // ignore parse errors
        }
        throw new Error(message || 'Failed to create order');
      }

      const result = await response.json();
      return result.order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Format order status for display
  formatOrderStatus(status) {
    const statusConfig = {
      'Placed': { text: 'Order Placed', color: '#17a2b8', icon: '📦' },
      'Confirmed': { text: 'Order Confirmed', color: '#ffc107', icon: '✅' },
      'Shipped': { text: 'Order Shipped', color: '#007bff', icon: '🚚' },
      'Delivered': { text: 'Order Delivered', color: '#28a745', icon: '🎉' },
      'Cancelled': { text: 'Order Cancelled', color: '#dc3545', icon: '❌' }
    };
    
    return statusConfig[status] || { text: status, color: '#6c757d', icon: '❓' };
  },

  // Format payment status for display
  formatPaymentStatus(status) {
    const statusConfig = {
      'Pending': { text: 'Payment Pending', color: '#ffc107', icon: '⏳' },
      'Completed': { text: 'Payment Completed', color: '#28a745', icon: '✅' },
      'Failed': { text: 'Payment Failed', color: '#dc3545', icon: '❌' }
    };
    
    return statusConfig[status] || { text: status, color: '#6c757d', icon: '❓' };
  },

  // Format payment method for display
  formatPaymentMethod(method) {
    const methodConfig = {
      'COD': { text: 'Cash on Delivery', icon: '💵' },
      'UPI': { text: 'UPI Payment', icon: '📱' }
    };
    
    return methodConfig[method] || { text: method, icon: '💳' };
  }
};
