create table if not exists quote_requests (
  id          serial primary key,
  kind        text not null,
  name        text not null,
  email       text not null,
  phone       text not null,
  company     text not null default '',
  employees   text not null default '',
  city        text not null default '',
  coverage    text not null default '',
  notes       text not null default '',
  created_at  timestamptz not null default now()
);
