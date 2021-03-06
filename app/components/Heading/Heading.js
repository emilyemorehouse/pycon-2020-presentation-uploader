/* eslint-disable react/prop-types */
import React from 'react'

// Components
import { Heading as GrommetHeading } from 'grommet'

// Helpers
import { doc } from './Heading.doc'
import { createWithDoc } from '../../utils/helpers'

/**
 *
 * Heading
 *
 */
const Heading = ({ children, ...rest }) => <GrommetHeading {...rest}>{children}</GrommetHeading>

export default createWithDoc({
  envName: process.env.NODE_ENV,
  docFunction: doc,
  component: Heading,
})
