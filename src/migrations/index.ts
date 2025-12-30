import * as migration_20251219_215102_initial from './20251219_215102_initial'
import * as migration_20251229_081901 from './20251229_081901'
import * as migration_20251229_094859 from './20251229_094859'
import * as migration_20251229_130028 from './20251229_130028'
import * as migration_20251229_130729 from './20251229_130729'
import * as migration_20251229_152758 from './20251229_152758'
import * as migration_20251229_162754_info_cards from './20251229_162754_info_cards'
import * as migration_20251229_172741_fix_background_color from './20251229_172741_fix_background_color'
import * as migration_20251230_115546_add_background_color_to_info_cards from './20251230_115546_add_background_color_to_info_cards'
import * as migration_20251230_122426_add_catch_info_and_footnotes_to_info_cards from './20251230_122426_add_catch_info_and_footnotes_to_info_cards'
import * as migration_20251230_133127_add_catch_info_position_and_banner_color from './20251230_133127_add_catch_info_position_and_banner_color'
import * as migration_20251230_145406_add_view_all_link_to_archive_block from './20251230_145406_add_view_all_link_to_archive_block'
import * as migration_20251230_180000_fix_footnotes_table_structure from './20251230_180000_fix_footnotes_table_structure'
import * as migration_20251230_151200_fix_archive_link_field_structure from './20251230_151200_fix_archive_link_field_structure'

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
  {
    up: migration_20251229_172741_fix_background_color.up,
    down: migration_20251229_172741_fix_background_color.down,
    name: '20251229_172741_fix_background_color',
  },
  {
    up: migration_20251230_115546_add_background_color_to_info_cards.up,
    down: migration_20251230_115546_add_background_color_to_info_cards.down,
    name: '20251230_115546_add_background_color_to_info_cards',
  },
  {
    up: migration_20251230_122426_add_catch_info_and_footnotes_to_info_cards.up,
    down: migration_20251230_122426_add_catch_info_and_footnotes_to_info_cards.down,
    name: '20251230_122426_add_catch_info_and_footnotes_to_info_cards',
  },
  {
    up: migration_20251230_133127_add_catch_info_position_and_banner_color.up,
    down: migration_20251230_133127_add_catch_info_position_and_banner_color.down,
    name: '20251230_133127_add_catch_info_position_and_banner_color',
  },
  {
    up: migration_20251230_145406_add_view_all_link_to_archive_block.up,
    down: migration_20251230_145406_add_view_all_link_to_archive_block.down,
    name: '20251230_145406_add_view_all_link_to_archive_block',
  },
  {
    up: migration_20251230_180000_fix_footnotes_table_structure.up,
    down: migration_20251230_180000_fix_footnotes_table_structure.down,
    name: '20251230_180000_fix_footnotes_table_structure',
  },
  {
    up: migration_20251230_151200_fix_archive_link_field_structure.up,
    down: migration_20251230_151200_fix_archive_link_field_structure.down,
    name: '20251230_151200_fix_archive_link_field_structure',
  },
]
