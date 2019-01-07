let parser = {}

// Parse data on parts
try {
  parser.data = function (incomingData) {
    if (!incomingData.params) {
      throw new ReferenceError(`"incomingData" does not contain required data`)
    }
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
} catch (error) {
  console.log(error.message)
}

// Form payload data
parser.payload = function (name, channelId, token, avatar, guildId, id, content) {
  return {
    'name': name,
    'channel_id': channelId,
    'token': token,
    'avatar': avatar,
    'guild_id': guildId,
    'id': id,
    'content': content
  }
}

// Form embeds
parser.embeds = function (title, url, name) {
  return { 'embeds': [
    {
      'title': title,
      'url': url,
      'author': {
        'name': name
      }
    }
  ] }
}

module.exports = parser
