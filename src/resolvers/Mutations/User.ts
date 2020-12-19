import { stringArg, extendType, nullable, nonNull } from 'nexus'
import { compare, hash } from 'bcrypt'
import { generateAccessToken, handleError } from '../../utils/helpers'
import { errors } from '../../utils/constants'

const userMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: nullable(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, { name, email, password }, ctx) {
        try {
          const hashedPassword = await hash(password, 10)
          const user = await ctx.prisma.user.create({
            data: {
              name,
              email,
              password: hashedPassword,
            },
          })

          const accessToken = generateAccessToken(user.id)
          return {
            accessToken,
            user,
          }
        } catch (e) {
          handleError(errors.userAlreadyExists)
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, { email, password }, ctx) {
        let user = null
        try {
          user = await ctx.prisma.user.findUnique({
            where: {
              email,
            },
          })
        } catch (e) {
          handleError(errors.invalidUser)
        }

        if (!user) handleError(errors.invalidUser)

        const passwordValid = await compare(password, user.password)
        if (!passwordValid) handleError(errors.invalidUser)

        const accessToken = generateAccessToken(user.id)
        return {
          accessToken,
          user,
        }
      },
    })
  },
})

export default { userMutation }
