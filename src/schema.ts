import path from 'path'
import util from 'util'
import globSync from 'glob'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import { makeSchema } from 'nexus'
import { join } from 'path'
import { Context } from './types'

const glob = util.promisify(globSync)

const nexusPrisma = nexusSchemaPrisma({
  experimentalCRUD: true,
  paginationStrategy: 'prisma',
  prismaClient: (ctx: Context) => ctx.prisma,
})

export const createSchema = async () => {
  const allTypes = await getResolvers()
  return makeSchema({
    types: [allTypes],
    plugins: [nexusPrisma],
    outputs: {
      typegen: join(__dirname, 'generated', 'index.d.ts'),
      schema: join(__dirname, 'generated', 'schema.graphql'),
    },
    contextType: {
      module: join(__dirname, 'types.ts'),
      export: 'Context',
      alias: 'ctx',
    },
    sourceTypes: {
      modules: [
        {
          module: require.resolve('.prisma/client/index.d.ts'),
          alias: 'prisma',
        },
      ],
    },
    prettierConfig: join(process.cwd(), 'package.json'),
  })
}

const getResolvers = async () => {
  const folder = './resolvers'
  const files = await glob('**/*.{js,ts}', {
    cwd: path.join(__dirname, folder),
  })

  const types = {}
  await Promise.all(
    files.map(async (file) => {
      const { default: resolver } = await import(`${folder}/${file}`)
      Object.assign(types, resolver)
      return true
    })
  )

  return types
}
