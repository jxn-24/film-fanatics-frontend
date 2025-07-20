import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PostList from '../../src/components/Posts/PostList';
import store from '../../src/store';

test('renders post list', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <PostList />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText(/Posts/i)).toBeInTheDocument();
});