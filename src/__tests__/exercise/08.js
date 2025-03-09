// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act, renderHook} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
const UseCounterHookExample = () => {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <div> Current count: {count} </div>

      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  render(<UseCounterHookExample />)

  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i)

  expect(message).toHaveTextContent('Current count: 0')

  await userEvent.click(increment)

  expect(message).toHaveTextContent('Current count: 1')

  await userEvent.click(decrement)

  expect(message).toHaveTextContent('Current count: 0')
})

let result
const TestComponent = ({initialCount = 0, step = 1} = {}) => {
  result = useCounter({initialCount, step})

  return null
}
test('functionalities should work without a rendered componente', () => {
  render(<TestComponent />)

  expect(result.count).toBe(0)
  act(() => result.increment())

  expect(result.count).toBe(1)

  act(() => result.decrement())

  expect(result.count).toBe(0)
})

test('customization inicial count', () => {
  render(<TestComponent initialCount={5} />)

  expect(result.count).toBe(5)
  act(() => result.increment())

  expect(result.count).toBe(6)

  act(() => result.decrement())

  expect(result.count).toBe(5)
})
test('customization step count', () => {
  render(<TestComponent step={5} />)

  expect(result.count).toBe(0)
  act(() => result.increment())

  expect(result.count).toBe(5)

  act(() => result.decrement())

  expect(result.count).toBe(0)
})
test('customization step count - renderHook', () => {
  const {result, rerender} = renderHook(useCounter, {initialProps: {step: 5}})
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())

  expect(result.current.count).toBe(5)

  rerender({step: 2})
  act(() => result.current.decrement())

  expect(result.current.count).toBe(3)
})

/* eslint no-unused-vars:0 */
