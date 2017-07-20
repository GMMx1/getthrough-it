import db from '../models'

export const connectPeer = (id) => {
  const lobbyId = id.slice(-9)
  const userId = id.slice(0, id.length - 9)

  db['Lobby']
    .update({
      peerId: userId
    }, {
      where: {
        url: lobbyId,
        peerId: null
      }
    })
}

export const disconnectPeer = (id) => {
  const lobbyId = id.slice(-9)
  const userId = id.slice(0, id.length - 9)

  db['Lobby']
    .update({
      peerId: null
    }, {
      where: {
        url: lobbyId,
        peerId: userId
      }
    })
}