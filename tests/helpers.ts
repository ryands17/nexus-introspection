import { ApolloServer } from 'apollo-server'
import { createServer } from '../src/server'
import { prisma } from '../src/utils/helpers'
import { Headers } from 'cross-fetch'

// @ts-ignore
global.Headers = global.Headers || Headers

type Config = { url: string }

export const getConfig = () => {
  let config: any = {}
  let server: ApolloServer

  beforeAll(async (done) => {
    server = createServer()
    const { url } = await server.listen({ port: 0 })
    config.url = url
    done()
  })

  afterAll(async (done) => {
    await server.stop()
    await prisma.$disconnect()
    done()
  })

  return config as Config
}
