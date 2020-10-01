import { MigrationBuilder } from 'node-pg-migrate'
import { updated_at_trigger, get_trigger_name, tables } from '../config'

export function up(pgm: MigrationBuilder) {
  pgm.createTable(tables.post, {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    title: {
      type: 'text',
      notNull: true,
    },
    content: {
      type: 'text',
      unique: true,
    },
    published: {
      type: 'boolean',
      default: false,
    },
    user_id: {
      type: 'integer',
      references: `"${tables.user}" (id)`,
      onDelete: 'SET NULL',
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
  updated_at_trigger(pgm, tables.post)
}

export function down(pgm: MigrationBuilder) {
  pgm.dropTrigger(tables.post, get_trigger_name(tables.post))
  pgm.dropTable(tables.post)
}
