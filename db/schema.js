const { ApolloServer, gql } = require('apollo-server');


const typeDefs = gql`
  scalar Date

  # Definición de consultas disponibles.Es como un select para obtener datos
  type Query {
    obtenerProcedimientos: [Procedimiento]
  }

  # Define la forma de los datos
  type Procedimiento {
    sumario: String
    proce: String
    fecha: Date
    id: ID
  }

  type ProcedimientoEliminado {
    id: ID!
    sumario: String
    proce: String
    mensaje: String
  }

  type Usuario {
  id: ID!
  nombre: String!
  apellido: String!
  telefono: String!
  email: String!
  estado: Boolean!  # Agregado para verificar el estado del usuario
}
  type Autenticacion {
  token: String
  estado: Boolean
}

  # Exclamación para que sean campos obligatorios
  input UsuarioInput {
    nombre: String!
    apellido: String!
    telefono: String!
    email: String!
    password: String!
    
  }

  input AutenticarInput {
    email: String!
    password: String!

  }

  type Token {
    token: String
  }

  input ProcedimientoInput {
    sumario: String!
    proce: String!
    fecha: Date!
  }

  type Mutation {
    crearUsuario(input: UsuarioInput): String
    autenticarUsuario(input: AutenticarInput): Autenticacion
    nuevoProcedimiento(input: ProcedimientoInput): Procedimiento
    actualizarProcedimiento(id: ID!, input: ProcedimientoInput): Procedimiento
    eliminarProcedimiento(id: ID!): ProcedimientoEliminado
  }
`;

module.exports = typeDefs