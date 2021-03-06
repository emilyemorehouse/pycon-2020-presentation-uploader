import React from 'react'
import { render } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect' // add some helpful assertions

import Table from './Table'
import TableBody from './TableBody'
import TableHeader from './TableHeader'
import TableFooter from './TableFooter'
import TableRow from './TableRow'
import TableCell from './TableCell'
import { Heading } from '../Heading'

const columns = [
  {
    property: 'name',
    align: 'start',
    label: 'Name',
    dataScope: 'col',
  },
  {
    property: 'email',
    align: 'start',
    label: 'Email',
    dataScope: 'col',
  },
  {
    property: 'amount',
    align: 'start',
    label: 'Amount',
    dataScope: 'col',
  },
]

const data = [
  {
    id: 1,
    name: 'Eric',
    email: 'eric@gmail.com',
    amount: '$45',
  },
  {
    id: 2,
    name: 'Chris',
    email: 'chris@gmail.com',
    amount: '$45',
  },
  {
    id: 3,
    name: 'Shanna',
    email: 'shanna@gmail.com',
    amount: '$45',
  },
]

const renderComponent = (props = {}) =>
  render(
    <Table {...props}>
      <TableHeader>
        <TableRow>
          {columns.map(c => (
            <TableCell key={c.property} scope="col" align={c.align}>
              <Heading level="4">{c.label}</Heading>
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(datum => (
          <TableRow key={datum.id}>
            {columns.map(c => (
              <TableCell key={c.property} scope={c.dataScope} align={c.align}>
                <Heading level="5">{c.format ? c.format(datum) : datum[c.property]}</Heading>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          {columns.map(c => (
            <TableCell key={c.property} align={c.align}>
              <Heading level="4">{c.footer}</Heading>
            </TableCell>
          ))}
        </TableRow>
      </TableFooter>
    </Table>,
  )

/**
 *
 * Tests for Table
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */
describe('Table', () => {
  it('renders and matches snapshot', () => {
    const { container } = renderComponent()

    expect(container).toMatchSnapshot()
  })
})
