import { loginUser, logoutUser, registerUser } from './authSlice';

// Async action to handle login API call and store JWT token
export const loginUserAsync = (credentials) => async (dispatch) => {
  try {
    console.log('Sending login request with:', JSON.stringify(credentials));
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers));
    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const userWithToken = {
      token: data.access_token,
    };

    dispatch(loginUser(userWithToken));
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Async action to handle registration API call
export const registerUserAsync = (userData) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    dispatch(registerUser(data.user || {}));
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Action to logout user
export const logoutUserAsync = () => (dispatch) => {
  dispatch(logoutUser());
};