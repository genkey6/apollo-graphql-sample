const { readFileSync } = require('fs')
const { ApolloServer } = require('apollo-server')

var typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8')

var photos = []

const resolvers = {
  Query: {
    totalPhotos: () => photos.length
  },

  Mutation: {
    // 第1引数は親オブジェクトへの参照
    postPhoto(parent, args) {
      photos.push(args)
      return true
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen()
  .then(({url}) => console.log(`GraphQL Service running on ${url}`))
