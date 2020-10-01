import { extendType } from '@nexus/schema'

export const post = extendType({
  type: 'Query',
  definition(t) {
    t.crud.posts({ filtering: true, ordering: true, pagination: true })
    t.crud.post()
  },
})
