import { createServer } from './server'

const PORT = process.env.PORT || 4002

;(async () => {
  const server = await createServer()
  server.listen({ port: PORT }).then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`)
    console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`)
  })
})()
