/* eslint-disable react/prop-types */
import React from 'react'

// Components
import { Header as GrommetHeader } from 'grommet'
import { Anchor } from '../Anchor'
import { Box } from '../Box'

// Helpers
import { doc } from './Header.doc'
import helpers from '../../utils/helpers'

/**
 *
 * Header
 *
 */
const Header = ({ children, ...rest }) => (
  <GrommetHeader background="light-2" pad="small" {...rest} style={{ width: '100vw' }}>
    <Box>
      <Anchor href="/" size="large">
        LiveRider
      </Anchor>
    </Box>
    {children}
  </GrommetHeader>
)

export default helpers.createWithDoc({
  envName: process.env.NODE_ENV,
  docFunction: doc,
  component: Header,
})
