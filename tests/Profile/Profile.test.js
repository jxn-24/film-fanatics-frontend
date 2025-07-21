import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../../src/components/Profile/Profile';
import store from '../../src/store';

test('renders profile page', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText(/Please log in to view your profile/i)).toBeInTheDocument();
});