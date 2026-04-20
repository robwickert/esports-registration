-- =============================================================================
-- Esports Registration Platform - Sample Data
-- Run this AFTER schema.sql
-- =============================================================================

-- Insert championship
insert into championships (name, year, slug, is_active)                                                                                                          
  values ('FIA Esports Global Rally Tour', 2026, 'fia-esports-global-rally-tour-2026', true);  
on conflict (slug) do nothing;

-- =============================================================================
-- Sample leaderboard data — 100 entries, 10 countries × 10 drivers each
-- Countries distributed round-robin across positions so each country has
-- exactly 10 entries (allowing a full top-10 when filtering by country).
-- =============================================================================

insert into leaderboard_entries
  (championship_id, position, full_name, country, car, time_display, time_ms)
select
  c.id,
  entry.position,
  entry.full_name,
  entry.country,
  entry.car,
  entry.time_display,
  entry.time_ms
from championships c
cross join (values
  -- pos  name                       country  car                 display      ms
  (  1, 'Marco Rossi',          'ITA', 'Tatuus F4-T421', '1:23.456',  83456),
  (  2, 'Lucas Weber',          'DEU', 'Tatuus F4-T421', '1:23.586',  83586),
  (  3, 'Sophie Laurent',       'FRA', 'Tatuus F4-T421', '1:23.716',  83716),
  (  4, 'Carlos Mendez',        'ESP', 'Tatuus F4-T421', '1:23.846',  83846),
  (  5, 'James Whitfield',      'GBR', 'Tatuus F4-T421', '1:23.976',  83976),
  (  6, 'Emma Johansson',       'SWE', 'Tatuus F4-T421', '1:24.106',  84106),
  (  7, 'Riku Mäkinen',         'FIN', 'Tatuus F4-T421', '1:24.236',  84236),
  (  8, 'Daan de Vries',        'NLD', 'Tatuus F4-T421', '1:24.366',  84366),
  (  9, 'Louis Dupont',         'BEL', 'Tatuus F4-T421', '1:24.496',  84496),
  ( 10, 'Nadia Kowalski',       'POL', 'Tatuus F4-T421', '1:24.626',  84626),
  ( 11, 'Luca Ferrari',         'ITA', 'Tatuus F4-T421', '1:24.756',  84756),
  ( 12, 'Felix Müller',         'DEU', 'Tatuus F4-T421', '1:24.886',  84886),
  ( 13, 'Pierre Dubois',        'FRA', 'Tatuus F4-T421', '1:25.016',  85016),
  ( 14, 'Alejandro García',     'ESP', 'Tatuus F4-T421', '1:25.146',  85146),
  ( 15, 'Oliver Hartley',       'GBR', 'Tatuus F4-T421', '1:25.276',  85276),
  ( 16, 'Erik Lindqvist',       'SWE', 'Tatuus F4-T421', '1:25.406',  85406),
  ( 17, 'Janne Virtanen',       'FIN', 'Tatuus F4-T421', '1:25.536',  85536),
  ( 18, 'Sem Bakker',           'NLD', 'Tatuus F4-T421', '1:25.666',  85666),
  ( 19, 'Nathan Claes',         'BEL', 'Tatuus F4-T421', '1:25.796',  85796),
  ( 20, 'Tomasz Nowak',         'POL', 'Tatuus F4-T421', '1:25.926',  85926),
  ( 21, 'Giovanni Esposito',    'ITA', 'Tatuus F4-T421', '1:26.056',  86056),
  ( 22, 'Jonas Schmitt',        'DEU', 'Tatuus F4-T421', '1:26.186',  86186),
  ( 23, 'Hugo Martin',          'FRA', 'Tatuus F4-T421', '1:26.316',  86316),
  ( 24, 'Pablo Martínez',       'ESP', 'Tatuus F4-T421', '1:26.446',  86446),
  ( 25, 'Harry Wilson',         'GBR', 'Tatuus F4-T421', '1:26.576',  86576),
  ( 26, 'Oskar Andersson',      'SWE', 'Tatuus F4-T421', '1:26.706',  86706),
  ( 27, 'Mikko Leinonen',       'FIN', 'Tatuus F4-T421', '1:26.836',  86836),
  ( 28, 'Noah Janssen',         'NLD', 'Tatuus F4-T421', '1:26.966',  86966),
  ( 29, 'Remi Willems',         'BEL', 'Tatuus F4-T421', '1:27.096',  87096),
  ( 30, 'Piotr Wiśniewski',     'POL', 'Tatuus F4-T421', '1:27.226',  87226),
  ( 31, 'Paolo Romano',         'ITA', 'Tatuus F4-T421', '1:27.356',  87356),
  ( 32, 'Maximilian Fischer',   'DEU', 'Tatuus F4-T421', '1:27.486',  87486),
  ( 33, 'Emma Bernard',         'FRA', 'Tatuus F4-T421', '1:27.616',  87616),
  ( 34, 'Diego López',          'ESP', 'Tatuus F4-T421', '1:27.746',  87746),
  ( 35, 'George Taylor',        'GBR', 'Tatuus F4-T421', '1:27.876',  87876),
  ( 36, 'Maja Karlsson',        'SWE', 'Tatuus F4-T421', '1:28.006',  88006),
  ( 37, 'Eetu Korhonen',        'FIN', 'Tatuus F4-T421', '1:28.136',  88136),
  ( 38, 'Finn Peters',          'NLD', 'Tatuus F4-T421', '1:28.266',  88266),
  ( 39, 'Axel Lecomte',         'BEL', 'Tatuus F4-T421', '1:28.396',  88396),
  ( 40, 'Marek Kowalczyk',      'POL', 'Tatuus F4-T421', '1:28.526',  88526),
  ( 41, 'Antonio Colombo',      'ITA', 'Tatuus F4-T421', '1:28.656',  88656),
  ( 42, 'Tobias Schneider',     'DEU', 'Tatuus F4-T421', '1:28.786',  88786),
  ( 43, 'Louis Thomas',         'FRA', 'Tatuus F4-T421', '1:28.916',  88916),
  ( 44, 'Adrián Sánchez',       'ESP', 'Tatuus F4-T421', '1:29.046',  89046),
  ( 45, 'Jack Brown',           'GBR', 'Tatuus F4-T421', '1:29.176',  89176),
  ( 46, 'Linus Nilsson',        'SWE', 'Tatuus F4-T421', '1:29.306',  89306),
  ( 47, 'Sami Heikkinen',       'FIN', 'Tatuus F4-T421', '1:29.436',  89436),
  ( 48, 'Jesse Visser',         'NLD', 'Tatuus F4-T421', '1:29.566',  89566),
  ( 49, 'Théo Dumont',          'BEL', 'Tatuus F4-T421', '1:29.696',  89696),
  ( 50, 'Jakub Lewandowski',    'POL', 'Tatuus F4-T421', '1:29.826',  89826),
  ( 51, 'Francesco Ricci',      'ITA', 'Tatuus F4-T421', '1:29.956',  89956),
  ( 52, 'Niklas Wagner',        'DEU', 'Tatuus F4-T421', '1:30.086',  90086),
  ( 53, 'Camille Petit',        'FRA', 'Tatuus F4-T421', '1:30.216',  90216),
  ( 54, 'Javier González',      'ESP', 'Tatuus F4-T421', '1:30.346',  90346),
  ( 55, 'Ethan Davies',         'GBR', 'Tatuus F4-T421', '1:30.476',  90476),
  ( 56, 'Frida Eriksson',       'SWE', 'Tatuus F4-T421', '1:30.606',  90606),
  ( 57, 'Pekka Koskinen',       'FIN', 'Tatuus F4-T421', '1:30.736',  90736),
  ( 58, 'Liam Meijer',          'NLD', 'Tatuus F4-T421', '1:30.866',  90866),
  ( 59, 'Baptiste Jacobs',      'BEL', 'Tatuus F4-T421', '1:30.996',  90996),
  ( 60, 'Michał Zieliński',     'POL', 'Tatuus F4-T421', '1:31.126',  91126),
  ( 61, 'Matteo Conti',         'ITA', 'Tatuus F4-T421', '1:31.256',  91256),
  ( 62, 'Leon Becker',          'DEU', 'Tatuus F4-T421', '1:31.386',  91386),
  ( 63, 'Nathan Robert',        'FRA', 'Tatuus F4-T421', '1:31.516',  91516),
  ( 64, 'Raúl Rodríguez',       'ESP', 'Tatuus F4-T421', '1:31.646',  91646),
  ( 65, 'Charlie Evans',        'GBR', 'Tatuus F4-T421', '1:31.776',  91776),
  ( 66, 'Viktor Larsson',       'SWE', 'Tatuus F4-T421', '1:31.906',  91906),
  ( 67, 'Ville Laine',          'FIN', 'Tatuus F4-T421', '1:32.036',  92036),
  ( 68, 'Thomas Mulder',        'NLD', 'Tatuus F4-T421', '1:32.166',  92166),
  ( 69, 'Julien Maes',          'BEL', 'Tatuus F4-T421', '1:32.296',  92296),
  ( 70, 'Rafał Wójcik',         'POL', 'Tatuus F4-T421', '1:32.426',  92426),
  ( 71, 'Andrea Costa',         'ITA', 'Tatuus F4-T421', '1:32.556',  92556),
  ( 72, 'Tim Hoffmann',         'DEU', 'Tatuus F4-T421', '1:32.686',  92686),
  ( 73, 'Léa Richard',          'FRA', 'Tatuus F4-T421', '1:32.816',  92816),
  ( 74, 'Álvaro Fernández',     'ESP', 'Tatuus F4-T421', '1:32.946',  92946),
  ( 75, 'Alfie Thomas',         'GBR', 'Tatuus F4-T421', '1:33.076',  93076),
  ( 76, 'Saga Olsson',          'SWE', 'Tatuus F4-T421', '1:33.206',  93206),
  ( 77, 'Toni Lehtinen',        'FIN', 'Tatuus F4-T421', '1:33.336',  93336),
  ( 78, 'Lars van den Berg',    'NLD', 'Tatuus F4-T421', '1:33.466',  93466),
  ( 79, 'Simon Peeters',        'BEL', 'Tatuus F4-T421', '1:33.596',  93596),
  ( 80, 'Kamil Kamiński',       'POL', 'Tatuus F4-T421', '1:33.726',  93726),
  ( 81, 'Davide Greco',         'ITA', 'Tatuus F4-T421', '1:33.856',  93856),
  ( 82, 'Jan Schäfer',          'DEU', 'Tatuus F4-T421', '1:33.986',  93986),
  ( 83, 'Théo Simon',           'FRA', 'Tatuus F4-T421', '1:34.116',  94116),
  ( 84, 'Miguel Torres',        'ESP', 'Tatuus F4-T421', '1:34.246',  94246),
  ( 85, 'Freddie Johnson',      'GBR', 'Tatuus F4-T421', '1:34.376',  94376),
  ( 86, 'Anton Persson',        'SWE', 'Tatuus F4-T421', '1:34.506',  94506),
  ( 87, 'Henri Niemi',          'FIN', 'Tatuus F4-T421', '1:34.636',  94636),
  ( 88, 'Milan Smit',           'NLD', 'Tatuus F4-T421', '1:34.766',  94766),
  ( 89, 'Lucas Leclercq',       'BEL', 'Tatuus F4-T421', '1:34.896',  94896),
  ( 90, 'Paweł Krawczyk',       'POL', 'Tatuus F4-T421', '1:35.026',  95026),
  ( 91, 'Stefano Bruno',        'ITA', 'Tatuus F4-T421', '1:35.156',  95156),
  ( 92, 'Moritz Koch',          'DEU', 'Tatuus F4-T421', '1:35.286',  95286),
  ( 93, 'Chloé Michel',         'FRA', 'Tatuus F4-T421', '1:35.416',  95416),
  ( 94, 'Sergio Ruiz',          'ESP', 'Tatuus F4-T421', '1:35.546',  95546),
  ( 95, 'Oscar Williams',       'GBR', 'Tatuus F4-T421', '1:35.676',  95676),
  ( 96, 'Elsa Svensson',        'SWE', 'Tatuus F4-T421', '1:35.806',  95806),
  ( 97, 'Kalle Ojala',          'FIN', 'Tatuus F4-T421', '1:35.936',  95936),
  ( 98, 'Tim de Boer',          'NLD', 'Tatuus F4-T421', '1:36.066',  96066),
  ( 99, 'Robin Declercq',       'BEL', 'Tatuus F4-T421', '1:36.196',  96196),
  (100, 'Bartosz Mazur',        'POL', 'Tatuus F4-T421', '1:36.326',  96326)
) as entry(position, full_name, country, car, time_display, time_ms)
where c.slug = 'fia-esports-global-rally-tour-2026'
on conflict do nothing;
