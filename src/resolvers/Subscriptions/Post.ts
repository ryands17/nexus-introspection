import { subscriptionField } from '@nexus/schema'

const latestPost = subscriptionField('latestPost', {
  type: 'Post',
  subscribe(_root, _args, ctx) {
    return ctx.pubsub.asyncIterator('latestPost')
  },
  resolve(payload) {
    return payload
  },
})

export default { latestPost }
