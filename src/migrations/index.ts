import * as migration_20251230_170515 from './20251230_170515';
import * as migration_20260101_135824 from './20260101_135824';
import * as migration_20260101_141652 from './20260101_141652';
import * as migration_20260101_143801 from './20260101_143801';

export const migrations = [
  {
    up: migration_20251230_170515.up,
    down: migration_20251230_170515.down,
    name: '20251230_170515',
  },
  {
    up: migration_20260101_135824.up,
    down: migration_20260101_135824.down,
    name: '20260101_135824',
  },
  {
    up: migration_20260101_141652.up,
    down: migration_20260101_141652.down,
    name: '20260101_141652',
  },
  {
    up: migration_20260101_143801.up,
    down: migration_20260101_143801.down,
    name: '20260101_143801'
  },
];
