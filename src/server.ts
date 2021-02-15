import { config } from 'dotenv'
config()

import { ApolloServer } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'
import { permissions } from './utils/rules'
import { createSchema } from './schema'
import { isDev } from './utils/constants'
import { createContext } from './utils/helpers'

export const createServer = () => {
  return new ApolloServer({
    schema: applyMiddleware(createSchema(), permissions),
    context: createContext,
    playground: true,
    tracing: isDev(),
    introspection: true,
    debug: isDev(),
    cors: true,
  })
}
