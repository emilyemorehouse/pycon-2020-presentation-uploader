import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'

import Image from './Image'

const renderComponent = (props = {}) => render(<Image {...props} />)

/**
 *
 * Tests for Image
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */
describe('Image', () => {
  it('renders and matches snapshot', () => {
    const { container } = renderComponent()

    expect(container).toMatchSnapshot()
  })
})
