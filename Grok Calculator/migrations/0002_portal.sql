create table if not exists profiles (
  user_id      text primary key,
  first_name   text not null,
  last_name    text not null,
  member_id    text not null,
  employer     text not null,
  group_number text not null,
  date_of_birth text not null default '',
  phone        text not null default '',
  address_line text not null default '',
  city         text not null default '',
  state        text not null default 'CA',
  zip          text not null default '',
  job_title    text not null default '',
  created_at   timestamptz not null default now()
);

create table if not exists coverages (
  id                 serial primary key,
  user_id            text not null,
  type               text not null,
  plan_name          text not null,
  carrier            text not null,
  member_id          text not null,
  group_number       text not null,
  effective_date     date not null,
  status             text not null default 'active',
  deductible_used    numeric not null default 0,
  deductible_max     numeric not null default 0,
  oop_used           numeric not null default 0,
  oop_max            numeric not null default 0,
  premium_employee   numeric not null default 0,
  network            text not null default '',
  summary            text not null default ''
);
create index if not exists coverages_user_id_idx on coverages (user_id);

create table if not exists claims (
  id            serial primary key,
  user_id       text not null,
  claim_number  text not null,
  service_date  date not null,
  provider      text not null,
  type          text not null,
  billed        numeric not null default 0,
  plan_paid     numeric not null default 0,
  member_owed   numeric not null default 0,
  status        text not null,
  description   text not null default ''
);
create index if not exists claims_user_id_idx on claims (user_id);

create table if not exists dependents (
  id            serial primary key,
  user_id       text not null,
  name          text not null,
  relationship  text not null,
  date_of_birth text not null default '',
  covered       boolean not null default true
);
create index if not exists dependents_user_id_idx on dependents (user_id);

create table if not exists documents (
  id           serial primary key,
  user_id      text not null,
  title        text not null,
  category     text not null,
  date_issued  date not null,
  summary      text not null default ''
);
create index if not exists documents_user_id_idx on documents (user_id);

create table if not exists messages (
  id          serial primary key,
  user_id     text not null,
  subject     text not null,
  body        text not null,
  from_name   text not null,
  created_at  timestamptz not null default now(),
  read        boolean not null default false,
  kind        text not null default 'notice'
);
create index if not exists messages_user_id_idx on messages (user_id);
