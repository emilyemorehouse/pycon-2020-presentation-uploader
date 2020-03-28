import React from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

// Components
import { HomePage } from 'containers/HomePage'
import { NotFoundPage } from 'containers/NotFoundPage'

// Styles
import GlobalStyle from '../../global-styles'

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - PyCon Presentation Upload"
        defaultTitle="PyCon Presentation Upload"
      >
        <meta name="description" content="A PyCon Presentation Upload application" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>

      <GlobalStyle />
    </AppWrapper>
  )
}
