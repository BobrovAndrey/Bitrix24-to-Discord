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
parser.payload = function (name, channelId, token, avatar, guildId, id, content) {
  return {
    'name': name, // 'Bitrix24 to Discord data courier',
    'channel_id': channelId, // '525295956720222238',
    'token': token, // 'Soicvoi3qNA7FS8XDQGB8xYi117rpm20hIqOleG0Bhn65HsZK2yLCGTf8utg3x3mErXM',
    'avatar': avatar, // 'http://www.ceo.ru/files/news/news_pics/410.png',
    'guild_id': guildId, // '525295956720222234',
    'id': id, // '525296886060679169',
    'content': content // `Lead with ID ${leadId} was created at your Bittrex24 ${bitrixDomain} account`
  }
}

parser.embeds = function (title, url, name) {
  return { 'embeds': [
    {
      'title': title, // `New lead was recently created #${leadId}`
      'url': url, // `https://${bitrixDomain}/crm/lead/details/${leadId}/`
      'author': {
        'name': name // bitrixDomain
      }
    }
  ] }
}

module.exports = parser
