import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x19CE2B0CD73034Ce7a2C27603BCC47422Aa0bEc9'
)

export default instance
