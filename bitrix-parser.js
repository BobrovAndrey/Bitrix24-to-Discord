let parser = {}
parser.data = function (incomingData) {
  return {
    'leadId': incomingData.params['data[FIELDS][ID]'],
    'bitrixDomain': incomingData.params['auth[domain]'],
    'ts': incomingData.params.ts,
    'clientEndpoint': incomingData.params['auth[client_endpoint]'],
    'serverEndpoint': incomingData.params['auth[server_endpoint]'],
    'memberId': incomingData.params['auth[member_id]'],
    'applicationToken': incomingData.params['auth[application_token]']
  }
}

// Form payload data
parser.Payload = function (name, channelId, token, avatar, guildId, id, content) {
  name = name || null
  channelId = channelId || null
  token = token || null
  avatar = avatar || null
  guildId = guildId || null
  id = id || null
  content = content || null

  return {
    'name': `${name}`,
    'channel_id': `${channelId}`,
    'token': `${token}`,
    'avatar': `${avatar}`,
    'guild_id': `${guildId}`,
    'id': `${id}`,
    'content': `${content}`
  }
}

parser.Embads = function (title, url, name) {
  title = title || null
  url = url || null
  name = name || null
  return { 'embeds': [
    {
      'title': `${title}`, // `New lead was recently created #${leadId}`
      'url': `${url}`, // `https://${bitrixDomain}/crm/lead/details/${leadId}/`
      'author': {
        'name': `${name}` // bitrixDomain
      }
    }
  ] }
}

module.exports = parser

// {
//   'name': 'Bitrix24 to Discord data courier',
//   'channel_id': '525295956720222238',
//   'token': 'Soicvoi3qNA7FS8XDQGB8xYi117rpm20hIqOleG0Bhn65HsZK2yLCGTf8utg3x3mErXM',
//   'avatar': 'http://www.ceo.ru/files/news/news_pics/410.png',
//   'guild_id': '525295956720222234',
//   'id': '525296886060679169',
//   'content': `Lead with ID ${leadId} was created at your Bittrex24 ${bitrixDomain} account`
// }
