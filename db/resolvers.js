// Datos simulados
const Usuario = require('../models/Usuario') //nos traemos el modelo y lo guardamos en usuario
const Procedimiento = require('../models/Procedimientos') //nos traemos el modelo y lo guardamos en usuario
const bcrypt = require('bcryptjs') //iomportamos para hashear la contraseña
const jwt = require('jsonwebtoken') //importamos la libreria para crear token
const Procedimientos = require('../models/Procedimientos')
require('dotenv').config({ path:'variables.env'})  //firmamos el token con palabrasecreta de .env



const crearToken = (usuario, secreta,expiresIn) => {

  const {id, email, nombre} = usuario 

  return jwt.sign({id, email, nombre}, secreta, {expiresIn}) //con sign firmasmos el token y expireIn es la propiedad q busca
}







const resolvers = {

  //aca se obtienen datos
  Query: {
    
    //consulta para obtener los procedimientos
    obtenerProcedimientos: async (_, { }, context) => {
      const prcedimiento = await Procedimientos.find({creador: context.usuario.id})
        return prcedimiento
    }



  }, 



  Mutation: {
    crearUsuario: async (_, { input }, context) => { //el 1 es la ruta no se usa, el 2 esd el objeto del input q viene con todos los datos, el 3 es el context de graphql y el 4 es la info

      const { email, password } = input //aplicamos destructuring para evaluar

      const existeUsuario = await Usuario.findOne({ email }) //aca busca el primer registro q coincida

      //si existe
      if (existeUsuario) {
        throw new Error('El usuario  ya existe');

      }

      //si no existe o sea es nuevo
      try {

        //encriptar el password
        const salt = await bcrypt.genSalt(10) //generamos un salt
        input.password = await bcrypt.hash(password, salt) //hasheamos el password con la configuracion del salt


        const nuevoUsuario = new Usuario(input) //crea una niueva instancia con los datos del input y lo guarda en nuevoUsauario

        nuevoUsuario.save() //q guarde el usuario
        return 'Usuario creado correctamente'

      } catch (error) {
        console.log(error) //si hay algun problema de conexion

      }


    },



    autenticarUsuario: async (_, { input }, context) => {

      const { email, password } = input //aplicamos destructuring para evaluar

      //busacamos el usuario
      const existeUsuario = await Usuario.findOne({ email }) //aca busca el primer registro q coincida

      //si no existe
      if(!existeUsuario){
        throw new Error("El Usuario no existe");
        
      }

      //si el password es correcto
      const PassCorrecto = await bcrypt.compare (password, existeUsuario.password)//el 1 es el pass q se le passa x input y el 2 es el q esta en la base de datos ya guardado y hasheado

      if (!PassCorrecto){ // si da false xq es incorrecto
          throw new Error("Password incorrecto");
          
      }

      
      //dar acceso a l app
      return {
        token: crearToken(existeUsuario,process.env.SECRETA, '6hr') //tiempo de expiracion 2 horas
      }
    },


    nuevoProcedimiento: async (_, { input }, context) => {

      console.log('Input recibido:', input);
       try {
        //creamos una nueva instaancia
          const procedimieto = new Procedimiento (input) //le pasamos el input q viene coin toda la informacion

          //le asociamos el creador
          procedimieto.creador = context.usuario.id //este context id viene del resolver

          //lo guardamos
          const resultado = await procedimieto.save()

          //lo retornamos
          return resultado

        
       } catch (error) {
        console.log(error)
       }

    },

    actualizarProcedimiento: async (_, {id, input} , context) => {

      //si el proyecto existe
      let procedimieto = await Procedimiento.findById(id)

      //si el procedimiento no existe
      if(!procedimieto){
        throw new Error("Procedimiento no encontrado");
        
      }

      //la persona q lo quiere modificar es la misma q lo creo
        if(procedimieto.creador.toString() !== context.usuari.id){ //si la persona q lo creo es distinta al q lo quierre editar

          throw new Error("Usted no posee creedenciales para editar este documento");
          

        }
      //guardar proyecto
        procedimieto = await Procedimiento.findByIdAndUpdate({_id: id}, input, {new:true})
          return procedimieto
    },


    eliminarProcedimiento: async (_, {id} , context) => {


      //si el proyecto existe
      let procedimieto = await Procedimiento.findById(id)

      //si el procedimiento no existe
      if(!procedimieto){
        throw new Error("Procedimiento no encontrado");
        
      }

      //la persona q lo quiere modificar es la misma q lo creo
        if(procedimieto.creador.toString() !== context.usuari.id){ //si la persona q lo creo es distinta al q lo quierre editar

          throw new Error("Usted no posee creedenciales para editar este documento");
          

        }

        //eliminar

        await Procedimiento.findOneAndDelete({_id : id})

        return 'Procedimiento Eliminado con Exito'

    },





  }
};

module.exports = resolvers;
