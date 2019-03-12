create table users (
  user_id  uuid          not null default uuid_generate_v4(),
  username nonempty_text not null,
  password nonempty_text,
  primary key (user_id),
  unique (username)
);

---
drop table users;
