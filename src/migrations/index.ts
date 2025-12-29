import * as migration_20251219_215102_initial from './20251219_215102_initial'
import * as migration_20251229_081901 from './20251229_081901'
import * as migration_20251229_094859 from './20251229_094859'
import * as migration_20251229_130028 from './20251229_130028'
import * as migration_20251229_130729 from './20251229_130729'
import * as migration_20251229_152758 from './20251229_152758'
import * as migration_20251229_162754_info_cards from './20251229_162754_info_cards'

export const migrations = [
  {
    up: migration_20251219_215102_initial.up,
    down: migration_20251219_215102_initial.down,
    name: '20251219_215102_initial',
  },
  {
    up: migration_20251229_081901.up,
    down: migration_20251229_081901.down,
    name: '20251229_081901',
  },
  {
    up: migration_20251229_094859.up,
    down: migration_20251229_094859.down,
    name: '20251229_094859',
  },
  {
    up: migration_20251229_130028.up,
    down: migration_20251229_130028.down,
    name: '20251229_130028',
  },
  {
    up: migration_20251229_130729.up,
    down: migration_20251229_130729.down,
    name: '20251229_130729',
  },
  {
    up: migration_20251229_152758.up,
    down: migration_20251229_152758.down,
    name: '20251229_152758',
  },
  {
    up: migration_20251229_162754_info_cards.up,
    down: migration_20251229_162754_info_cards.down,
    name: '20251229_162754_info_cards',
  },
]
