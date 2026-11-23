alter table public.news_posts add column if not exists image_url text not null default '';

update public.news_posts set image_url = case
  when id = '190f3176-a8cd-4341-83b5-fa794dd5ba85' then '/__l5e/assets-v1/fd733190-3b30-4aeb-b32d-57b42840cb5c/news-workshop.png'
  when id = 'fcb341df-bead-4bf5-acda-1973d466ac31' then '/__l5e/assets-v1/5b92fb9d-ea7d-4fe2-a033-5b701a07d750/news-signing.png'
  when id = 'a9536bea-f5c4-41d4-92eb-cffad7e9d447' then '/__l5e/assets-v1/4399b826-514a-4588-9699-d2e4d17d3339/news-strategy.png'
  when id = 'f8e7ad1b-ed26-4100-bfbd-a1ebe1bd6ac3' then '/__l5e/assets-v1/1c5f6882-b6eb-4a54-8030-fe93f52e2fcb/news-partnership.png'
  when id = 'c71aad8a-f69e-4a3e-a307-0065f558647f' then '/__l5e/assets-v1/662235fa-9eb9-4efa-add7-65b9b3ae2566/news-committee.png'
  when id = '682acdcf-dc30-412c-929a-29000c459ba4' then '/__l5e/assets-v1/8cbd297e-b0fe-4c98-91b9-50d1d4569365/news-field.png'
  when id = 'ef294dd5-0f42-49bb-87e4-9069b22c3c12' then '/__l5e/assets-v1/8cbd297e-b0fe-4c98-91b9-50d1d4569365/news-field.png'
  when id = '3ab9a0cc-90cd-48ac-85fc-23c052d0d07f' then '/__l5e/assets-v1/a1d389e5-4264-406c-a4c7-697e4aea2753/news-trainers.png'
  when id = '65ecafe6-65b8-45dc-9d76-6133c7d14bfa' then '/__l5e/assets-v1/5b92fb9d-ea7d-4fe2-a033-5b701a07d750/news-signing.png'
  else image_url end;