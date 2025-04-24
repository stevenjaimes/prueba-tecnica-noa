const API_BASE_URL = 'http://localhost:3001/favorites';

export const toggleFavorite = async (userId: string, resourceId: string) => {
    console.log(userId, resourceId)
  try {
    const response = await fetch(`${API_BASE_URL}/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
  
      body: JSON.stringify({ userId, resourceId }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};

export const getFavoriteStatus = async (userId: string, resourceId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/status/${userId}/${resourceId}`);
    return await response.json();
  } catch (error) {
    console.error('Error getting favorite status:', error);
    throw error;
  }
};

export const getUserFavorites = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`);
    return await response.json();
  } catch (error) {
    console.error('Error getting user favorites:', error);
    throw error;
  }
};