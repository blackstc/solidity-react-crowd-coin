import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x744558D0862b32F825A9Aa34fc0d68d3114516dE'
)

export default instance
