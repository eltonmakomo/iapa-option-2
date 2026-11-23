
create type public.app_role as enum ('admin', 'user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));

-- first account created becomes admin
create or replace function public.handle_first_admin()
returns trigger language plpgsql security definer set search_path = public
as $$ begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles(user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_first_admin after insert on auth.users for each row execute function public.handle_first_admin();

create table public.site_settings (
  id int primary key default 1 check (id = 1),
  show_placeholders boolean not null default true,
  linkedin_url text not null default '#',
  facebook_url text not null default '#',
  x_url text not null default '#',
  youtube_url text not null default '#'
);
grant select on public.site_settings to anon, authenticated;
grant update on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
create policy "Public read settings" on public.site_settings for select to anon, authenticated using (true);
create policy "Admins update settings" on public.site_settings for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
insert into public.site_settings(id) values (1);

create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  group_key text not null, sort int not null default 0,
  name text not null default '[Name]', role_en text not null, role_fr text not null,
  country text not null default '[Country]', bio_en text not null default '', bio_fr text not null default '',
  linkedin text not null default '#', is_placeholder boolean not null default true
);
create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'news', sort int not null default 0,
  title_en text not null, title_fr text not null, body_en text not null default '', body_fr text not null default '',
  date_label text not null default '[Date TBC]', country text not null default '', approach text not null default '',
  image_caption text not null default '', is_placeholder boolean not null default true
);
create table public.events (
  id uuid primary key default gen_random_uuid(), sort int not null default 0,
  title_en text not null, title_fr text not null, date_label text not null default '[Date TBC]',
  location text not null default '', status text not null default 'upcoming', is_placeholder boolean not null default true
);
create table public.resources (
  id uuid primary key default gen_random_uuid(), sort int not null default 0,
  title_en text not null, title_fr text not null, type_en text not null, type_fr text not null,
  url text, is_placeholder boolean not null default true
);
create table public.testimonials (
  id uuid primary key default gen_random_uuid(), sort int not null default 0,
  quote_en text not null, quote_fr text not null, name text not null default '[Name]',
  role_en text not null, role_fr text not null, is_placeholder boolean not null default true
);
create table public.vacancies (
  id uuid primary key default gen_random_uuid(), sort int not null default 0,
  title_en text not null, title_fr text not null, body_en text not null default '', body_fr text not null default '',
  is_placeholder boolean not null default true
);
create table public.scholarships (
  id uuid primary key default gen_random_uuid(), sort int not null default 0,
  title_en text not null, title_fr text not null, body_en text not null default '', body_fr text not null default '',
  is_placeholder boolean not null default true
);
create table public.faqs (
  id uuid primary key default gen_random_uuid(), sort int not null default 0, category text not null,
  question_en text not null, question_fr text not null, answer_en text not null, answer_fr text not null,
  is_placeholder boolean not null default true
);

do $$ declare t text; begin
  foreach t in array array['team_members','news_posts','events','resources','testimonials','vacancies','scholarships','faqs'] loop
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "Public read" on public.%I for select to anon, authenticated using (true)', t);
    execute format('create policy "Admins insert" on public.%I for insert to authenticated with check (public.has_role(auth.uid(),''admin''))', t);
    execute format('create policy "Admins update" on public.%I for update to authenticated using (public.has_role(auth.uid(),''admin'')) with check (public.has_role(auth.uid(),''admin''))', t);
    execute format('create policy "Admins delete" on public.%I for delete to authenticated using (public.has_role(auth.uid(),''admin''))', t);
  end loop;
end $$;

-- Leadership
insert into public.team_members(group_key, sort, name, role_en, role_fr, country, bio_en, bio_fr, is_placeholder) values
('board',1,'Valentin Nchendeh','President of the Board','Président du Conseil d''administration','Cameroon','[Bio to come]','[Biographie à venir] [FR à valider]',false);
insert into public.team_members(group_key, sort, role_en, role_fr, bio_en, bio_fr)
select g, s, r_en, r_fr,
 '[Name] is a certified Master Trainer with [X] years of experience in agribusiness training and advisory services in [Country]. [He/She] specialises in [approaches / value chains]. [Client to review]',
 '[Nom] est Master Trainer certifié(e) avec [X] années d''expérience dans la formation et le conseil en agribusiness en/au [Pays]. [Il/Elle] est spécialisé(e) dans [approches / chaînes de valeur]. [Client to review] [FR à valider]'
from (values
 ('board',2,'Vice President','Vice-président(e)'),
 ('board',3,'Treasurer','Trésorier(ère)'),
 ('board',4,'Executive Secretary','Secrétaire exécutif(ve)'),
 ('board',5,'Regional Focal Point – North Africa','Point focal régional – Afrique du Nord'),
 ('board',6,'Regional Focal Point – Francophone West Africa','Point focal régional – Afrique de l''Ouest francophone'),
 ('board',7,'Regional Focal Point – Anglophone West & Central Africa','Point focal régional – Afrique de l''Ouest et centrale anglophone'),
 ('board',8,'Regional Focal Point – East Africa','Point focal régional – Afrique de l''Est'),
 ('board',9,'Regional Focal Point – Southern Africa','Point focal régional – Afrique australe'),
 ('supervisory',1,'Member, Supervisory Board','Membre, Conseil de surveillance'),
 ('supervisory',2,'Member, Supervisory Board','Membre, Conseil de surveillance'),
 ('supervisory',3,'Member, Supervisory Board','Membre, Conseil de surveillance'),
 ('secretariat',1,'Secretary General','Secrétaire général(e)'),
 ('secretariat',2,'Head, Administration & Finance','Responsable, Administration et Finances'),
 ('secretariat',3,'Head, Marketing & Communication','Responsable, Marketing et Communication'),
 ('secretariat',4,'Head, Career Development','Responsable, Développement de carrière'),
 ('secretariat',5,'Head, Quality Assurance & Control','Responsable, Assurance et Contrôle qualité')
) v(g,s,r_en,r_fr);

-- Testimonials
insert into public.testimonials(sort, quote_en, quote_fr, role_en, role_fr) values
(1,'[Quote from a development partner about working with IAPA trainers]','[Citation d''un partenaire au développement sur sa collaboration avec les formateurs de l''AIPA] [FR à valider]','Programme Manager, [Organisation]','Responsable de programme, [Organisation]'),
(2,'[Quote from a Master Trainer about the value of IAPA membership]','[Citation d''un Master Trainer sur la valeur de l''adhésion à l''AIPA] [FR à valider]','Master Trainer, [Country]','Master Trainer, [Pays]'),
(3,'[Quote from a farmer or cooperative leader about the training''s impact]','[Citation d''un agriculteur ou d''un responsable de coopérative sur l''impact de la formation] [FR à valider]','[Role], [Country]','[Fonction], [Pays]');

-- Resources
insert into public.resources(sort, title_en, title_fr, type_en, type_fr, url, is_placeholder) values
(0,'IAPA Pulse, Issue 2 (June 2026)','IAPA Pulse, numéro 2 (juin 2026)','Newsletter','Lettre d''information',null,false),
(1,'Sample: IAPA Strategic Plan 2026–2030 (Summary)','Exemple : Plan stratégique de l''AIPA 2026–2030 (résumé) [FR à valider]','Publication','Publication',null,true),
(2,'Sample: Farmer Business School — Approach Brief','Exemple : Farmer Business School — Fiche approche [FR à valider]','Publication','Publication',null,true),
(3,'Sample: Inclusive contract farming in West Africa','Exemple : L''agriculture contractuelle inclusive en Afrique de l''Ouest [FR à valider]','Case study','Étude de cas',null,true),
(4,'Sample: Climate-smart agribusiness training','Exemple : Formation en agribusiness climato-intelligent [FR à valider]','Policy brief','Note de politique',null,true),
(5,'Sample: Webinar — Introduction to IAPA','Exemple : Webinaire — Présentation de l''AIPA [FR à valider]','Webinar / recording','Webinaire / enregistrement',null,true),
(6,'Sample: Women and youth in agribusiness value chains','Exemple : Les femmes et les jeunes dans les chaînes de valeur agribusiness [FR à valider]','Research paper','Article de recherche',null,true);

-- Events
insert into public.events(sort, title_en, title_fr, location) values
(1,'IAPA General Assembly','Assemblée générale de l''AIPA [FR à valider]','Online / [Venue TBC]'),
(2,'Webinar: Introducing IAPA''s Agribusiness Approaches','Webinaire : Présentation des approches agribusiness de l''AIPA [FR à valider]','Online');

-- Press
insert into public.news_posts(kind, sort, title_en, title_fr, body_en, body_fr, image_caption) values
('press',1,'Sample: IAPA officially registered in Ghana','Exemple : L''AIPA officiellement enregistrée au Ghana [FR à valider]','[Press release text to come]','[Texte du communiqué à venir] [FR à valider]','Photo: signing ceremony');

-- News (real, from IAPA Pulse)
insert into public.news_posts(kind, sort, title_en, title_fr, body_en, body_fr, date_label, country, approach, image_caption, is_placeholder) values
('news',1,'IAPA takes a major step forward at the strategic workshop in Kenya','L''AIPA franchit une étape majeure lors de l''atelier stratégique au Kenya',
 E'In May 2026, IAPA members came together in Kenya for a strategic workshop with ABF-GIZ and ACBF.\n\nOver three days, participants worked on the association''s governance, business model and long-term sustainability.\n\nThe outcomes feed directly into IAPA''s Strategic Plan 2026–2030. [Client to review]',
 E'En mai 2026, des membres de l''AIPA se sont réunis au Kenya pour un atelier stratégique avec l''ABF-GIZ et l''ACBF.\n\nPendant trois jours, les participants ont travaillé sur la gouvernance, le modèle économique et la pérennité de l''association.\n\nLes résultats alimentent directement le Plan stratégique 2026–2030 de l''AIPA. [Client to review] [FR à valider]',
 'May 2026','Kenya','Governance','Photo: workshop participants in Kenya',false),
('news',2,'IAPA registration documents signed in Ghana','Signature des documents d''enregistrement de l''AIPA au Ghana',
 E'On 2 June 2026, IAPA''s President and the Ghana focal point signed the association''s registration documents.\n\nRegistration in Accra gives IAPA a legal home from which to work with partners across the continent.\n\n[Further details to come] [Client to review]',
 E'Le 2 juin 2026, le Président de l''AIPA et le point focal du Ghana ont signé les documents d''enregistrement de l''association.\n\nL''enregistrement à Accra donne à l''AIPA un ancrage juridique pour collaborer avec ses partenaires à travers le continent.\n\n[Détails à venir] [Client to review] [FR à valider]',
 'June 2026','Ghana','Governance','Photo: signing of registration documents',false),
('news',3,'IAPA completes its strategy work with ACBF consultants','L''AIPA finalise ses travaux stratégiques avec les consultants de l''ACBF',
 E'Working with consultants from the African Capacity Building Foundation (ACBF), IAPA has completed its institutional, resource mobilisation and communication strategies.\n\nTogether these strategies set out how IAPA will organise itself, fund its work and reach partners and members.\n\n[Client to review]',
 E'Avec les consultants de la Fondation pour le renforcement des capacités en Afrique (ACBF), l''AIPA a finalisé ses stratégies institutionnelle, de mobilisation des ressources et de communication.\n\nEnsemble, ces stratégies définissent comment l''AIPA s''organise, finance ses activités et atteint partenaires et membres.\n\n[Client to review] [FR à valider]',
 'June 2026','','Strategy','Photo: strategy session',false),
('news',4,'Exploring a partnership with Africa Agribusiness Academy','Vers un partenariat avec l''Africa Agribusiness Academy',
 E'IAPA and Africa Agribusiness Academy have begun exploring how the two organisations could work together.\n\n[Details of the discussions to come] [Client to review]',
 E'L''AIPA et l''Africa Agribusiness Academy ont commencé à explorer les pistes de collaboration entre les deux organisations.\n\n[Détails des échanges à venir] [Client to review] [FR à valider]',
 '[Date TBC]','','Partnerships','Photo: partnership meeting',false),
('news',5,'IAPA represented on the ABF-GIZ Independent Evaluation Committee','L''AIPA représentée au Comité d''évaluation indépendant de l''ABF-GIZ',
 E'In June 2026, IAPA was represented on the ABF-GIZ Independent Evaluation Committee in Accra.\n\n[Details of IAPA''s role on the committee to come] [Client to review]',
 E'En juin 2026, l''AIPA était représentée au Comité d''évaluation indépendant de l''ABF-GIZ à Accra.\n\n[Détails du rôle de l''AIPA à venir] [Client to review] [FR à valider]',
 'June 2026','Ghana','Partnerships','Photo: evaluation committee in Accra',false),
('news',6,'Members in the spotlight: Cameroon, Chad and Morocco','Membres à l''honneur : Cameroun, Tchad et Maroc',
 E'This edition highlights the work of IAPA members in Cameroon, Chad and Morocco.\n\n[Member stories to come] [Client to review]',
 E'Cette édition met en lumière le travail des membres de l''AIPA au Cameroun, au Tchad et au Maroc.\n\n[Histoires des membres à venir] [Client to review] [FR à valider]',
 'April 2026','Cameroon, Chad, Morocco','FBS','Photo: trainer with farmer group',false),
('news',7,'Members in the spotlight: Burkina Faso, Mali, Madagascar and Côte d''Ivoire','Membres à l''honneur : Burkina Faso, Mali, Madagascar et Côte d''Ivoire',
 E'This edition highlights the work of IAPA members in Burkina Faso, Mali, Madagascar and Côte d''Ivoire.\n\n[Member stories to come] [Client to review]',
 E'Cette édition met en lumière le travail des membres de l''AIPA au Burkina Faso, au Mali, à Madagascar et en Côte d''Ivoire.\n\n[Histoires des membres à venir] [Client to review] [FR à valider]',
 'June 2026','Burkina Faso, Mali, Madagascar, Côte d''Ivoire','CBS','Photo: cooperative training session',false),
('news',8,'Five Master Trainers selected to coach agribusiness competition winners','Cinq Master Trainers sélectionnés pour accompagner les lauréats d''un concours agribusiness',
 E'Five IAPA Master Trainers from Nigeria, Ghana and Ethiopia were selected to coach the winners of an agribusiness competition run by the Agribusiness E-Academy.\n\nThe selection reflects the value partners place on IAPA''s certified expertise.\n\n[Client to review]',
 E'Cinq Master Trainers de l''AIPA venant du Nigeria, du Ghana et d''Éthiopie ont été sélectionnés pour accompagner les lauréats d''un concours agribusiness organisé par l''Agribusiness E-Academy.\n\nCette sélection témoigne de la valeur que les partenaires accordent à l''expertise certifiée de l''AIPA.\n\n[Client to review] [FR à valider]',
 '[Date TBC]','Nigeria, Ghana, Ethiopia','Coaching','Photo: Master Trainer coaching an entrepreneur',false);

-- FAQs
insert into public.faqs(category, sort, question_en, question_fr, answer_en, answer_fr) values
('about',1,'What is IAPA?','Qu''est-ce que l''AIPA ?','A pan-African, membership-based association of certified agribusiness trainers, Master Trainers and value chain experts from 20+ African countries. [Client to review]','Une association panafricaine de membres réunissant des formateurs certifiés en agribusiness, des Master Trainers et des experts des chaînes de valeur de plus de 20 pays africains. [Client to review] [FR à valider]'),
('about',2,'Where is IAPA based?','Où l''AIPA est-elle basée ?','IAPA is registered in Accra, Ghana, and works through focal points in five African regions. [Client to review]','L''AIPA est enregistrée à Accra, au Ghana, et travaille à travers des points focaux dans cinq régions africaines. [Client to review] [FR à valider]'),
('about',3,'How is IAPA linked to GIZ?','Quel est le lien entre l''AIPA et la GIZ ?','IAPA was initiated under the Agri-Business Facility for Africa (ABF), implemented by GIZ, which continues to support it as a partner. [Client to review]','L''AIPA a été initiée dans le cadre de l''Agri-Business Facility for Africa (ABF), mise en œuvre par la GIZ, qui continue de la soutenir en tant que partenaire. [Client to review] [FR à valider]'),
('services',1,'Can IAPA deliver training in my country?','L''AIPA peut-elle dispenser des formations dans mon pays ?','Yes. Through its network of focal points and Master Trainers, IAPA can deliver training in English and French across Africa. Contact us through "Work with us". [Client to review]','Oui. Grâce à son réseau de points focaux et de Master Trainers, l''AIPA peut dispenser des formations en anglais et en français dans toute l''Afrique. Contactez-nous via « Travailler avec nous ». [Client to review] [FR à valider]'),
('services',2,'Can training be adapted to our value chain?','La formation peut-elle être adaptée à notre chaîne de valeur ?','Yes. IAPA adapts its approaches and training materials to each partner''s value chain, target group and context. [Client to review]','Oui. L''AIPA adapte ses approches et ses supports de formation à la chaîne de valeur, au public cible et au contexte de chaque partenaire. [Client to review] [FR à valider]'),
('membership',1,'Who can become a member?','Qui peut devenir membre ?','See the membership categories on the Join Us page. [Client to confirm] [Client to review]','Consultez les catégories d''adhésion sur la page Nous rejoindre. [Client to confirm] [Client to review] [FR à valider]'),
('membership',2,'How much does membership cost?','Combien coûte l''adhésion ?','Membership fees are set by the General Assembly. [Fee TBC] [Client to review]','Les cotisations sont fixées par l''Assemblée générale. [Fee TBC] [Client to review] [FR à valider]'),
('membership',3,'What are the benefits of membership?','Quels sont les avantages de l''adhésion ?','Certification and professional development, coaching and mentorship, visibility to partners, and access to consultancy opportunities. [Client to review]','Certification et développement professionnel, coaching et mentorat, visibilité auprès des partenaires et accès à des missions de conseil. [Client to review] [FR à valider]');
