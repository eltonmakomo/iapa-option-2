ALTER TABLE public.team_members ADD COLUMN photo_url text NOT NULL DEFAULT '';

UPDATE public.team_members SET photo_url = CASE
  WHEN group_key = 'board' AND sort = 1 THEN '/__l5e/assets-v1/6cc91ccc-28f7-45de-a428-bbe0e8fd4b3d/leader-man1.png'
  WHEN group_key = 'board' AND sort = 2 THEN '/__l5e/assets-v1/3a41873e-f7b5-41f8-bf37-1b2bdf23a64b/leader-woman1.png'
  WHEN group_key = 'board' AND sort = 3 THEN '/__l5e/assets-v1/0c9e35c0-ecd5-4102-82c3-d09b8d5a5844/leader-man2.png'
  WHEN group_key = 'board' AND sort = 4 THEN '/__l5e/assets-v1/2eeffb6a-656d-49ed-a530-8f29bfeed966/leader-woman2.png'
  WHEN group_key = 'board' AND sort = 5 THEN '/__l5e/assets-v1/02d1c721-de60-4658-b0bc-9a17fa2ae478/leader-man3.png'
  WHEN group_key = 'board' AND sort = 6 THEN '/__l5e/assets-v1/9ecd9ed9-f63f-4add-9ab3-067b40f0d89b/leader-woman3.png'
  WHEN group_key = 'board' AND sort = 7 THEN '/__l5e/assets-v1/3c1ee0c8-7638-4a0e-9a23-97fd83a9b66b/leader-man4.png'
  WHEN group_key = 'board' AND sort = 8 THEN '/__l5e/assets-v1/c7626c82-6e9b-40bd-a24e-638a7606af6d/leader-woman4.png'
  WHEN group_key = 'board' AND sort = 9 THEN '/__l5e/assets-v1/0c9e35c0-ecd5-4102-82c3-d09b8d5a5844/leader-man2.png'
  WHEN group_key = 'secretariat' AND sort = 1 THEN '/__l5e/assets-v1/2eeffb6a-656d-49ed-a530-8f29bfeed966/leader-woman2.png'
  WHEN group_key = 'secretariat' AND sort = 2 THEN '/__l5e/assets-v1/02d1c721-de60-4658-b0bc-9a17fa2ae478/leader-man3.png'
  WHEN group_key = 'secretariat' AND sort = 3 THEN '/__l5e/assets-v1/3a41873e-f7b5-41f8-bf37-1b2bdf23a64b/leader-woman1.png'
  WHEN group_key = 'secretariat' AND sort = 4 THEN '/__l5e/assets-v1/3c1ee0c8-7638-4a0e-9a23-97fd83a9b66b/leader-man4.png'
  WHEN group_key = 'secretariat' AND sort = 5 THEN '/__l5e/assets-v1/c7626c82-6e9b-40bd-a24e-638a7606af6d/leader-woman4.png'
  WHEN group_key = 'supervisory' AND sort = 1 THEN '/__l5e/assets-v1/9ecd9ed9-f63f-4add-9ab3-067b40f0d89b/leader-woman3.png'
  WHEN group_key = 'supervisory' AND sort = 2 THEN '/__l5e/assets-v1/6cc91ccc-28f7-45de-a428-bbe0e8fd4b3d/leader-man1.png'
  WHEN group_key = 'supervisory' AND sort = 3 THEN '/__l5e/assets-v1/2eeffb6a-656d-49ed-a530-8f29bfeed966/leader-woman2.png'
  ELSE photo_url
END;