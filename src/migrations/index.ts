import * as migration_20251219_215102_initial from './20251219_215102_initial';
import * as migration_20251229_081901 from './20251229_081901';

export const migrations = [
  {
    up: migration_20251219_215102_initial.up,
    down: migration_20251219_215102_initial.down,
    name: '20251219_215102_initial',
  },
  {
    up: migration_20251229_081901.up,
    down: migration_20251229_081901.down,
    name: '20251229_081901'
  },
];
