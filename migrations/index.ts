import * as migration_20260721_131208_initial from './20260721_131208_initial';

export const migrations = [
  {
    up: migration_20260721_131208_initial.up,
    down: migration_20260721_131208_initial.down,
    name: '20260721_131208_initial'
  },
];
