import React from 'react'
import { Header } from 'grommet' /** @todo replace with wrapper component */
import { observer } from 'mobx-react'

// Components
import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { Grid } from 'components/Grid'
import { Heading } from 'components/Heading'
import { Text } from 'components/Text'

// Helpers
import { GRID_COLUMNS, GRID_ROWS, GRID_AREAS } from './Dashboard.constants'

/**
 *
 * Dashboard
 *
 */
const Dashboard = observer(() => (
  <>
    <Heading level="2" pad="small">
      Dashboard
    </Heading>

    <Grid
      areas={GRID_AREAS}
      columns={GRID_COLUMNS}
      fill="vertical"
      gap="small"
      pad="small"
      justifyContent="center"
      rows={GRID_ROWS}
    >
      <Box gridArea="shows">
        <Heading margin="small" level={4}>
          Shows
        </Heading>

        <Header background="light-5" pad="medium">
          <Text>Sort</Text>
          <Button primary label="Add New"></Button>
        </Header>

        <Box fill border={{ color: 'light-5', size: 'thin' }}></Box>
      </Box>

      <Box gridArea="todos">
        <Heading margin="small" level={4}>
          To Dos
        </Heading>

        <Header background="light-5" pad="medium">
          <Text>Sort</Text>
          <Button primary label="Add New"></Button>
        </Header>

        <Box fill border={{ color: 'light-5', size: 'thin' }}></Box>
      </Box>

      <Box gridArea="artist-venues">
        <Heading margin="small" level={4}>
          Artists & Venues
        </Heading>

        <Header background="light-5" pad="medium">
          <Text>Sort</Text>
          <Button primary label="Add New"></Button>
        </Header>

        <Box fill border={{ color: 'light-5', size: 'thin' }}></Box>
      </Box>
    </Grid>
  </>
))

export default Dashboard
