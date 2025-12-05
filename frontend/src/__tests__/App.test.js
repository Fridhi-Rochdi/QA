import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders welcome message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bienvenue sur BazaarNet/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders login button', () => {
  render(<App />);
  const loginBtn = screen.getByRole('button', { name: /Connexion/i });
  expect(loginBtn).toBeInTheDocument();
});
