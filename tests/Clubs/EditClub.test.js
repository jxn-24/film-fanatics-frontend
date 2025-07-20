import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import EditClub from '../../src/components/Clubs/EditClub';
import store from '../../src/store';

test('renders edit club form', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <EditClub />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText(/Edit Club/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Club Name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
});