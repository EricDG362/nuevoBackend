const {ApolloServer} = require('apollo-server')

const jwt =require('jsonwebtoken')
require('dotenv').config('variables.env')
const typeDefs = require('./db/schema')
const resolvers = require ('./db/resolvers')

const conectarDB = require('./config/db')



//mandamos allamar a la funcion en este caso q se conecte a la db
conectarDB ()

//aca se los pasamos
const server = new ApolloServer ({
    typeDefs,
    resolvers,
    context: ({req})=>{
        const token = req.headers['authorization'] || '' //si no existe token entonces es vacio

        if (token){

            try {
                //verificamos el usuariom con el token q tomamso y la firma de la palabra secreta
                const usuario = jwt.verify(token, process.env.SECRETA)

                return {
                    usuario
                }


            } catch (error) {
                console.log(error)
            }
        }
    }
})






server.listen().then(({url})=>{
    console.log(`Servidor listo en la url ${url}`)
})