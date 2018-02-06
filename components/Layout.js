import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Head from 'next/head'
import Header from './Header'

export default class Layout extends Component {
  render() {
    return (
      <Container>
        <Head>
          <title>Crowd Coin</title>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          />
        </Head>
        <Header />
        {this.props.children}
        <h2>footer</h2>
      </Container>
    )
  }
}
