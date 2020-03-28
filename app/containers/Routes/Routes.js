/* @flow */

import React from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

// Containers
import { NotFoundPage } from 'containers/NotFoundPage'
import { UploadPresentation } from 'containers/UploadPresentation'

// Styles
import GlobalStyle from '../../global-styles'

const Container = styled.div`
  margin: 0 auto 30px auto;
  min-height: 100%;
  padding: 0 16px;
`
/**
 *
 * Routes
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
export default function Routes() {
  return (
    <>
      <Helmet
        titleTemplate="%s - PyCon Presentation Upload"
        defaultTitle="PyCon Presentation Upload"
      >
        <meta name="description" content="A PyCon Presentation Upload application" />
      </Helmet>

      <Container>
        <Switch>
          <Route exact path="/" component={UploadPresentation} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </Container>

      <GlobalStyle />
    </>
  )
}
