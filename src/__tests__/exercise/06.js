// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'

jest.mock('react-use-geolocation')

beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})

let setReturnValue
function useMockCurrentPosition() {
  const state = React.useState([])

  setReturnValue = state[1]

  return state[0]
}

test('displays the users current location', async () => {
  useCurrentPosition.mockImplementation(useMockCurrentPosition)
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  }

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  act(() => {
    setReturnValue([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

/*
eslint
  no-unused-vars: "off",
*/
