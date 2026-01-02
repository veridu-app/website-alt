import * as migration_20251230_170515 from './20251230_170515';
import * as migration_20260101_135824 from './20260101_135824';
import * as migration_20260101_141652 from './20260101_141652';
import * as migration_20260101_143801 from './20260101_143801';
import * as migration_20260101_153827 from './20260101_153827';
import * as migration_20260101_154348 from './20260101_154348';
import * as migration_20260101_173226 from './20260101_173226';
import * as migration_20260102_074506 from './20260102_074506';
import * as migration_20260102_091651 from './20260102_091651';
import * as migration_20260102_100452 from './20260102_100452';

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
    name: '20260101_143801',
  },
  {
    up: migration_20260101_153827.up,
    down: migration_20260101_153827.down,
    name: '20260101_153827',
  },
  {
    up: migration_20260101_154348.up,
    down: migration_20260101_154348.down,
    name: '20260101_154348',
  },
  {
    up: migration_20260101_173226.up,
    down: migration_20260101_173226.down,
    name: '20260101_173226',
  },
  {
    up: migration_20260102_074506.up,
    down: migration_20260102_074506.down,
    name: '20260102_074506',
  },
  {
    up: migration_20260102_091651.up,
    down: migration_20260102_091651.down,
    name: '20260102_091651',
  },
  {
    up: migration_20260102_100452.up,
    down: migration_20260102_100452.down,
    name: '20260102_100452'
  },
];
