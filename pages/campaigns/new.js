import React, { Component } from 'react'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'

export default class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  }

  onSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true, errorMessage: '' })

    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        })

      Router.pushRoute('/')
    } catch (error) {
      this.setState({ errorMessage: error.message })
    }

    this.setState({ loading: false })
  }

  render() {
    const { errorMessage, loading, minimumContribution } = this.state
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              placeholder="Amount"
              value={minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={errorMessage} />
          <Button loading={loading} type="submit" primary>
            Create
          </Button>
        </Form>
      </Layout>
    )
  }
}
