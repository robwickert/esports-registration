-- =============================================================================
-- Esports Registration Platform - Sample Data
-- Run this AFTER schema.sql
-- =============================================================================

-- Insert championship
insert into championships (name, year, slug, is_active)
values ('FIA Motorsport Games', 2026, 'fia-motorsport-games-2026', true)
on conflict (slug) do nothing;

-- =============================================================================
-- Sample leaderboard data for FIA Motorsport Games 2026
-- =============================================================================

-- F4 Category
insert into leaderboard_entries
  (championship_id, category, position, full_name, country, car, time_display, time_ms)
select
  c.id,
  'F4',
  entry.position,
  entry.full_name,
  entry.country,
  entry.car,
  entry.time_display,
  entry.time_ms
from championships c
cross join (values
  (1, 'Marco Rossi',        'ITA', 'Tatuus F4-T421', '1:23.456', 83456),
  (2, 'Lucas Weber',        'DEU', 'Tatuus F4-T421', '1:23.789', 83789),
  (3, 'Sophie Laurent',     'FRA', 'Tatuus F4-T421', '1:24.012', 84012),
  (4, 'Carlos Mendez',      'ESP', 'Tatuus F4-T421', '1:24.301', 84301),
  (5, 'Emma Johansson',     'SWE', 'Tatuus F4-T421', '1:24.567', 84567),
  (6, 'James Whitfield',    'GBR', 'Tatuus F4-T421', '1:24.789', 84789),
  (7, 'Riku Mäkinen',       'FIN', 'Tatuus F4-T421', '1:25.123', 85123),
  (8, 'Ana Petrova',        'BGR', 'Tatuus F4-T421', '1:25.456', 85456),
  (9, 'Tomáš Novák',        'CZE', 'Tatuus F4-T421', '1:25.789', 85789),
  (10,'Leila Benali',       'MAR', 'Tatuus F4-T421', '1:26.012', 86012)
) as entry(position, full_name, country, car, time_display, time_ms)
where c.slug = 'fia-motorsport-games-2026'
on conflict do nothing;

-- GT Category
insert into leaderboard_entries
  (championship_id, category, position, full_name, country, car, time_display, time_ms)
select
  c.id,
  'GT',
  entry.position,
  entry.full_name,
  entry.country,
  entry.car,
  entry.time_display,
  entry.time_ms
from championships c
cross join (values
  (1, 'Alexander König',    'DEU', 'Ferrari 296 GT3',       '1:45.123', 105123),
  (2, 'Valentina Greco',    'ITA', 'Lamborghini Huracán GT3','1:45.456', 105456),
  (3, 'Pierre Dubois',      'FRA', 'Porsche 911 GT3 R',     '1:45.789', 105789),
  (4, 'Oliver Hartley',     'GBR', 'Aston Martin Vantage',  '1:46.012', 106012),
  (5, 'Isabella Fernández', 'ESP', 'McLaren 720S GT3',      '1:46.345', 106345),
  (6, 'Erik Lindqvist',     'SWE', 'BMW M4 GT3',            '1:46.678', 106678),
  (7, 'Nadia Kowalski',     'POL', 'Audi R8 LMS GT3',       '1:47.001', 107001),
  (8, 'Dimitri Papadakis',  'GRC', 'Mercedes AMG GT3',      '1:47.234', 107234),
  (9, 'Youssef Amrani',     'MAR', 'Ferrari 296 GT3',       '1:47.567', 107567),
  (10,'Hana Dvořák',        'CZE', 'Porsche 911 GT3 R',     '1:47.890', 107890)
) as entry(position, full_name, country, car, time_display, time_ms)
where c.slug = 'fia-motorsport-games-2026'
on conflict do nothing;
