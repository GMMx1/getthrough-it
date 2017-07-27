import db from '../models'

export const connectPeer = (id) => {
  const lobbyId = id.slice(-9)
  const userId = id.slice(0, id.length - 9)

  module.exports.findPeerID(id, lobbyId, null)
  .then((peerData) => {
    if (peerData === 1) {
      db['Lobby']
        .update({
          peerId1: userId
        }, {
          where: {
            url: lobbyId,
            peerId1: null
          }
        })
    } else if (peerData === 2) {
      db['Lobby']
        .update({
          peerId2: userId
        }, {
          where: {
            url: lobbyId,
            peerId2: null
          }
        })
    } else {
      console.log("this is a full lobby")
    }
  })
}

export const disconnectPeer = (id) => {
  const lobbyId = id.slice(-9)
  const userId = id.slice(0, id.length - 9)

  module.exports.findPeerID(id, lobbyId, userId)
  .then((peerData) => {
    if (peerData === 1) {
      db['Lobby']
        .update({
          peerId1: null
        }, {
          where: {
            url: lobbyId,
            peerId1: userId
          }
        })
    } else if (peerData === 2) {
      db['Lobby']
        .update({
          peerId2: null
        }, {
          where: {
            url: lobbyId,
            peerId2: userId
          }
        })
    } else {
      console.log("ERROR: FIX THIS: A user disconnected that was not in database lobby, every connected user should be either peerid1 or peerid2")
    }
  })
}

export const findPeerID = (id, lobbyId, peerId) => {

  return db['Lobby']
    .findOne({
      where: {
        url: lobbyId,
        peerId1: peerId
      }
    })
    .then((item) => {
      if (item) {
        return 1
      } else {
        return db['Lobby']
        .findOne({
          where: {
            url: lobbyId,
            peerId2: peerId
          }
        })
        .then((item) => {
          if (item) {
            return 2
          } else {
            return 0
          }
        })
      }
    })
}
