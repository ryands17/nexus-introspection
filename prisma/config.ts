import { MigrationBuilder } from 'node-pg-migrate'

export function get_trigger_name(table: string) {
  return `update_${table}_updated_at`
}

export function updated_at_trigger(pgm: MigrationBuilder, table: string) {
  pgm.createTrigger(table, get_trigger_name(table), {
    when: 'BEFORE',
    operation: 'update',
    level: 'ROW',
    function: 'update_modified_column',
  })
}

export const tables = {
  user: 'user',
  post: 'post',
}
