import type { Lang } from "./i18n";
type L = Record<Lang, string>;
const l = (en: string, fr: string): L => ({ en, fr });
export type Img = "hero" | "coop" | "processor" | "training";
export type Section = { h: L; p?: L; items?: [L, L][] };
export type Page = { eyebrow: L; title: L; intro: L; img: Img; sections: Section[]; stats?: [string, L][]; cta?: { label: L; slug: string } };

const join = { label: l("Become a member", "Devenir membre"), slug: "join" };
const contact = { label: l("Work with us", "Travailler avec nous"), slug: "work-with-us" };

const approach = (name: string, frName: string, en: string, fr: string, who: L, img: Img): Page => ({
  eyebrow: l("Training approach", "Approche de formation"), title: l(name, frName), intro: l(en, fr), img,
  sections: [
    { h: l("Who it is for", "À qui s'adresse-t-elle"), p: who },
    { h: l("How it is delivered", "Comment elle est dispensée"), items: [
      [l("Training of Trainers", "Formation de formateurs"), l("Certified IAPA Master Trainers train and coach local trainers.", "Des Master Trainers certifiés de l'AIPA forment et accompagnent des formateurs locaux.")],
      [l("Practical sessions", "Séances pratiques"), l("Adult-centred, participatory modules using manuals, posters and Excel tools.", "Modules participatifs centrés sur l'adulte, avec manuels, posters et outils Excel.")],
      [l("Supervision & reporting", "Supervision et rapports"), l("Quality assurance, follow-up visits and results reporting for partners.", "Assurance qualité, visites de suivi et rapports de résultats pour les partenaires.")],
    ]},
    { h: l("Inclusion and climate", "Inclusion et climat"), p: l("Every curriculum integrates women, youth and persons with disabilities, and promotes climate-smart practices.", "Chaque curriculum intègre les femmes, les jeunes et les personnes en situation de handicap, et promeut des pratiques climato-intelligentes.") },
  ],
  cta: contact,
});

export const PAGES: Record<string, Page> = {
  "who-we-are": { eyebrow: l("Who we are", "Qui sommes-nous"), title: l("A pan-African body of agribusiness practitioners", "Un organisme panafricain de praticiens de l'agribusiness"), img: "hero",
    intro: l("IAPA was founded in September 2023 in South Africa and is registered in Accra, Ghana. Initiated under the Agri-Business Facility for Africa (ABF), implemented by GIZ, it brings together Master Trainers and value chain experts from more than 20 countries.", "L'AIPA a été fondée en septembre 2023 en Afrique du Sud et est enregistrée à Accra, au Ghana. Initiée dans le cadre de l'Agri-Business Facility for Africa (ABF), mise en œuvre par la GIZ, elle réunit des Master Trainers et des experts des chaînes de valeur de plus de 20 pays."),
    sections: [
      { h: l("Our mission", "Notre mission"), p: l("Through a strong community of agribusiness professionals, we improve the livelihoods of agricultural value chain actors and strengthen their climate resilience.", "Grâce à une communauté solide de professionnels de l'agribusiness, nous améliorons les moyens de subsistance des acteurs des chaînes de valeur agricoles et renforçons leur résilience climatique.") },
      { h: l("Our values", "Nos valeurs"), items: [
        [l("Synergy", "Synergie"), l("We combine our members' expertise to achieve more together.", "Nous combinons l'expertise de nos membres pour accomplir plus ensemble.")],
        [l("Inclusion", "Inclusion"), l("Women, youth and persons with disabilities are at the centre of our work.", "Les femmes, les jeunes et les personnes en situation de handicap sont au cœur de notre action.")],
        [l("Solidarity", "Solidarité"), l("Experienced members mentor and support the next generation of practitioners.", "Les membres expérimentés accompagnent la nouvelle génération de praticiens.")],
      ]},
    ], cta: join },
  "who-we-are/leadership": { eyebrow: l("Leadership", "Direction"), title: l("The people steering IAPA", "Les personnes qui pilotent l'AIPA"), img: "training",
    intro: l("IAPA is led by an elected Board and a Secretariat, supported by Regional and National Focal Points across Africa.", "L'AIPA est dirigée par un Conseil élu et un Secrétariat, appuyés par des Points focaux régionaux et nationaux à travers l'Afrique."),
    sections: [{ h: l("Leadership structure", "Structure de direction"), items: [
      [l("Board of Directors", "Conseil d'administration"), l("Sets strategy, oversees governance and represents the association.", "Définit la stratégie, supervise la gouvernance et représente l'association.")],
      [l("Secretariat", "Secrétariat"), l("Runs daily operations, partnerships, finance and communication.", "Assure les opérations quotidiennes, les partenariats, les finances et la communication.")],
      [l("Regional Focal Points", "Points focaux régionaux"), l("Coordinate members and activities across the five African regions.", "Coordonnent les membres et les activités dans les cinq régions africaines.")],
      [l("National Focal Points", "Points focaux nationaux"), l("Represent IAPA in each member country.", "Représentent l'AIPA dans chaque pays membre.")],
    ]}] },
  "who-we-are/governance": { eyebrow: l("Governance", "Gouvernance"), title: l("Transparent, member-driven governance", "Une gouvernance transparente et portée par les membres"), img: "coop",
    intro: l("IAPA is a registered association accountable to its members through its General Assembly and constitution.", "L'AIPA est une association enregistrée, redevable envers ses membres à travers son Assemblée générale et ses statuts."),
    sections: [{ h: l("Governing bodies", "Organes de gouvernance"), items: [
      [l("General Assembly", "Assemblée générale"), l("All members; elects the Board and approves strategy and accounts.", "Tous les membres ; élit le Conseil et approuve la stratégie et les comptes.")],
      [l("Board", "Conseil"), l("Provides strategic direction and oversight of the Secretariat.", "Assure l'orientation stratégique et la supervision du Secrétariat.")],
      [l("Strategic Plan 2026–2030", "Plan stratégique 2026–2030"), l("Guides our growth toward 40 countries and 1M+ farmers and entrepreneurs trained.", "Guide notre croissance vers 40 pays et plus d'un million d'agriculteurs et entrepreneurs formés.")],
    ]}] },
  "who-we-are/partners": { eyebrow: l("Partners & funders", "Partenaires et bailleurs"), title: l("Working with those who invest in Africa's farmers", "Aux côtés de ceux qui investissent dans les agriculteurs africains"), img: "processor",
    intro: l("Our approaches were developed over 10+ years with ABF-GIZ. Today we partner with development agencies, governments and the private sector.", "Nos approches ont été développées pendant plus de 10 ans avec l'ABF-GIZ. Aujourd'hui, nous collaborons avec des agences de développement, des gouvernements et le secteur privé."),
    sections: [{ h: l("Our partners", "Nos partenaires"), items: [
      [l("ABF-GIZ", "ABF-GIZ"), l("Agri-Business Facility for Africa, where IAPA was initiated.", "Agri-Business Facility for Africa, où l'AIPA a été initiée.")],
      [l("GIZ / BMZ", "GIZ / BMZ"), l("German development cooperation.", "Coopération allemande au développement.")],
      [l("European Union & OACPS", "Union européenne et OEACP"), l("Co-funders of agribusiness programmes.", "Cofinanceurs de programmes d'agribusiness.")],
      [l("ACBF", "ACBF"), l("Support on institutional strategy and resource mobilisation.", "Appui à la stratégie institutionnelle et à la mobilisation des ressources.")],
      [l("MOVE / ComCashew & Africa Agribusiness Academy", "MOVE / ComCashew et Africa Agribusiness Academy"), l("Programme and training partners.", "Partenaires de programmes et de formation.")],
    ]}], cta: contact },
  "who-we-are/where-we-work": { eyebrow: l("Where we work", "Où nous travaillons"), title: l("Five regions, one network", "Cinq régions, un réseau"), img: "hero",
    intro: l("Every region has a Regional Focal Point and every country a National Focal Point.", "Chaque région a un Point focal régional et chaque pays un Point focal national."),
    sections: [{ h: l("Our regions", "Nos régions"), items: [
      [l("North Africa", "Afrique du Nord"), l("Tunisia, Algeria", "Tunisie, Algérie")],
      [l("Francophone West Africa", "Afrique de l'Ouest francophone"), l("Benin, Burkina Faso, Mali, Cabo Verde, Togo", "Bénin, Burkina Faso, Mali, Cap-Vert, Togo")],
      [l("Anglophone West & Central Africa", "Afrique de l'Ouest et centrale anglophone"), l("Ghana, Nigeria, Cameroon", "Ghana, Nigeria, Cameroun")],
      [l("East Africa", "Afrique de l'Est"), l("South Sudan, Ethiopia, Tanzania, Rwanda, Madagascar", "Soudan du Sud, Éthiopie, Tanzanie, Rwanda, Madagascar")],
      [l("Southern Africa", "Afrique australe"), l("Namibia, Mozambique, Zambia, Malawi", "Namibie, Mozambique, Zambie, Malawi")],
    ]}] },
  "our-work": { eyebrow: l("Our work", "Nos activités"), title: l("Advisory, curricula, training and events", "Conseil, curricula, formation et événements"), img: "processor",
    intro: l("We help partners choose the right value chain solutions and deliver them at scale through certified trainers.", "Nous aidons les partenaires à choisir les bonnes solutions de chaînes de valeur et à les déployer à grande échelle grâce à des formateurs certifiés."),
    sections: [{ h: l("What we offer", "Ce que nous offrons"), items: [
      [l("Strategic advisory", "Conseil stratégique"), l("Value chain selection and agribusiness solution design.", "Choix des chaînes de valeur et conception de solutions d'agribusiness.")],
      [l("Curriculum development", "Développement de curricula"), l("Manuals, trainers' guides, posters and digital tools.", "Manuels, guides de formateurs, posters et outils numériques.")],
      [l("Quality training", "Formation de qualité"), l("Pilots, Training of Trainers, supervision and reporting.", "Pilotes, formation de formateurs, supervision et rapports.")],
      [l("Events", "Événements"), l("Workshops, conferences and knowledge-sharing platforms.", "Ateliers, conférences et plateformes d'échange.")],
    ]}], cta: contact },
  "our-work/impact-map": { eyebrow: l("Impact map", "Carte d'impact"), title: l("Our footprint across Africa", "Notre présence en Afrique"), img: "hero",
    intro: l("IAPA members are active in more than 20 countries across five regions. An interactive map of projects is being prepared.", "Les membres de l'AIPA sont actifs dans plus de 20 pays et cinq régions. Une carte interactive des projets est en préparation."),
    stats: [["20+", l("Countries", "Pays")], ["5", l("Regions", "Régions")], ["75+", l("Master Trainers", "Master Trainers")]], sections: [] },
  "our-work/numbers": { eyebrow: l("IAPA in numbers", "L'AIPA en chiffres"), title: l("A growing continental network", "Un réseau continental en croissance"), img: "training",
    intro: l("Where we are today, and where we aim to be by 2030.", "Où nous en sommes aujourd'hui, et où nous voulons être en 2030."),
    stats: [["20+", l("Countries today", "Pays aujourd'hui")], ["75+", l("Master Trainers", "Master Trainers")], ["63", l("Founding members", "Membres fondateurs")], ["40", l("Countries by 2030", "Pays d'ici 2030")], ["860", l("New trainers by 2030", "Nouveaux formateurs d'ici 2030")], ["1M+", l("Farmers trained by 2030", "Agriculteurs formés d'ici 2030")]], sections: [] },
  "our-work/stories": { eyebrow: l("Stories", "Histoires"), title: l("Change, told by the people who live it", "Le changement, raconté par ceux qui le vivent"), img: "coop",
    intro: l("Stories from farmers, cooperatives and processors trained by IAPA members will be published here.", "Les histoires d'agriculteurs, de coopératives et de transformateurs formés par les membres de l'AIPA seront publiées ici."), sections: [] },
  "our-work/testimonials": { eyebrow: l("Testimonials", "Témoignages"), title: l("What partners and members say", "Ce que disent partenaires et membres"), img: "training",
    intro: l("Testimonials from partners, trainers and participants are being collected.", "Les témoignages de partenaires, formateurs et participants sont en cours de collecte."), sections: [] },
  training: { eyebrow: l("Training", "Formation"), title: l("Certified, practical, adult-centred training", "Une formation certifiée, pratique et centrée sur l'adulte"), img: "training",
    intro: l("Six proven approaches, delivered by certified Master Trainers in online, residential, blended and tailor-made formats.", "Six approches éprouvées, dispensées par des Master Trainers certifiés en formats en ligne, résidentiel, hybride et sur mesure."),
    sections: [{ h: l("Our approaches", "Nos approches"), items: [
      [l("Farmer Business School", "École d'entrepreneuriat agricole"), l("Farming as a business for smallholders.", "L'agriculture comme une entreprise pour les petits producteurs.")],
      [l("Cooperative Business School", "École d'entrepreneuriat coopératif"), l("Stronger, well-managed cooperatives.", "Des coopératives plus solides et mieux gérées.")],
      [l("Processor Business School", "École d'entrepreneuriat des transformateurs"), l("Growth for small processing enterprises.", "La croissance des petites entreprises de transformation.")],
      [l("Aquaculture Business School", "École d'entrepreneuriat aquacole"), l("Profitable, sustainable fish farming.", "Une pisciculture rentable et durable.")],
      [l("Inclusive Contract Farming", "Agriculture contractuelle inclusive"), l("Fair partnerships between producers and buyers.", "Des partenariats équitables entre producteurs et acheteurs.")],
      [l("Good Agricultural Practices", "Bonnes pratiques agricoles"), l("Higher yields, quality and climate resilience.", "Rendements, qualité et résilience climatique accrus.")],
    ]}], cta: contact },
  "training/fbs": approach("Farmer Business School", "École d'entrepreneuriat agricole", "FBS helps smallholder farmers see their farm as a business: planning, costs, profit and access to markets and finance.", "La FBS aide les petits producteurs à considérer leur exploitation comme une entreprise : planification, coûts, bénéfices et accès aux marchés et au financement.", l("Smallholder farmers and farmer groups.", "Petits producteurs et groupements de producteurs."), "hero"),
  "training/cbs": approach("Cooperative Business School", "École d'entrepreneuriat coopératif", "CBS strengthens the governance, management and business services of farmer cooperatives.", "La CBS renforce la gouvernance, la gestion et les services économiques des coopératives agricoles.", l("Cooperative leaders, managers and members.", "Dirigeants, gestionnaires et membres de coopératives."), "coop"),
  "training/pbs": approach("Processor Business School", "École d'entrepreneuriat des transformateurs", "PBS supports small and medium processors to improve quality, efficiency and profitability.", "La PBS accompagne les petits et moyens transformateurs pour améliorer qualité, efficacité et rentabilité.", l("Owners and staff of agro-processing enterprises.", "Propriétaires et employés d'entreprises agroalimentaires."), "processor"),
  "training/abs": approach("Aquaculture Business School", "École d'entrepreneuriat aquacole", "ABS equips fish farmers with business and technical skills for profitable, sustainable aquaculture.", "L'ABS dote les pisciculteurs de compétences techniques et entrepreneuriales pour une aquaculture rentable et durable.", l("Fish farmers and aquaculture entrepreneurs.", "Pisciculteurs et entrepreneurs aquacoles."), "hero"),
  "training/icf": approach("Inclusive Contract Farming", "Agriculture contractuelle inclusive", "Our contract farming approach builds fair, lasting business relationships between producers and buyers.", "Notre approche d'agriculture contractuelle construit des relations commerciales équitables et durables entre producteurs et acheteurs.", l("Producer organisations, buyers and processors.", "Organisations de producteurs, acheteurs et transformateurs."), "coop"),
  "training/gap": approach("Good Agricultural Practices", "Bonnes pratiques agricoles", "GAP training improves yields, product quality and food safety while protecting the environment.", "La formation aux BPA améliore les rendements, la qualité et la sécurité sanitaire tout en protégeant l'environnement.", l("Farmers, extension agents and lead farmers.", "Agriculteurs, agents de vulgarisation et producteurs relais."), "training"),
  "training/formats": { eyebrow: l("Formats", "Formats"), title: l("Learning that fits your context", "Un apprentissage adapté à votre contexte"), img: "training",
    intro: l("We deliver our training in the format that best suits participants and partners.", "Nous dispensons nos formations dans le format le plus adapté aux participants et partenaires."),
    sections: [{ h: l("Available formats", "Formats disponibles"), items: [
      [l("Online courses", "Cours en ligne"), l("Self-paced and live virtual sessions.", "Sessions virtuelles en autonomie ou en direct.")],
      [l("Residential programmes", "Programmes résidentiels"), l("Intensive, in-person training and certification.", "Formation et certification intensives en présentiel.")],
      [l("Blended courses", "Cours hybrides"), l("Online learning combined with field practice.", "Apprentissage en ligne combiné à la pratique sur le terrain.")],
      [l("Tailor-made programmes", "Programmes sur mesure"), l("Designed with partners for a specific value chain or country.", "Conçus avec les partenaires pour une chaîne de valeur ou un pays.")],
    ]}], cta: contact },
  "knowledge-hub": { eyebrow: l("Knowledge Hub", "Centre de savoirs"), title: l("Evidence, tools and learning", "Données, outils et apprentissages"), img: "processor",
    intro: l("Publications, policy briefs, case studies, webinars and podcasts from practitioners across Africa. Our library is being built.", "Publications, notes de politique, études de cas, webinaires et podcasts de praticiens à travers l'Afrique. Notre bibliothèque est en construction."),
    sections: [{ h: l("Coming to the hub", "Bientôt dans le centre"), items: [
      [l("Publications & research", "Publications et recherche"), l("Reports, papers and policy briefs.", "Rapports, articles et notes de politique.")],
      [l("Case studies", "Études de cas"), l("Lessons from IAPA projects in the field.", "Leçons tirées des projets de l'AIPA sur le terrain.")],
      [l("Webinars & podcasts", "Webinaires et podcasts"), l("Recordings and conversations with experts.", "Enregistrements et échanges avec des experts.")],
    ]}] },
  media: { eyebrow: l("Media", "Médias"), title: l("News, events and IAPA Pulse", "Actualités, événements et IAPA Pulse"), img: "coop",
    intro: l("Follow what's happening across the IAPA network.", "Suivez l'actualité du réseau de l'AIPA."),
    sections: [{ h: l("Latest", "À la une"), items: [
      [l("June 2026 — Registration signed in Ghana", "Juin 2026 — Enregistrement signé au Ghana"), l("The President and our Ghana focal point signed IAPA's registration documents on 2 June 2026.", "Le Président et notre point focal au Ghana ont signé les documents d'enregistrement de l'AIPA le 2 juin 2026.")],
      [l("May 2026 — Strategic workshop in Kenya", "Mai 2026 — Atelier stratégique au Kenya"), l("Three days with ABF-GIZ and ACBF on governance, business model and sustainability.", "Trois jours avec l'ABF-GIZ et l'ACBF sur la gouvernance, le modèle économique et la durabilité.")],
      [l("June 2026 — Strategies completed", "Juin 2026 — Stratégies finalisées"), l("Institutional, resource mobilisation and communication strategies are complete.", "Les stratégies institutionnelle, de mobilisation des ressources et de communication sont finalisées.")],
    ]}] },
  "join": { eyebrow: l("Membership", "Adhésion"), title: l("Join Africa's agribusiness practitioners", "Rejoignez les praticiens de l'agribusiness africain"), img: "training",
    intro: l("Membership is open to Master Trainers, trainers and value chain experts committed to inclusive agribusiness.", "L'adhésion est ouverte aux Master Trainers, formateurs et experts des chaînes de valeur engagés pour un agribusiness inclusif."),
    sections: [{ h: l("Member benefits", "Avantages des membres"), items: [
      [l("Capacity building & certification", "Renforcement des capacités et certification"), l("Professional development and certification programmes.", "Développement professionnel et programmes de certification.")],
      [l("Coaching & mentorship", "Coaching et mentorat"), l("Peer-to-peer learning with experienced Master Trainers.", "Apprentissage entre pairs avec des Master Trainers expérimentés.")],
      [l("Visibility", "Visibilité"), l("Your profile showcased to partners and clients.", "Votre profil présenté aux partenaires et clients.")],
      [l("Assignments", "Missions"), l("Access to consultancy and career opportunities across Africa.", "Accès à des missions de conseil et à des opportunités de carrière en Afrique.")],
    ]}], cta: contact },
  "join/vacancies": { eyebrow: l("Vacancies", "Offres d'emploi"), title: l("Work with IAPA", "Travailler avec l'AIPA"), img: "processor",
    intro: l("There are no open positions right now. New roles and consultancy calls will be posted here.", "Aucun poste n'est ouvert actuellement. Les nouveaux postes et appels à consultance seront publiés ici."), sections: [], cta: join },
  "join/scholarships": { eyebrow: l("Scholarships", "Bourses"), title: l("Support to grow your skills", "Un soutien pour développer vos compétences"), img: "training",
    intro: l("Scholarship opportunities for trainers, including women and young professionals, will be announced here.", "Les opportunités de bourses pour les formateurs, notamment les femmes et les jeunes professionnels, seront annoncées ici."), sections: [], cta: join },
  "work-with-us": { eyebrow: l("Work with us", "Travailler avec nous"), title: l("Let's strengthen value chains together", "Renforçons ensemble les chaînes de valeur"), img: "coop",
    intro: l("Development partners, governments and companies work with IAPA for advisory, curricula, certified training and events.", "Partenaires au développement, gouvernements et entreprises collaborent avec l'AIPA pour le conseil, les curricula, la formation certifiée et les événements."),
    sections: [{ h: l("How to engage", "Comment collaborer"), items: [
      [l("Commission a training", "Commander une formation"), l("Pilots, ToT and scale-up with our Master Trainers.", "Pilotes, formation de formateurs et passage à l'échelle avec nos Master Trainers.")],
      [l("Co-develop a curriculum", "Co-développer un curriculum"), l("Adapted to your value chain and country.", "Adapté à votre chaîne de valeur et à votre pays.")],
      [l("Partner on an event", "S'associer à un événement"), l("Workshops, conferences and learning platforms.", "Ateliers, conférences et plateformes d'apprentissage.")],
    ]}, { h: l("Contact the Secretariat", "Contacter le Secrétariat"), p: l("Write to us and the Secretariat will get back to you.", "Écrivez-nous et le Secrétariat vous répondra.") }] },
};

const news = (t: L, i: L): Page => ({ eyebrow: l("Media", "Médias"), title: t, intro: i, img: "coop", sections: [] });
PAGES["media/news"] = { ...PAGES["media"]!, eyebrow: l("News", "Actualités") };
PAGES["media/events"] = news(l("Events", "Événements"), l("Upcoming workshops, webinars and conferences will be listed here.", "Les prochains ateliers, webinaires et conférences seront annoncés ici."));
PAGES["media/press"] = news(l("Press releases", "Communiqués de presse"), l("Official IAPA announcements will be published here.", "Les annonces officielles de l'AIPA seront publiées ici."));
PAGES["media/newsletter"] = news(l("IAPA Pulse archive", "Archives d'IAPA Pulse"), l("Past issues of our newsletter will be available here. Subscribe in the footer to receive the next one.", "Les anciens numéros de notre lettre seront disponibles ici. Abonnez-vous en bas de page pour recevoir le prochain."));
PAGES["media/documents"] = news(l("Key documents", "Documents clés"), l("Our Strategic Plan 2026–2030, brand guidelines and flyer will be downloadable here.", "Notre Plan stratégique 2026–2030, la charte graphique et la plaquette seront téléchargeables ici."));
