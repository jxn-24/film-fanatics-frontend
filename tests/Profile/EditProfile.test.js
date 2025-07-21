import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import EditProfile from '../../src/components/Profile/EditProfile';
import store from '../../src/store';

test('renders edit profile form', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <EditProfile />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Bio/i)).toBeInTheDocument();
});