import React from 'react'
import { render } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect' // add some helpful assertions

import { Dashboard } from '../index'

const renderComponent = (props = {}) => render(<Dashboard {...props} />)

/**
*
* Tests for Dashboard
*
* @see
https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
*
*/
describe('Dashboard', () => {
  it('renders and matches snapshot', () => {
    const { container } = renderComponent()
    expect(container).toMatchSnapshot()
  })

  it('does not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(<Dashboard />)
    expect(spy).not.toHaveBeenCalled()
  })

  it('has additional unit tests specified', () => {
    expect(true).toEqual(false)
  })
})
