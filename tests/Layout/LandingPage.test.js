import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../../src/components/Layout/LandingPage';
import store from '../../src/store';

test('renders landing page', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText(/Welcome to Film Fanatics/i)).toBeInTheDocument();
  expect(screen.getByText(/Join Now/i)).toBeInTheDocument();
});