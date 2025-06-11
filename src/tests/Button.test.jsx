import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/UI/Button';
import { vi } from 'vitest';
import { describe, test, expect } from 'vitest'


describe('Button component', () => {
  test('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText(/click me/i)).toBeInTheDocument();
  });

  test('renders with loading spinner', () => {
    render(<Button loading>Loading...</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
