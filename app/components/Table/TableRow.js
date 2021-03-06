/* eslint-disable react/prop-types */
import React from 'react'

// Components
import { TableRow as GrommetTableRow } from 'grommet'

// Helpers
import { doc } from './TableRow.doc'
import { createWithDoc } from '../../utils/helpers'

/**
 *
 * TableRow
 *
 */
function TableRow({ children, ...props }) {
  return <GrommetTableRow {...props}>{children}</GrommetTableRow>
}

export default createWithDoc({
  envName: process.env.NODE_ENV,
  docFunction: doc,
  component: TableRow,
})
