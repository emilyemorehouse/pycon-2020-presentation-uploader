/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { User } from 'grommet-icons'

// Components
import { Header as GrommetHeader } from 'grommet'
import { Anchor } from '../Anchor'
import { Box } from '../Box'
import { Menu } from '../Menu'

// Helpers
import { doc } from './Header.doc'
import { createWithDoc } from '../../utils/helpers'

// Stores
import { RootStoreContext } from '../../stores/RootStore'

/**
 *
 * Header
 *
 */
const Header = observer(({ ...rest }) => {
  const { clearStore, user } = useContext(RootStoreContext)

  return (
    <GrommetHeader background="light-2" pad="small" {...rest} style={{ width: '100vw' }}>
      <Box>
        <Anchor href="/" size="large">
          LiveRider
        </Anchor>
      </Box>

      {user.isAuthenticated && (
        <Menu
          dropProps={{ align: { top: 'bottom', left: 'left' } }}
          label={
            <Box pad="8px" background="brand" round>
              <User size="16px" />
            </Box>
          }
          items={[
            { label: 'Settings', onClick: () => {} },
            {
              label: 'Logout',
              onClick: () => {
                clearStore()
              },
            },
          ]}
        />
      )}
    </GrommetHeader>
  )
})
export default createWithDoc({
  envName: process.env.NODE_ENV,
  docFunction: doc,
  component: Header,
})
