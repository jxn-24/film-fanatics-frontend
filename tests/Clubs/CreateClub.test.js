import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CreateClub from '../../src/components/Clubs/CreateClub';
import store from '../../src/store';

test('renders create club form', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CreateClub />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText(/Create Club/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Club Name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
});