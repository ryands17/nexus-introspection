const util = require('util')
const NodeEnvironment = require('jest-environment-node')
const exec = util.promisify(require('child_process').exec)
const { PrismaClient } = require('@prisma/client')
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  names,
} = require('unique-names-generator')

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)

    // Generate a unique schema for this test context
    this.schema = uniqueNamesGenerator({
      dictionaries: [adjectives, names, colors],
    }).toLowerCase()
    this.client = new PrismaClient()
    process.env.DB_URL = `postgresql://postgres:password@localhost:5432/prisma2?schema=${this.schema}`
    this.global.process.env.DB_URL = `postgresql://postgres:password@localhost:5432/prisma2?schema=${this.schema}`
  }

  async setup() {
    await exec(`yarn db:migrate --schema ${this.schema}`)
    return super.setup()
  }

  async teardown() {
    await this.client.$executeRaw(
      `drop schema if exists "${this.schema}" cascade`
    )
    await this.client.$disconnect()
  }
}

module.exports = PrismaTestEnvironment
