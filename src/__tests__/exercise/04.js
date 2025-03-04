// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import {build, fake} from '@jackfranklin/test-data-bot'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  const user = userEvent.setup()

  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)

  const {username, password} = buildLoginForm()
  await user.type(usernameField, username)
  await user.type(passwordField, password)

  const submitButton = screen.getByRole('button', /submit/i)

  await user.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledWith({username, password})
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
