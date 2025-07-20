import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CreatePost from '../../src/components/Posts/CreatePost';
import store from '../../src/store';

test('renders create post form', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText(/Create Post/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Write your post.../i)).toBeInTheDocument();
});