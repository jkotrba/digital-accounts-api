import './env'
import Hapi from 'hapi'
import Relish from 'relish'
import ConfigurePlugins from './config/plugins'
import routes from './routes'

const relish = Relish()

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3400

export default async() => {
  const options = {
    router: {
      isCaseSensitive: false,
    },
    routes: {
      cors: true,
      validate: {
        failAction: relish.failAction,
        options: {
          abortEarly: false
        }
      }
    }
  }

  if(env !== 'testing') {
    options.port = port
  }

  const server = new Hapi.Server(options)

  await ConfigurePlugins(server)
  server.route(routes)
  await server.initialize()

  return server
}
