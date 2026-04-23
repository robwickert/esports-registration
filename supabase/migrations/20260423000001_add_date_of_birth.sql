alter table registrations add column if not exists date_of_birth date not null default '2000-01-01';
alter table registrations alter column date_of_birth drop default;
