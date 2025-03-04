// simple test with React Testing Library
// http://localhost:3000/counter

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', async () => {
  render(<Counter />)
  const user = userEvent.setup()
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i)

  expect(message).toHaveTextContent('Current count: 0')

  await user.click(increment)

  expect(message).toHaveTextContent('Current count: 1')

  await user.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
