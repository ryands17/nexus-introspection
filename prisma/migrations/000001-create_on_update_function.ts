import { MigrationBuilder } from 'node-pg-migrate'

export function up(pgm: MigrationBuilder) {
  pgm.createFunction(
    'update_modified_column',
    [],
    {
      returns: 'trigger',
      language: 'plpgsql',
    },
    `
    begin
      NEW.updated_at = now();
      return NEW;
    end;
  `
  )
}

export function down(pgm: MigrationBuilder) {
  pgm.dropFunction('update_modified_column', [])
}
