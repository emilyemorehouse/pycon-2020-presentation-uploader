import React from 'react'
import { render } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect' // add some helpful assertions

// Components
import { TestWrapper } from 'utils/TestWrapper'
import Menu from './Menu'

const renderComponent = (props = {}) =>
  render(
    <TestWrapper>
      <Menu {...props} />
    </TestWrapper>,
  )

/**
 *
 * Tests for Menu
 *
 */
describe('Menu', () => {
  it('renders and matches snapshot', () => {
    const { container } = renderComponent()
    expect(container).toMatchSnapshot()
  })
})
