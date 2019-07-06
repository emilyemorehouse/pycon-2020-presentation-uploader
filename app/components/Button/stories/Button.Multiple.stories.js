import React from 'react'
import { storiesOf } from '@storybook/react'
import { grommet } from 'grommet/themes'
import { Add } from 'grommet-icons'

import { Container } from '../../Container'
import { Box } from '../../Box'
import Button from '../Button'

const MultipleButton = () => (
  <Container theme={grommet}>
    <Box align="center" pad="large">
      <Box direction="row" align="center" gap="small" pad="xsmall">
        <Button title="Cancel" onClick={() => {}} />
        <Button
          color="dark-1"
          primary
          icon={<Add color="accent-1" />}
          title="Add"
          onClick={() => {}}
        />
      </Box>
      <Box direction="row" align="center" gap="small" pad="xsmall">
        <Button title="Cancel" onClick={() => {}} />
        <Button color="dark-1" primary icon={<Add />} title="Add" onClick={() => {}} />
      </Box>
      <Box direction="row" align="center" gap="small" pad="xsmall">
        <Button title="Cancel" onClick={() => {}} />
        <Button primary icon={<Add />} title="Add" onClick={() => {}} />
      </Box>
      <Box direction="row" align="center" gap="small" pad="xsmall">
        <Button title="Cancel" onClick={() => {}} />
        <Button color="light-2" primary icon={<Add />} title="Add" onClick={() => {}} />
      </Box>
    </Box>
  </Container>
)

storiesOf('Button', module).add('Multiple', () => <MultipleButton />)
