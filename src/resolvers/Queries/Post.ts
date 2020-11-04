import { extendType } from '@nexus/schema'

const postQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.posts({ filtering: true, ordering: true, pagination: true })
    t.crud.post()
  },
})

export default { postQuery }
