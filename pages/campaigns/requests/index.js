import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'
import { Link } from '../../../routes'
import Layout from '../../../components/Layout'
import Campaign from '../../../ethereum/campaign'
import RequestRow from '../../../components/RequestRow'

export default class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query
    const campaign = Campaign(address)
    const requestCount = await campaign.methods.getRequestsCount().call()
    const approversCount = await campaign.methods.approversCount().call()

    const requests = await Promise.all(
      [...Array(+requestCount)].map((element, i) => {
        return campaign.methods.requests(i).call()
      })
    )

    return { address, approversCount, requests, requestCount }
  }

  renderRow() {
    return this.props.requests.map((request, i) => {
      return (
        <RequestRow
          key={i}
          id={i}
          request={request}
          approversCount={this.props.approversCount}
          address={this.props.address}
        />
      )
    })
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table

    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              Add Requests
            </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Receipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>
        <div>Found {this.props.requestCount} Requests</div>
      </Layout>
    )
  }
}
