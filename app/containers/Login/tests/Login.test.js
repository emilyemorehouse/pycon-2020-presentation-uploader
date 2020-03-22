import React from 'react'
import { render } from '@testing-library/react'

// Components
import { TestWrapper } from 'utils/TestWrapper'
import { Login } from '../index'

const renderComponent = (props = {}) =>
  render(
    <TestWrapper>
      <Login {...props} />
    </TestWrapper>,
  )

/**
 *
 * Tests for Login
 *
 */
describe('Login', () => {
  it('renders and matches snapshot', () => {
    const { container } = renderComponent()
    expect(container).toMatchSnapshot()
  })
})
