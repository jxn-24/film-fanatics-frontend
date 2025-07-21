import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import WatchedMovies from '../../src/components/Tracker/WatchedMovies';
import store from '../../src/store';

test('renders watched movies page', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <WatchedMovies />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText(/Watched Movies/i)).toBeInTheDocument();
});