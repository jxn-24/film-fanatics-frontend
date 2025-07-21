import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import ClubDetail from '../../src/components/Clubs/ClubDetails';
import store from '../../src/store';

test('renders club detail', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/clubs/1']}>
        <ClubDetail />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});