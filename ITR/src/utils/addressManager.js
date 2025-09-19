// Address manager utility with backend integration
export const addressManager = {
  // Get user's addresses from backend
  async getAddresses() {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');
      
      if (!userId || !token) {
        throw new Error('User not authenticated');
      }

      const response = await fetch('http://localhost:4200/api/addresses', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch addresses');
      }

      const result = await response.json();
      return result.addresses;
    } catch (error) {
      console.error('Error fetching addresses:', error);
      throw error;
    }
  },

  // Add new address
  async addAddress(addressData) {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');
      
      if (!userId || !token) {
        throw new Error('User not authenticated');
      }

      const response = await fetch('http://localhost:4200/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addressData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add address');
      }

      const result = await response.json();
      return result.address;
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  },

  // Update existing address
  async updateAddress(addressId, updateData) {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');
      
      if (!userId || !token) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`http://localhost:4200/api/addresses/${addressId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update address');
      }

      const result = await response.json();
      return result.address;
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  },

  // Delete address
  async deleteAddress(addressId) {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');
      
      if (!userId || !token) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`http://localhost:4200/api/addresses/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete address');
      }

      return true;
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  },

  // Set default address
  async setDefaultAddress(addressId) {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');
      
      if (!userId || !token) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`http://localhost:4200/api/addresses/${addressId}/default`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to set default address');
      }

      const result = await response.json();
      return result.address;
    } catch (error) {
      console.error('Error setting default address:', error);
      throw error;
    }
  },

  // Get default address
  async getDefaultAddress() {
    try {
      const addresses = await this.getAddresses();
      return addresses.find(addr => addr.isDefault) || addresses[0] || null;
    } catch (error) {
      console.error('Error getting default address:', error);
      return null;
    }
  }
};
