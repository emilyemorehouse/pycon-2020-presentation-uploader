/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Box, Grommet } from 'grommet'

import { Select } from '..'
import README from '../README.md'

storiesOf('Select', module)
  .addParameters({
    readme: {
      sidebar: README,
    },
  })
  .add('Simple', () => <SimpleSelect />)

const SimpleSelect = ({ ...rest }) => {
  const [value, setValue] = useState('')

  const options = ['one', 'two', 'three']
  return (
    <Grommet full>
      <Box fill align="center" justify="start" pad="large">
        <Select
          id="select"
          name="select"
          placeholder="Select"
          value={value}
          options={options}
          onChange={({ option }) => setValue(option)}
          {...rest}
        />
      </Box>
    </Grommet>
  )
}
