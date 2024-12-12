const {ApolloServer} = require('apollo-server')

const typeDefs = require('./db/schema')
const resolvers = require ('./db/resolvers')

const conectarDB = require('./config/db')


//mandamos allamar a la funcion en este caso q se conecte a la db
conectarDB ()

//aca se los pasamos
const server = new ApolloServer ({typeDefs,resolvers})






server.listen().then(({url})=>{
    console.log(`Servidor listo en la url ${url}`)
})