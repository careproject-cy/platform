import * as migration_20260721_131208_initial from './20260721_131208_initial';
import * as migration_20260721_183654_add_roles_and_unique_slugs from './20260721_183654_add_roles_and_unique_slugs';

export const migrations = [
  {
    up: migration_20260721_131208_initial.up,
    down: migration_20260721_131208_initial.down,
    name: '20260721_131208_initial',
  },
  {
    up: migration_20260721_183654_add_roles_and_unique_slugs.up,
    down: migration_20260721_183654_add_roles_and_unique_slugs.down,
    name: '20260721_183654_add_roles_and_unique_slugs'
  },
];
