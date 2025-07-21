import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import PostDetail from '../../src/components/Posts/PostDetail';
import store from '../../src/store';

test('renders post detail', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/posts/1']}>
        <PostDetail />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});