import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'

export default class RequestRow extends Component {
  onApproveClick = async () => {
    const campaign = Campaign(this.props.address)
    const accounts = await web3.eth.getAccounts()
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    })
  }

  onFinalizeClick = async () => {
    const campaign = Campaign(this.props.address)
    const accounts = await web3.eth.getAccounts()
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0]
    })
  }

  render() {
    const { Row, Cell } = Table
    const { approversCount, id, request } = this.props
    const readyToFinalize = request.approvalCount > approversCount / 2

    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.receipient}</Cell>
        <Cell>
          {request.approvalCount}/{this.props.approversCount}
        </Cell>
        <Cell>
          {!request.complete && (
            <Button color="green" basic onClick={this.onApproveClick}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {!request.complete && (
            <Button color="teal" basic onClick={this.onFinalizeClick}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    )
  }
}
