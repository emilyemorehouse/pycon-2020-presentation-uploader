import React from 'react'
import { render } from '@testing-library/react'

// Components
import { TestWrapper } from 'utils/TestWrapper'
import { UploadPresentation } from '../index'

const renderComponent = (props = {}) =>
  render(
    <TestWrapper>
      <UploadPresentation {...props} />
    </TestWrapper>,
  )

/**
 *
 * Tests for UploadPresentation
 *
 */
describe('UploadPresentation', () => {
  it('renders and matches snapshot', () => {
    const { container } = renderComponent()
    expect(container).toMatchSnapshot()
  })
})
