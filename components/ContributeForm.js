import React, { Component } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign'
import { Router } from '../routes'

export default class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false
  }

  onSubmit = async (e) => {
    e.preventDefault()
    this.setState({ loading: true, errorMessage: '' })

    const campaign = Campaign(this.props.address)

    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      })

      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (error) {
      this.setState({ errorMessage: error.message })
    }

    this.setState({ loading: false, value: '' })
  }

  render() {
    const { errorMessage, loading, value } = this.state
    return (
      <Form onSubmit={this.onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            placeholder="Amount"
            value={value}
            onChange={(event) => this.setState({ value: event.target.value })}
          />
        </Form.Field>

        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} type="submit" primary>
          Contribute
        </Button>
      </Form>
    )
  }
}
