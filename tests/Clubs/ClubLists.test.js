import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ClubList from '../../src/components/Clubs/ClubLists';
import store from '../../src/store';

test('renders club list', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ClubList />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText(/Movie Clubs/i)).toBeInTheDocument();
});