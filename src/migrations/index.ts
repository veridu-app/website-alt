import * as migration_20251230_170515 from './20251230_170515';

export const migrations = [
  {
    up: migration_20251230_170515.up,
    down: migration_20251230_170515.down,
    name: '20251230_170515'
  },
];
