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
    context: ({ req }) => {
        const token = req.headers['authorization'] || '';
        console.log('Token recibido:', token); // Agrega este log para depurar
    
        if (token) {
            try {
                const usuario = jwt.verify(token.replace('Bearer ', '').trim(), process.env.SECRETA);
                console.log('Usuario verificado:', usuario); // Agrega este log para confirmar la verificación
                return { usuario };
            } catch (error) {
                console.error('Error al verificar el token:', error.message); // Log del error
            }
        } else {
            console.log('No se proporcionó un token');
        }
        return {};
    }
    
})





//EL PROCESS.ENV.PORT ES PARA HEROKU
server.listen({port: process.env.PORT || 4000}).then(({url})=>{
    console.log(`Servidor listo en la url ${url}`)
})