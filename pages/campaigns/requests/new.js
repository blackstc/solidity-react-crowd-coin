import React, { Component } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import { Link, Router } from '../../../routes'
import Layout from '../../../components/Layout'

export default class RequestsNew extends Component {
  state = {
    description: '',
    receipient: '',
    value: '',
    errorMessage: '',
    loading: false
  }

  static async getInitialProps(props) {
    return { address: props.query.address }
  }

  onSubmit = async (e) => {
    e.preventDefault()

    this.setState({ errorMessage: '', loading: true })

    const campaign = Campaign(this.props.address)
    const { description, receipient, value } = this.state

    try {
      const accounts = await web3.eth.getAccounts()
      const wei = web3.utils.toWei(value, 'ether')

      await campaign.methods.createRequest(description, wei, receipient).send({
        from: accounts[0]
      })

      Router.pushRoute(`/campaigns/${this.props.address}/requests`)
    } catch (error) {
      this.setState({ errorMessage: error.message })
    }

    this.setState({ loading: false })
  }

  render() {
    const { description, errorMessage, loading, receipient, value } = this.state
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Receipient</label>
            <Input
              value={receipient}
              onChange={(e) => this.setState({ receipient: e.target.value })}
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
