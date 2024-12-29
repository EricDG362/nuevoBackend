const { ApolloServer, gql } = require('apollo-server')



const typeDefs = gql`



  # Definición de consultas disponibles.Es como un select para obtener datos
  type Query {
    obtenerProcedimientos : [Procedimiento]
  }



  #define la forma de los datos
  type Procedimiento{
  sumario: String
  proce: String
  id: ID
  }

  type ProcedimientoEliminado {
  id: ID!
  sumario: String
  proce: String
  mensaje: String
}

  #exclamacion para q sean campos obligatorios

  input UsuarioInput {
  nombre: String!
  apellido: String!
  email: String!
  password: String!
  }

  input AutenticarInput {
    email: String!
  password: String!
  
  }

  type Token{
  token: String
  }

  input ProcedimientoInput{
sumario: String!
proce: String!
  }






  type Mutation {

  #este mutation va a lllamr la funcion crearUsuario de resolvers va  tomar el input de arriba y devuelve un string
  crearUsuario (input: UsuarioInput ): String

  autenticarUsuario(input: AutenticarInput): Token

  nuevoProcedimiento(input:ProcedimientoInput): Procedimiento

  actualizarProcedimiento(id: ID!, input:ProcedimientoInput): Procedimiento
  
  eliminarProcedimiento (id: ID!) : ProcedimientoEliminado
  }

  

`

module.exports = typeDefs