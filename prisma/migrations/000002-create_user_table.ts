import { MigrationBuilder } from 'node-pg-migrate'
import { updated_at_trigger, get_trigger_name, tables } from '../config'

export function up(pgm: MigrationBuilder) {
  pgm.createTable(tables.user, {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    name: {
      type: 'varchar',
      notNull: true,
    },
    email: {
      type: 'varchar',
      notNull: true,
      unique: true,
    },
    password: {
      type: 'text',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  })
  updated_at_trigger(pgm, tables.user)
}

export function down(pgm: MigrationBuilder) {
  pgm.dropTrigger(tables.user, get_trigger_name(tables.user))
  pgm.dropTable(tables.user)
}
