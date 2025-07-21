import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../src/components/Layout/Navbar';
import store from '../../src/store';

test('renders navbar', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText(/Film Fanatics/i)).toBeInTheDocument();
  expect(screen.getByText(/Clubs/i)).toBeInTheDocument();
  expect(screen.getByText(/Posts/i)).toBeInTheDocument();
});