import { objectType } from '@nexus/schema'

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.published()
    t.model.title()
    t.model.content()
    t.model.author()
  },
})

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.createdAt()
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.posts({ pagination: true })
  },
})

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('accessToken')
    t.field('user', { type: 'User' })
  },
})

export default {
  User,
  Post,
  AuthPayload,
}
