import * as Models from './models'
import * as Queries from './Queries'
import * as Mutations from './Mutations'
import * as Subscriptions from './Subscriptions'

export const resolvers = {
  ...Models,
  ...Queries,
  ...Mutations,
  ...Subscriptions,
}
