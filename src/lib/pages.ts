import type { Lang } from "./i18n";
type L = Record<Lang, string>;
const l = (en: string, fr: string): L => ({ en, fr });
export type Img = "hero" | "coop" | "processor" | "training" | "planting";
export type Section = {
  h: L;
  p?: L;
  items?: [L, L, string[]?][];
  list?: L[];
  tags?: string[];
  steps?: [L, L][];
  rows?: [L, string][];
  note?: L;
  feature?: Img;
  icons?: boolean;
  regions?: boolean;
  logoGrid?: boolean;
  /** Render the section body (paragraph, list or tags) as cards. */
  cards?: boolean;
  /** Center the heading and show a sub-heading under it. */
  centered?: boolean;
  sub?: L;
};
export type BlockKind =
  | "team"
  | "testimonials"
  | "resources"
  | "events"
  | "news"
  | "press"
  | "vacancies"
  | "scholarships"
  | "faqs";
export type Block = { kind: BlockKind; h?: L; filter?: [string, string]; empty?: L };
export type Page = {
  eyebrow: L;
  title: L;
  intro: L;
  img: Img;
  sections: Section[];
  stats?: [string, L, L?][];
  /** Render the stats as the homepage impact cards (cut corner, leaf fill). */
  statsCards?: boolean;
  cta?: { label: L; slug: string };
  blocks?: Block[];
  draft?: boolean;
  narrowIntro?: boolean;
};

const join = { label: l("Become a member", "Devenir membre"), slug: "join" };
const contact = { label: l("Work with us", "Travailler avec nous"), slug: "work-with-us" };

const approach = (
  name: string,
  frName: string,
  en: string,
  fr: string,
  who: L,
  img: Img,
): Page => ({
  eyebrow: l("Training approach", "Approche de formation"),
  title: l(name, frName),
  intro: l(en, fr),
  img,
  sections: [
    { h: l("Who it is for", "À qui s'adresse-t-elle"), p: who },
    {
      h: l("How it is delivered", "Comment elle est dispensée"),
      items: [
        [
          l("Training of Trainers", "Formation de formateurs"),
          l(
            "Certified IAPA Master Trainers train and coach local trainers.",
            "Des Master Trainers certifiés de l'AIPA forment et accompagnent des formateurs locaux.",
          ),
        ],
        [
          l("Practical sessions", "Séances pratiques"),
          l(
            "Adult-centred, participatory modules using manuals, posters and Excel tools.",
            "Modules participatifs centrés sur l'adulte, avec manuels, posters et outils Excel.",
          ),
        ],
        [
          l("Supervision & reporting", "Supervision et rapports"),
          l(
            "Quality assurance, follow-up visits and results reporting for partners.",
            "Assurance qualité, visites de suivi et rapports de résultats pour les partenaires.",
          ),
        ],
      ],
    },
    {
      h: l("Inclusion and climate", "Inclusion et climat"),
      p: l(
        "Every curriculum integrates women, youth and persons with disabilities, and promotes climate-smart practices.",
        "Chaque curriculum intègre les femmes, les jeunes et les personnes en situation de handicap, et promeut des pratiques climato-intelligentes.",
      ),
    },
  ],
  cta: contact,
});

export const PAGES: Record<string, Page> = {
  "who-we-are": {
    eyebrow: l("Who we are", "Qui sommes-nous"),
    title: l(
      "A pan-African body of agribusiness\npractitioners",
      "Un organisme panafricain de praticiens\nde l'agribusiness",
    ),
    img: "planting",
    narrowIntro: true,
    intro: l(
      "IAPA was founded in September 2023 in South Africa and is registered in Accra, Ghana. Initiated under the Agri-Business Facility for Africa (ABF), implemented by GIZ, it brings together Master Trainers and value chain experts from more than 20 countries.",
      "L'AIPA a été fondée en septembre 2023 en Afrique du Sud et est enregistrée à Accra, au Ghana. Initiée dans le cadre de l'Agri-Business Facility for Africa (ABF), mise en œuvre par la GIZ, elle réunit des Master Trainers et des experts des chaînes de valeur de plus de 20 pays.",
    ),
    sections: [
      {
        h: l("Our mission", "Notre mission"),
        feature: "coop",
        p: l(
          "Through a strong community of agribusiness professionals, we improve the livelihoods of agricultural value chain actors and strengthen their climate resilience.",
          "Grâce à une communauté solide de professionnels de l'agribusiness, nous améliorons les moyens de subsistance des acteurs des chaînes de valeur agricoles et renforçons leur résilience climatique.",
        ),
      },
      {
        h: l("Our values", "Nos valeurs"),
        icons: true,
        items: [
          [
            l("Synergy", "Synergie"),
            l(
              "We combine our members' expertise to achieve more together.",
              "Nous combinons l'expertise de nos membres pour accomplir plus ensemble.",
            ),
          ],
          [
            l("Inclusion", "Inclusion"),
            l(
              "Women, youth and persons with disabilities are at the centre of our work.",
              "Les femmes, les jeunes et les personnes en situation de handicap sont au cœur de notre action.",
            ),
          ],
          [
            l("Solidarity", "Solidarité"),
            l(
              "Experienced members mentor and support the next generation of practitioners.",
              "Les membres expérimentés accompagnent la nouvelle génération de praticiens.",
            ),
          ],
        ],
      },
    ],
    cta: join,
  },
  "who-we-are/leadership": {
    eyebrow: l("Leadership", "Direction"),
    title: l("The people steering IAPA", "Les personnes qui pilotent l'AIPA"),
    img: "training",
    intro: l(
      "IAPA is led by an elected Board and a Secretariat, supported by Regional and National Focal Points across Africa.",
      "L'AIPA est dirigée par un Conseil élu et un Secrétariat, appuyés par des Points focaux régionaux et nationaux à travers l'Afrique.",
    ),
    sections: [
      {
        h: l("Leadership structure", "Structure de direction"),
        items: [
          [
            l("Board of Directors", "Conseil d'administration"),
            l(
              "Sets strategy, oversees governance and represents the association.",
              "Définit la stratégie, supervise la gouvernance et représente l'association.",
            ),
          ],
          [
            l("Secretariat", "Secrétariat"),
            l(
              "Runs daily operations, partnerships, finance and communication.",
              "Assure les opérations quotidiennes, les partenariats, les finances et la communication.",
            ),
          ],
          [
            l("Regional Focal Points", "Points focaux régionaux"),
            l(
              "Coordinate members and activities across the five African regions.",
              "Coordonnent les membres et les activités dans les cinq régions africaines.",
            ),
          ],
          [
            l("National Focal Points", "Points focaux nationaux"),
            l(
              "Represent IAPA in each member country.",
              "Représentent l'AIPA dans chaque pays membre.",
            ),
          ],
        ],
      },
    ],
  },
  "who-we-are/governance": {
    eyebrow: l("Governance", "Gouvernance"),
    title: l(
      "Transparent, member-driven governance",
      "Une gouvernance transparente et portée par les membres",
    ),
    img: "coop",
    intro: l(
      "IAPA is a registered association accountable to its members through its General Assembly and constitution.",
      "L'AIPA est une association enregistrée, redevable envers ses membres à travers son Assemblée générale et ses statuts.",
    ),
    sections: [
      {
        h: l("Governing bodies", "Organes de gouvernance"),
        items: [
          [
            l("General Assembly", "Assemblée générale"),
            l(
              "All members; elects the Board and approves strategy and accounts.",
              "Tous les membres ; élit le Conseil et approuve la stratégie et les comptes.",
            ),
          ],
          [
            l("Board", "Conseil"),
            l(
              "Provides strategic direction and oversight of the Secretariat.",
              "Assure l'orientation stratégique et la supervision du Secrétariat.",
            ),
          ],
          [
            l("Strategic Plan 2026–2030", "Plan stratégique 2026–2030"),
            l(
              "Guides our growth toward 40 countries and 1M+ farmers and entrepreneurs trained.",
              "Guide notre croissance vers 40 pays et plus d'un million d'agriculteurs et entrepreneurs formés.",
            ),
          ],
        ],
      },
    ],
  },
  "who-we-are/partners": {
    eyebrow: l("Partners & funders", "Partenaires et bailleurs"),
    title: l(
      "Working with those who invest in Africa's farmers",
      "Aux côtés de ceux qui investissent dans les agriculteurs africains",
    ),
    img: "processor",
    intro: l(
      "Our approaches were developed over 10+ years with ABF-GIZ. Today we partner with development agencies, governments and the private sector.",
      "Nos approches ont été développées pendant plus de 10 ans avec l'ABF-GIZ. Aujourd'hui, nous collaborons avec des agences de développement, des gouvernements et le secteur privé.",
    ),
    sections: [
      {
        h: l("Our partners", "Nos partenaires"),
        logoGrid: true,
        items: [
          [
            l("Founding partner", "Partenaire fondateur"),
            l(
              "Agri-Business Facility for Africa, where IAPA was initiated.",
              "Agri-Business Facility for Africa, où l'AIPA a été initiée.",
            ),
            ["abf"],
          ],
          [
            l("Development cooperation", "Coopération au développement"),
            l("German development cooperation.", "Coopération allemande au développement."),
            ["giz"],
          ],
          [
            l("Co-funder", "Cofinanceur"),
            l(
              "Co-funder of agribusiness programmes.",
              "Cofinanceur de programmes d'agribusiness.",
            ),
            ["european-union"],
          ],
          [
            l("Co-funder", "Cofinanceur"),
            l(
              "Co-funder of agribusiness programmes.",
              "Cofinanceur de programmes d'agribusiness.",
            ),
            ["oacps"],
          ],
          [
            l("Institutional support", "Appui institutionnel"),
            l(
              "Support on institutional strategy and resource mobilisation.",
              "Appui à la stratégie institutionnelle et à la mobilisation des ressources.",
            ),
            ["acbf"],
          ],
          [
            l("Programme partner", "Partenaire de programme"),
            l("Programme and training partner.", "Partenaire de programmes et de formation."),
            ["comcashew"],
          ],
          [
            l("Training partner", "Partenaire de formation"),
            l("Programme and training partner.", "Partenaire de programmes et de formation."),
            ["africa-agribusiness-academy"],
          ],
        ],
      },
    ],
    cta: contact,
  },
  "who-we-are/where-we-work": {
    eyebrow: l("Where we work", "Où nous travaillons"),
    title: l("Five regions, one network", "Cinq régions, un réseau"),
    img: "hero",
    intro: l(
      "Every region has a Regional Focal Point and every country a National Focal Point.",
      "Chaque région a un Point focal régional et chaque pays un Point focal national.",
    ),
    sections: [{ h: l("Our regions", "Nos régions"), regions: true }],
  },
  "our-work": {
    eyebrow: l("Our work", "Nos activités"),
    title: l(
      "Advisory, curricula, training and events",
      "Conseil, curricula, formation et événements",
    ),
    img: "processor",
    intro: l(
      "We help partners choose the right value chain solutions and deliver them at scale through certified trainers.",
      "Nous aidons les partenaires à choisir les bonnes solutions de chaînes de valeur et à les déployer à grande échelle grâce à des formateurs certifiés.",
    ),
    sections: [
      {
        h: l("What we offer", "Ce que nous offrons"),
        items: [
          [
            l("Strategic advisory", "Conseil stratégique"),
            l(
              "Value chain selection and agribusiness solution design.",
              "Choix des chaînes de valeur et conception de solutions d'agribusiness.",
            ),
          ],
          [
            l("Curriculum development", "Développement de curricula"),
            l(
              "Manuals, trainers' guides, posters and digital tools.",
              "Manuels, guides de formateurs, posters et outils numériques.",
            ),
          ],
          [
            l("Quality training", "Formation de qualité"),
            l(
              "Pilots, Training of Trainers, supervision and reporting.",
              "Pilotes, formation de formateurs, supervision et rapports.",
            ),
          ],
          [
            l("Events", "Événements"),
            l(
              "Workshops, conferences and knowledge-sharing platforms.",
              "Ateliers, conférences et plateformes d'échange.",
            ),
          ],
        ],
      },
    ],
    cta: contact,
  },
  "our-work/impact-map": {
    eyebrow: l("Impact map", "Carte d'impact"),
    title: l("Our footprint across Africa", "Notre présence en Afrique"),
    img: "hero",
    intro: l(
      "Explore IAPA’s member network across five African regions, with country locations from the supplied regional list.",
      "Découvrez le réseau de membres de l’AIPA dans cinq régions africaines, avec les pays de la liste régionale fournie.",
    ),
    stats: [
      ["20+", l("Countries", "Pays")],
      ["5", l("Regions", "Régions")],
      ["75+", l("Master Trainers", "Master Trainers")],
    ],
    sections: [],
  },
  "our-work/numbers": {
    eyebrow: l("IAPA in numbers", "L'AIPA en chiffres"),
    title: l("A growing continental network", "Un réseau continental en croissance"),
    img: "training",
    intro: l(
      "Where we are today, and where we aim to be by 2030.",
      "Où nous en sommes aujourd'hui, et où nous voulons être en 2030.",
    ),
    stats: [
      [
        "20+",
        l("Countries today", "Pays aujourd'hui"),
        l(
          "Members active across all five regions of the continent.",
          "Des membres actifs dans les cinq régions du continent.",
        ),
      ],
      [
        "75+",
        l("Master Trainers", "Master Trainers"),
        l(
          "Certified experts training agribusiness practitioners.",
          "Des experts certifiés qui forment les praticiens de l'agribusiness.",
        ),
      ],
      [
        "63",
        l("Founding members", "Membres fondateurs"),
        l(
          "Organisations that launched IAPA in 2023.",
          "Les organisations qui ont lancé l'AIPA en 2023.",
        ),
      ],
      [
        "40",
        l("Countries by 2030", "Pays d'ici 2030"),
        l(
          "Doubling our footprint across Africa.",
          "Une présence qui double à l'échelle africaine.",
        ),
      ],
      [
        "860",
        l("New trainers by 2030", "Nouveaux formateurs d'ici 2030"),
        l(
          "Growing the next generation of Master Trainers.",
          "Former la prochaine génération de Master Trainers.",
        ),
      ],
      [
        "1M+",
        l("Farmers trained by 2030", "Agriculteurs formés d'ici 2030"),
        l(
          "Practical skills reaching farms at scale.",
          "Des compétences pratiques qui atteignent les fermes à grande échelle.",
        ),
      ],
    ],
    statsCards: true,
    sections: [],
  },
  "our-work/stories": {
    eyebrow: l("Stories", "Histoires"),
    title: l(
      "Change, told by the people who live it",
      "Le changement, raconté par ceux qui le vivent",
    ),
    img: "coop",
    intro: l(
      "Stories from farmers, cooperatives and processors trained by IAPA members will be published here.",
      "Les histoires d'agriculteurs, de coopératives et de transformateurs formés par les membres de l'AIPA seront publiées ici.",
    ),
    sections: [],
  },
  "our-work/testimonials": {
    eyebrow: l("Testimonials", "Témoignages"),
    title: l("What partners and members say", "Ce que disent partenaires et membres"),
    img: "training",
    intro: l(
      "Testimonials from partners, trainers and participants are being collected.",
      "Les témoignages de partenaires, formateurs et participants sont en cours de collecte.",
    ),
    sections: [],
  },
  training: {
    eyebrow: l("Training", "Formation"),
    title: l(
      "Certified, practical, adult-centred training",
      "Une formation certifiée, pratique et centrée sur l'adulte",
    ),
    img: "training",
    intro: l(
      "Six proven approaches, delivered by certified Master Trainers in online, residential, blended and tailor-made formats.",
      "Six approches éprouvées, dispensées par des Master Trainers certifiés en formats en ligne, résidentiel, hybride et sur mesure.",
    ),
    sections: [
      {
        h: l("Our approaches", "Nos approches"),
        items: [
          [
            l("Farmer Business School", "École d'entrepreneuriat agricole"),
            l(
              "Farming as a business for smallholders.",
              "L'agriculture comme une entreprise pour les petits producteurs.",
            ),
          ],
          [
            l("Cooperative Business School", "École d'entrepreneuriat coopératif"),
            l(
              "Stronger, well-managed cooperatives.",
              "Des coopératives plus solides et mieux gérées.",
            ),
          ],
          [
            l("Processor Business School", "École d'entrepreneuriat des transformateurs"),
            l(
              "Growth for small processing enterprises.",
              "La croissance des petites entreprises de transformation.",
            ),
          ],
          [
            l("Aquaculture Business School", "École d'entrepreneuriat aquacole"),
            l("Profitable, sustainable fish farming.", "Une pisciculture rentable et durable."),
          ],
          [
            l("Inclusive Contract Farming", "Agriculture contractuelle inclusive"),
            l(
              "Fair partnerships between producers and buyers.",
              "Des partenariats équitables entre producteurs et acheteurs.",
            ),
          ],
          [
            l("Good Agricultural Practices", "Bonnes pratiques agricoles"),
            l(
              "Higher yields, quality and climate resilience.",
              "Rendements, qualité et résilience climatique accrus.",
            ),
          ],
        ],
      },
    ],
    cta: contact,
  },
  "training/fbs": approach(
    "Farmer Business School",
    "École d'entrepreneuriat agricole",
    "FBS helps smallholder farmers see their farm as a business: planning, costs, profit and access to markets and finance.",
    "La FBS aide les petits producteurs à considérer leur exploitation comme une entreprise : planification, coûts, bénéfices et accès aux marchés et au financement.",
    l(
      "Smallholder farmers and farmer groups.",
      "Petits producteurs et groupements de producteurs.",
    ),
    "hero",
  ),
  "training/cbs": approach(
    "Cooperative Business School",
    "École d'entrepreneuriat coopératif",
    "CBS strengthens the governance, management and business services of farmer cooperatives.",
    "La CBS renforce la gouvernance, la gestion et les services économiques des coopératives agricoles.",
    l(
      "Cooperative leaders, managers and members.",
      "Dirigeants, gestionnaires et membres de coopératives.",
    ),
    "coop",
  ),
  "training/pbs": approach(
    "Processor Business School",
    "École d'entrepreneuriat des transformateurs",
    "PBS supports small and medium processors to improve quality, efficiency and profitability.",
    "La PBS accompagne les petits et moyens transformateurs pour améliorer qualité, efficacité et rentabilité.",
    l(
      "Owners and staff of agro-processing enterprises.",
      "Propriétaires et employés d'entreprises agroalimentaires.",
    ),
    "processor",
  ),
  "training/abs": approach(
    "Aquaculture Business School",
    "École d'entrepreneuriat aquacole",
    "ABS equips fish farmers with business and technical skills for profitable, sustainable aquaculture.",
    "L'ABS dote les pisciculteurs de compétences techniques et entrepreneuriales pour une aquaculture rentable et durable.",
    l("Fish farmers and aquaculture entrepreneurs.", "Pisciculteurs et entrepreneurs aquacoles."),
    "hero",
  ),
  "training/icf": approach(
    "Inclusive Contract Farming",
    "Agriculture contractuelle inclusive",
    "Our contract farming approach builds fair, lasting business relationships between producers and buyers.",
    "Notre approche d'agriculture contractuelle construit des relations commerciales équitables et durables entre producteurs et acheteurs.",
    l(
      "Producer organisations, buyers and processors.",
      "Organisations de producteurs, acheteurs et transformateurs.",
    ),
    "coop",
  ),
  "training/gap": approach(
    "Good Agricultural Practices",
    "Bonnes pratiques agricoles",
    "GAP training improves yields, product quality and food safety while protecting the environment.",
    "La formation aux BPA améliore les rendements, la qualité et la sécurité sanitaire tout en protégeant l'environnement.",
    l(
      "Farmers, extension agents and lead farmers.",
      "Agriculteurs, agents de vulgarisation et producteurs relais.",
    ),
    "training",
  ),
  "training/formats": {
    eyebrow: l("Formats", "Formats"),
    title: l("Learning that fits your context", "Un apprentissage adapté à votre contexte"),
    img: "training",
    intro: l(
      "We deliver our training in the format that best suits participants and partners.",
      "Nous dispensons nos formations dans le format le plus adapté aux participants et partenaires.",
    ),
    sections: [
      {
        h: l("Available formats", "Formats disponibles"),
        items: [
          [
            l("Online courses", "Cours en ligne"),
            l(
              "Self-paced and live virtual sessions.",
              "Sessions virtuelles en autonomie ou en direct.",
            ),
          ],
          [
            l("Residential programmes", "Programmes résidentiels"),
            l(
              "Intensive, in-person training and certification.",
              "Formation et certification intensives en présentiel.",
            ),
          ],
          [
            l("Blended courses", "Cours hybrides"),
            l(
              "Online learning combined with field practice.",
              "Apprentissage en ligne combiné à la pratique sur le terrain.",
            ),
          ],
          [
            l("Tailor-made programmes", "Programmes sur mesure"),
            l(
              "Designed with partners for a specific value chain or country.",
              "Conçus avec les partenaires pour une chaîne de valeur ou un pays.",
            ),
          ],
        ],
      },
    ],
    cta: contact,
  },
  "knowledge-hub": {
    eyebrow: l("Knowledge Hub", "Centre de savoirs"),
    title: l("Evidence, tools and learning", "Données, outils et apprentissages"),
    img: "processor",
    intro: l(
      "Publications, policy briefs, case studies, webinars and podcasts from practitioners across Africa. Our library is being built.",
      "Publications, notes de politique, études de cas, webinaires et podcasts de praticiens à travers l'Afrique. Notre bibliothèque est en construction.",
    ),
    sections: [
      {
        h: l("Coming to the hub", "Bientôt dans le centre"),
        items: [
          [
            l("Publications & research", "Publications et recherche"),
            l("Reports, papers and policy briefs.", "Rapports, articles et notes de politique."),
          ],
          [
            l("Case studies", "Études de cas"),
            l(
              "Lessons from IAPA projects in the field.",
              "Leçons tirées des projets de l'AIPA sur le terrain.",
            ),
          ],
          [
            l("Webinars & podcasts", "Webinaires et podcasts"),
            l(
              "Recordings and conversations with experts.",
              "Enregistrements et échanges avec des experts.",
            ),
          ],
        ],
      },
    ],
  },
  media: {
    eyebrow: l("Media", "Médias"),
    title: l("News, events and IAPA Pulse", "Actualités, événements et IAPA Pulse"),
    img: "coop",
    intro: l(
      "Follow what's happening across the IAPA network.",
      "Suivez l'actualité du réseau de l'AIPA.",
    ),
    sections: [
      {
        h: l("Latest", "À la une"),
        items: [
          [
            l(
              "June 2026 — Registration signed in Ghana",
              "Juin 2026 — Enregistrement signé au Ghana",
            ),
            l(
              "The President and our Ghana focal point signed IAPA's registration documents on 2 June 2026.",
              "Le Président et notre point focal au Ghana ont signé les documents d'enregistrement de l'AIPA le 2 juin 2026.",
            ),
          ],
          [
            l("May 2026 — Strategic workshop in Kenya", "Mai 2026 — Atelier stratégique au Kenya"),
            l(
              "Three days with ABF-GIZ and ACBF on governance, business model and sustainability.",
              "Trois jours avec l'ABF-GIZ et l'ACBF sur la gouvernance, le modèle économique et la durabilité.",
            ),
          ],
          [
            l("June 2026 — Strategies completed", "Juin 2026 — Stratégies finalisées"),
            l(
              "Institutional, resource mobilisation and communication strategies are complete.",
              "Les stratégies institutionnelle, de mobilisation des ressources et de communication sont finalisées.",
            ),
          ],
        ],
      },
    ],
  },
  join: {
    eyebrow: l("Membership", "Adhésion"),
    title: l(
      "Join Africa's agribusiness practitioners",
      "Rejoignez les praticiens de l'agribusiness africain",
    ),
    img: "training",
    intro: l(
      "Membership is open to Master Trainers, trainers and value chain experts committed to inclusive agribusiness.",
      "L'adhésion est ouverte aux Master Trainers, formateurs et experts des chaînes de valeur engagés pour un agribusiness inclusif.",
    ),
    sections: [
      {
        h: l("Member benefits", "Avantages des membres"),
        items: [
          [
            l("Capacity building & certification", "Renforcement des capacités et certification"),
            l(
              "Professional development and certification programmes.",
              "Développement professionnel et programmes de certification.",
            ),
          ],
          [
            l("Coaching & mentorship", "Coaching et mentorat"),
            l(
              "Peer-to-peer learning with experienced Master Trainers.",
              "Apprentissage entre pairs avec des Master Trainers expérimentés.",
            ),
          ],
          [
            l("Visibility", "Visibilité"),
            l(
              "Your profile showcased to partners and clients.",
              "Votre profil présenté aux partenaires et clients.",
            ),
          ],
          [
            l("Assignments", "Missions"),
            l(
              "Access to consultancy and career opportunities across Africa.",
              "Accès à des missions de conseil et à des opportunités de carrière en Afrique.",
            ),
          ],
        ],
      },
    ],
    cta: contact,
  },
  "join/vacancies": {
    eyebrow: l("Vacancies", "Offres d'emploi"),
    title: l("Work with IAPA", "Travailler avec l'AIPA"),
    img: "processor",
    intro: l(
      "There are no open positions right now. New roles and consultancy calls will be posted here.",
      "Aucun poste n'est ouvert actuellement. Les nouveaux postes et appels à consultance seront publiés ici.",
    ),
    sections: [],
    cta: join,
  },
  "join/scholarships": {
    eyebrow: l("Scholarships", "Bourses"),
    title: l("Support to grow your skills", "Un soutien pour développer vos compétences"),
    img: "training",
    intro: l(
      "Scholarship opportunities for trainers, including women and young professionals, will be announced here.",
      "Les opportunités de bourses pour les formateurs, notamment les femmes et les jeunes professionnels, seront annoncées ici.",
    ),
    sections: [],
    cta: join,
  },
  "work-with-us": {
    eyebrow: l("Work with us", "Travailler avec nous"),
    title: l("Let's strengthen value chains together", "Renforçons ensemble les chaînes de valeur"),
    img: "coop",
    intro: l(
      "Development partners, governments and companies work with IAPA for advisory, curricula, certified training and events.",
      "Partenaires au développement, gouvernements et entreprises collaborent avec l'AIPA pour le conseil, les curricula, la formation certifiée et les événements.",
    ),
    sections: [
      {
        h: l("How to engage", "Comment collaborer"),
        items: [
          [
            l("Commission a training", "Commander une formation"),
            l(
              "Pilots, ToT and scale-up with our Master Trainers.",
              "Pilotes, formation de formateurs et passage à l'échelle avec nos Master Trainers.",
            ),
          ],
          [
            l("Co-develop a curriculum", "Co-développer un curriculum"),
            l(
              "Adapted to your value chain and country.",
              "Adapté à votre chaîne de valeur et à votre pays.",
            ),
          ],
          [
            l("Partner on an event", "S'associer à un événement"),
            l(
              "Workshops, conferences and learning platforms.",
              "Ateliers, conférences et plateformes d'apprentissage.",
            ),
          ],
        ],
      },
      {
        h: l("Contact the Secretariat", "Contacter le Secrétariat"),
        p: l(
          "Write to us and the Secretariat will get back to you.",
          "Écrivez-nous et le Secrétariat vous répondra.",
        ),
      },
    ],
  },
};

const news = (t: L, i: L): Page => ({
  eyebrow: l("Media", "Médias"),
  title: t,
  intro: i,
  img: "coop",
  sections: [],
});
PAGES["media/news"] = { ...PAGES["media"]!, eyebrow: l("News", "Actualités") };
PAGES["media/events"] = news(
  l("Events", "Événements"),
  l(
    "Upcoming workshops, webinars and conferences will be listed here.",
    "Les prochains ateliers, webinaires et conférences seront annoncés ici.",
  ),
);
PAGES["media/press"] = news(
  l("Press releases", "Communiqués de presse"),
  l(
    "Official IAPA announcements will be published here.",
    "Les annonces officielles de l'AIPA seront publiées ici.",
  ),
);
PAGES["media/newsletter"] = news(
  l("IAPA Pulse archive", "Archives d'IAPA Pulse"),
  l(
    "Past issues of our newsletter will be available here. Subscribe in the footer to receive the next one.",
    "Les anciens numéros de notre lettre seront disponibles ici. Abonnez-vous en bas de page pour recevoir le prochain.",
  ),
);
PAGES["media/documents"] = news(
  l("Key documents", "Documents clés"),
  l(
    "Our Strategic Plan 2026–2030, brand guidelines and flyer will be downloadable here.",
    "Notre Plan stratégique 2026–2030, la charte graphique et la plaquette seront téléchargeables ici.",
  ),
);

/* ───────────── Placeholder content for client review ───────────── */
const R = "";
const FR = "";
/** Descriptive placeholder copy. */
const r = (en: string, fr: string): L => ({ en: en + R, fr: fr + R + FR });
/** Translated label/heading. */
const f = (en: string, fr: string): L => ({ en, fr: fr + FR });
const pulseEmpty = (en: string, fr: string): L => ({ en, fr: fr + FR });
const requestTraining = {
  label: l("Request this training", "Demander cette formation"),
  slug: "work-with-us",
};

type Approach = {
  code: string;
  name: L;
  what: L;
  who: L;
  learn: L[];
  delivery?: L;
  chains?: string[];
};
const defaultDelivery = r(
  "Short, participatory sessions led by certified trainers and supervised by Master Trainers.",
  "Des séances courtes et participatives animées par des formateurs certifiés et supervisées par des Master Trainers.",
);
const approachPage = (a: Approach, img: Img): Page => ({
  eyebrow: l("Training approach", "Approche de formation"),
  title: a.name,
  intro: a.what,
  img,
  sections: [
    { h: l("What it is", "De quoi s'agit-il"), p: a.what, cards: true },
    { h: l("Who it's for", "À qui s'adresse-t-elle"), p: a.who, cards: true },
    {
      h: l("What participants learn", "Ce que les participants apprennent"),
      list: a.learn,
      cards: true,
    },
    {
      h: l("How it's delivered", "Comment elle est dispensée"),
      p: a.delivery ?? defaultDelivery,
      cards: true,
    },
    ...(a.chains
      ? [
          {
            h: l("Value chains", "Chaînes de valeur"),
            sub: l(
              "The value chains where this approach is applied.",
              "Les chaînes de valeur où cette approche est appliquée.",
            ),
            tags: a.chains,
            cards: true,
            centered: true,
          },
        ]
      : []),
  ],
  blocks: [
    {
      kind: "news",
      h: l("Related stories", "Histoires liées"),
      filter: ["approach", a.code],
      empty: pulseEmpty(
        "Related stories will appear here.",
        "Les histoires liées apparaîtront ici.",
      ),
    },
  ],
  cta: requestTraining,
});

Object.assign(PAGES, {
  "who-we-are/leadership": {
    eyebrow: l("Leadership", "Direction"),
    title: l("The people steering IAPA", "Les personnes qui pilotent l'AIPA"),
    img: "training",
    intro: f(
      "IAPA is led by volunteer professionals elected by its members — experienced Master Trainers and agribusiness practitioners from across Africa's five regions.",
      "L'AIPA est dirigée par des professionnels bénévoles élus par ses membres — des Master Trainers expérimentés et des praticiens de l'agribusiness des cinq régions d'Afrique.",
    ),
    sections: [],
    blocks: [
      {
        kind: "team",
        h: l("Board of Directors", "Conseil d'administration"),
        filter: ["group_key", "board"],
      },
      {
        kind: "team",
        h: l("Supervisory Board", "Conseil de surveillance"),
        filter: ["group_key", "supervisory"],
      },
      {
        kind: "team",
        h: l("Executive Secretariat", "Secrétariat exécutif"),
        filter: ["group_key", "secretariat"],
      },
    ],
  },
  training: {
    eyebrow: l("Training", "Formation"),
    title: l(
      "Certified, practical, adult-centred training",
      "Une formation certifiée, pratique et centrée sur l'adulte",
    ),
    img: "training",
    intro: l(
      "Six proven approaches, delivered by certified Master Trainers in online, residential, blended and tailor-made formats.",
      "Six approches éprouvées, dispensées par des Master Trainers certifiés en ligne, en résidentiel, en hybride et sur mesure.",
    ),
    sections: [
      {
        h: l("Training formats", "Formats de formation"),
        items: [
          [
            l("Online", "En ligne"),
            r(
              "Self-paced and live virtual courses, designed to work on low bandwidth.",
              "Cours virtuels en autonomie ou en direct, conçus pour fonctionner avec une faible connexion.",
            ),
          ],
          [
            l("Residential", "Résidentiel"),
            r(
              "Intensive in-person programmes for trainers and practitioners.",
              "Programmes intensifs en présentiel pour formateurs et praticiens.",
            ),
          ],
          [
            l("Blended", "Hybride"),
            r(
              "Online learning combined with in-person practice and coaching.",
              "Apprentissage en ligne combiné à la pratique en présentiel et au coaching.",
            ),
          ],
          [
            l("Tailor-made", "Sur mesure"),
            r(
              "Programmes adapted to a partner's value chain, target group and context.",
              "Programmes adaptés à la chaîne de valeur, au public cible et au contexte d'un partenaire.",
            ),
          ],
        ],
      },
      {
        h: l("Certification pathway", "Parcours de certification"),
        steps: [
          [
            l("Trainer", "Formateur"),
            f(
              "Completes the Training of Trainers in an IAPA approach.",
              "Suit la formation de formateurs dans une approche de l'AIPA.",
            ),
          ],
          [
            l("Certified Trainer", "Formateur certifié"),
            f(
              "Delivers supervised trainings and meets the quality standards.",
              "Dispense des formations supervisées et respecte les normes de qualité.",
            ),
          ],
          [
            l("Master Trainer", "Master Trainer"),
            f(
              "Trains and coaches new trainers and adapts training materials.",
              "Forme et accompagne de nouveaux formateurs et adapte les supports de formation.",
            ),
          ],
          [
            l("Supervisor / Coordinator", "Superviseur / Coordinateur"),
            f(
              "Oversees programmes and quality assurance.",
              "Supervise les programmes et l'assurance qualité.",
            ),
          ],
        ],
        note: l("[Client to confirm]", "[Client to confirm]"),
      },
    ],
    cta: contact,
  },
  "training/formats": {
    eyebrow: l("Formats", "Formats"),
    title: l("Learning that fits your context", "Un apprentissage adapté à votre contexte"),
    img: "training",
    intro: l(
      "We deliver our training in the format that best suits participants and partners.",
      "Nous dispensons nos formations dans le format le plus adapté aux participants et partenaires.",
    ),
    sections: [
      {
        h: l("Available formats", "Formats disponibles"),
        items: [
          [
            l("Online", "En ligne"),
            r(
              "Self-paced and live virtual courses, designed to work on low bandwidth.",
              "Cours virtuels en autonomie ou en direct, conçus pour fonctionner avec une faible connexion.",
            ),
          ],
          [
            l("Residential", "Résidentiel"),
            r(
              "Intensive in-person programmes for trainers and practitioners.",
              "Programmes intensifs en présentiel pour formateurs et praticiens.",
            ),
          ],
          [
            l("Blended", "Hybride"),
            r(
              "Online learning combined with in-person practice and coaching.",
              "Apprentissage en ligne combiné à la pratique en présentiel et au coaching.",
            ),
          ],
          [
            l("Tailor-made", "Sur mesure"),
            r(
              "Programmes adapted to a partner's value chain, target group and context.",
              "Programmes adaptés à la chaîne de valeur, au public cible et au contexte d'un partenaire.",
            ),
          ],
        ],
      },
    ],
    cta: contact,
  },
  "training/fbs": approachPage(
    {
      code: "FBS",
      name: l("Farmer Business School", "École d'entrepreneuriat agricole"),
      what: r(
        "A practical, adult-learning training that helps smallholder farmers see their farm as a business: planning production, understanding costs and profits, and making informed investment decisions.",
        "Une formation pratique, fondée sur l'apprentissage des adultes, qui aide les petits producteurs à considérer leur exploitation comme une entreprise : planifier la production, comprendre les coûts et les bénéfices, et prendre des décisions d'investissement éclairées.",
      ),
      who: r(
        "Smallholder farmers and farmer groups, plus the extension staff and trainers who support them.",
        "Les petits producteurs et groupements de producteurs, ainsi que les agents de vulgarisation et formateurs qui les accompagnent.",
      ),
      learn: [
        f(
          "Farm planning and record keeping",
          "Planification de l'exploitation et tenue des registres",
        ),
        f(
          "Calculating production costs and profits",
          "Calcul des coûts de production et des bénéfices",
        ),
        f("Comparing farm enterprises", "Comparaison des activités agricoles"),
        f(
          "Household and farm financial planning",
          "Planification financière du ménage et de l'exploitation",
        ),
        f(
          "Working together in producer groups",
          "Travailler ensemble en groupements de producteurs",
        ),
        f("Accessing finance and markets", "Accès au financement et aux marchés"),
      ],
      delivery: r(
        "Short, participatory sessions in the community, led by certified trainers and supervised by Master Trainers.",
        "Des séances courtes et participatives au sein de la communauté, animées par des formateurs certifiés et supervisées par des Master Trainers.",
      ),
      chains: ["Cocoa", "Coffee", "Maize", "Rice", "Dairy"],
    },
    "hero",
  ),
  "training/cbs": approachPage(
    {
      code: "CBS",
      name: l("Cooperative Business School", "École d'entrepreneuriat coopératif"),
      what: r(
        "A training that strengthens cooperatives and producer organisations as businesses, so they serve members better and trade more profitably.",
        "Une formation qui renforce les coopératives et organisations de producteurs en tant qu'entreprises, afin qu'elles servent mieux leurs membres et commercent de façon plus rentable.",
      ),
      who: r(
        "Cooperative leaders, managers and members, and farmer organisations.",
        "Les dirigeants, gestionnaires et membres de coopératives, ainsi que les organisations paysannes.",
      ),
      learn: [
        f("Cooperative governance and leadership", "Gouvernance et leadership coopératifs"),
        f("Business planning for cooperatives", "Plan d'affaires pour les coopératives"),
        f("Financial management and record keeping", "Gestion financière et tenue des registres"),
        f("Collective marketing", "Commercialisation collective"),
        f("Member services and loyalty", "Services aux membres et fidélisation"),
      ],
      chains: ["Onion", "Cashew", "Soybean", "Rice-fish", "Peanut"],
    },
    "coop",
  ),
  "training/pbs": approachPage(
    {
      code: "PBS",
      name: l("Processor Business School", "École d'entrepreneuriat des transformateurs"),
      what: r(
        "A training for small and medium agro-processors that builds the business skills they need to grow, improve quality and reach new markets.",
        "Une formation destinée aux petits et moyens transformateurs agroalimentaires, qui développe les compétences entrepreneuriales nécessaires pour croître, améliorer la qualité et atteindre de nouveaux marchés.",
      ),
      who: r(
        "Small and medium processors, women's processing groups and agro-processing entrepreneurs.",
        "Les petits et moyens transformateurs, les groupements de transformatrices et les entrepreneurs de l'agro-transformation.",
      ),
      learn: [
        f(
          "Costing and pricing processed products",
          "Calcul des coûts et fixation des prix des produits transformés",
        ),
        f("Quality and hygiene standards", "Normes de qualité et d'hygiène"),
        f("Marketing and packaging", "Marketing et emballage"),
        f("Business planning and access to finance", "Plan d'affaires et accès au financement"),
        f("Managing suppliers", "Gestion des fournisseurs"),
      ],
    },
    "processor",
  ),
  "training/abs": approachPage(
    {
      code: "ABS",
      name: l("Aquaculture Business School", "École d'entrepreneuriat aquacole"),
      what: r(
        "A training that helps fish farmers run profitable, sustainable aquaculture businesses.",
        "Une formation qui aide les pisciculteurs à gérer des entreprises aquacoles rentables et durables.",
      ),
      who: r(
        "Fish farmers, aquaculture groups and hatchery operators.",
        "Les pisciculteurs, les groupements aquacoles et les exploitants d'écloseries.",
      ),
      learn: [
        f("Planning a fish-farming business", "Planifier une entreprise piscicole"),
        f("Feed and production costs", "Coûts d'alimentation et de production"),
        f("Profitability and record keeping", "Rentabilité et tenue des registres"),
        f("Marketing fish products", "Commercialisation des produits halieutiques"),
        f("Sustainable practices", "Pratiques durables"),
      ],
    },
    "processor",
  ),
  "training/icf": approachPage(
    {
      code: "CF",
      name: l("Inclusive Contract Farming", "Agriculture contractuelle inclusive"),
      what: r(
        "An approach that builds fair, lasting business relationships between farmers and buyers, so both sides benefit from reliable supply and secure markets.",
        "Une approche qui établit des relations commerciales équitables et durables entre producteurs et acheteurs, afin que chacun bénéficie d'un approvisionnement fiable et de débouchés sûrs.",
      ),
      who: r(
        "Producer organisations, agribusiness companies, off-takers and processors.",
        "Les organisations de producteurs, les entreprises agroalimentaires, les acheteurs et les transformateurs.",
      ),
      learn: [
        f("Designing fair contracts", "Concevoir des contrats équitables"),
        f(
          "Building trust between farmers and buyers",
          "Instaurer la confiance entre producteurs et acheteurs",
        ),
        f("Pricing and quality agreements", "Accords sur les prix et la qualité"),
        f("Managing risk", "Gestion des risques"),
        f(
          "Including women and youth in supply chains",
          "Inclure les femmes et les jeunes dans les chaînes d'approvisionnement",
        ),
      ],
    },
    "coop",
  ),
  "training/gap": approachPage(
    {
      code: "GAP",
      name: l("Good Agricultural Practices", "Bonnes pratiques agricoles"),
      what: r(
        "Training in proven farming practices that raise yields and quality while protecting soils, water and the climate, including climate-smart practices.",
        "Une formation aux pratiques agricoles éprouvées qui augmentent les rendements et la qualité tout en protégeant les sols, l'eau et le climat, y compris les pratiques climato-intelligentes.",
      ),
      who: r(
        "Farmers, farmer groups and extension staff.",
        "Les agriculteurs, les groupements de producteurs et les agents de vulgarisation.",
      ),
      learn: [
        f("Improved crop and soil management", "Gestion améliorée des cultures et des sols"),
        f("Climate-smart techniques", "Techniques climato-intelligentes"),
        f("Safe input use", "Utilisation sûre des intrants"),
        f("Post-harvest handling", "Gestion post-récolte"),
        f("Meeting market quality standards", "Respect des normes de qualité du marché"),
      ],
    },
    "hero",
  ),
  join: {
    eyebrow: l("Membership", "Adhésion"),
    title: l(
      "Join Africa's agribusiness practitioners",
      "Rejoignez les praticiens de l'agribusiness africain",
    ),
    img: "training",
    intro: l(
      "Membership is open to Master Trainers, trainers and value chain experts committed to inclusive agribusiness.",
      "L'adhésion est ouverte aux Master Trainers, formateurs et experts des chaînes de valeur engagés pour un agribusiness inclusif.",
    ),
    sections: [
      {
        h: l("Who can join", "Qui peut adhérer"),
        items: [
          [
            l("Full Member", "Membre titulaire"),
            f(
              "Certified Master Trainers, trainers and supervisors who have completed an IAPA/ABF Master Trainer Programme.",
              "Master Trainers, formateurs et superviseurs certifiés ayant suivi un programme Master Trainer AIPA/ABF.",
            ),
          ],
          [
            l("Associate Member", "Membre associé"),
            f(
              "Agribusiness consultants and value chain experts who share IAPA's mission.",
              "Consultants en agribusiness et experts des chaînes de valeur qui partagent la mission de l'AIPA.",
            ),
          ],
          [
            l("Honorary Member", "Membre d'honneur"),
            f(
              "People recognised by the General Assembly for outstanding contributions.",
              "Personnes reconnues par l'Assemblée générale pour leur contribution exceptionnelle.",
            ),
          ],
        ],
        note: l("[Client to confirm categories]", "[Client to confirm categories]"),
      },
      {
        h: l("How to join", "Comment adhérer"),
        steps: [
          [l("Submit your application", "Soumettez votre candidature"), l("", "")],
          [l("Review by the Secretariat", "Examen par le Secrétariat"), l("", "")],
          [
            l(
              "Pay your application and registration fees",
              "Réglez les frais de candidature et d'inscription",
            ),
            l("", ""),
          ],
          [l("Welcome and onboarding", "Accueil et intégration"), l("", "")],
        ],
      },
      {
        h: l("Fees", "Cotisations"),
        rows: [
          [l("Application fee", "Frais de candidature"), "[Fee TBC]"],
          [l("Registration fee", "Frais d'inscription"), "[Fee TBC]"],
          [l("Annual subscription", "Cotisation annuelle"), "[Fee TBC]"],
        ],
        note: f(
          "Fees are confirmed by the General Assembly.",
          "Les cotisations sont confirmées par l'Assemblée générale.",
        ),
      },
      {
        h: l("Member benefits", "Avantages des membres"),
        items: [
          [
            l("Capacity building & certification", "Renforcement des capacités et certification"),
            l(
              "Professional development and certification programmes.",
              "Développement professionnel et programmes de certification.",
            ),
          ],
          [
            l("Coaching & mentorship", "Coaching et mentorat"),
            l(
              "Peer-to-peer learning with experienced Master Trainers.",
              "Apprentissage entre pairs avec des Master Trainers expérimentés.",
            ),
          ],
          [
            l("Visibility", "Visibilité"),
            l(
              "Your profile showcased to partners and clients.",
              "Votre profil présenté aux partenaires et clients.",
            ),
          ],
          [
            l("Assignments", "Missions"),
            l(
              "Access to consultancy and career opportunities across Africa.",
              "Accès à des missions de conseil et à des opportunités de carrière en Afrique.",
            ),
          ],
        ],
      },
      {
        h: l("Members in demand", "Des membres sollicités"),
        p: f(
          "Five IAPA Master Trainers from Nigeria, Ghana and Ethiopia were selected to coach the winners of an agribusiness competition run by the Agribusiness E-Academy.",
          "Cinq Master Trainers de l'AIPA venant du Nigeria, du Ghana et d'Éthiopie ont été sélectionnés pour accompagner les lauréats d'un concours agribusiness organisé par l'Agribusiness E-Academy.",
        ),
      },
    ],
    blocks: [
      {
        kind: "faqs",
        h: l("Membership FAQs", "FAQ sur l'adhésion"),
        filter: ["category", "membership"],
      },
    ],
    cta: contact,
  },
  "our-work/testimonials": {
    eyebrow: l("Testimonials", "Témoignages"),
    title: l("What partners and members say", "Ce que disent partenaires et membres"),
    img: "training",
    intro: l(
      "Voices from partners, trainers and the people they train.",
      "Les voix des partenaires, des formateurs et des personnes qu'ils forment.",
    ),
    sections: [],
    blocks: [
      {
        kind: "testimonials",
        empty: pulseEmpty(
          "Testimonials will be published here.",
          "Les témoignages seront publiés ici.",
        ),
      },
    ],
  },
  "our-work/stories": {
    eyebrow: l("Stories", "Histoires"),
    title: l(
      "Change, told by the people who live it",
      "Le changement, raconté par ceux qui le vivent",
    ),
    img: "coop",
    intro: l(
      "News and stories from across the IAPA network.",
      "Actualités et histoires du réseau de l'AIPA.",
    ),
    sections: [],
    blocks: [{ kind: "news", filter: ["kind", "news"] }],
  },
  "knowledge-hub": {
    eyebrow: l("Knowledge Hub", "Centre de savoirs"),
    title: l("Evidence, tools and learning", "Données, outils et apprentissages"),
    img: "processor",
    intro: l(
      "Publications, policy briefs, case studies, webinars and newsletters from practitioners across Africa.",
      "Publications, notes de politique, études de cas, webinaires et lettres d'information de praticiens à travers l'Afrique.",
    ),
    sections: [],
    blocks: [
      {
        kind: "resources",
        h: l("Library", "Bibliothèque"),
        empty: pulseEmpty(
          "Resources will be published here.",
          "Les ressources seront publiées ici.",
        ),
      },
    ],
  },
  media: {
    eyebrow: l("Media", "Médias"),
    title: l("News, events and IAPA Pulse", "Actualités, événements et IAPA Pulse"),
    img: "coop",
    intro: l(
      "Follow what's happening across the IAPA network.",
      "Suivez l'actualité du réseau de l'AIPA.",
    ),
    sections: [],
    blocks: [
      { kind: "news", h: l("Latest news", "Dernières actualités"), filter: ["kind", "news"] },
      {
        kind: "events",
        h: l("Upcoming events", "Événements à venir"),
        empty: pulseEmpty(
          "No upcoming events right now. Subscribe to IAPA Pulse to hear first.",
          "Aucun événement à venir pour le moment. Abonnez-vous à IAPA Pulse pour être informé en premier.",
        ),
      },
    ],
  },
  "media/news": {
    eyebrow: l("News", "Actualités"),
    title: l("News and stories", "Actualités et histoires"),
    img: "coop",
    intro: l(
      "The latest from IAPA and its members, drawn from IAPA Pulse.",
      "Les dernières nouvelles de l'AIPA et de ses membres, tirées d'IAPA Pulse.",
    ),
    sections: [],
    blocks: [{ kind: "news", filter: ["kind", "news"] }],
  },
  "media/events": {
    eyebrow: l("Events", "Événements"),
    title: l("Events", "Événements"),
    img: "training",
    intro: l(
      "Assemblies, webinars and trainings across the IAPA network.",
      "Assemblées, webinaires et formations au sein du réseau de l'AIPA.",
    ),
    sections: [],
    blocks: [
      {
        kind: "events",
        empty: pulseEmpty(
          "No upcoming events right now. Subscribe to IAPA Pulse to hear first.",
          "Aucun événement à venir pour le moment. Abonnez-vous à IAPA Pulse pour être informé en premier.",
        ),
      },
    ],
  },
  "media/press": {
    eyebrow: l("Press releases", "Communiqués de presse"),
    title: l("Press releases", "Communiqués de presse"),
    img: "processor",
    intro: l("Official announcements from IAPA.", "Annonces officielles de l'AIPA."),
    sections: [],
    blocks: [
      {
        kind: "press",
        filter: ["kind", "press"],
        empty: pulseEmpty("No press releases yet.", "Aucun communiqué pour le moment."),
      },
    ],
  },
  "media/newsletter": {
    eyebrow: l("Newsletter archive", "Archives de la lettre"),
    title: l("IAPA Pulse", "IAPA Pulse"),
    img: "coop",
    intro: l(
      "The official newsletter of the International Agribusiness Practitioners Association.",
      "La lettre officielle de l'Association internationale des praticiens de l'agribusiness.",
    ),
    sections: [],
    blocks: [{ kind: "resources", filter: ["type_en", "Newsletter"] }],
  },
  "join/vacancies": {
    eyebrow: l("Vacancies", "Offres d'emploi"),
    title: l("Work with IAPA", "Travailler avec l'AIPA"),
    img: "processor",
    intro: l(
      "New roles and consultancy calls will be posted here.",
      "Les nouveaux postes et appels à consultance seront publiés ici.",
    ),
    sections: [],
    blocks: [
      {
        kind: "vacancies",
        empty: pulseEmpty(
          "There are no open positions at the moment. Subscribe to IAPA Pulse to be notified of new opportunities.",
          "Aucun poste n'est ouvert pour le moment. Abonnez-vous à IAPA Pulse pour être informé des nouvelles opportunités.",
        ),
      },
    ],
  },
  "join/scholarships": {
    eyebrow: l("Scholarships", "Bourses"),
    title: l("Support to grow your skills", "Un soutien pour développer vos compétences"),
    img: "training",
    intro: l(
      "Scholarships for trainers, including women and young professionals.",
      "Des bourses pour les formateurs, notamment les femmes et les jeunes professionnels.",
    ),
    sections: [],
    blocks: [
      {
        kind: "scholarships",
        empty: pulseEmpty(
          "Scholarship opportunities will be announced here. Subscribe to IAPA Pulse to stay informed.",
          "Les opportunités de bourses seront annoncées ici. Abonnez-vous à IAPA Pulse pour rester informé.",
        ),
      },
    ],
  },
  faq: {
    eyebrow: l("FAQs", "FAQ"),
    title: l("Frequently asked questions", "Questions fréquentes"),
    img: "training",
    intro: l(
      "Answers to the questions partners and practitioners ask us most.",
      "Les réponses aux questions que partenaires et praticiens nous posent le plus.",
    ),
    sections: [],
    blocks: [
      { kind: "faqs", h: l("About IAPA", "À propos de l'AIPA"), filter: ["category", "about"] },
      { kind: "faqs", h: l("Services", "Services"), filter: ["category", "services"] },
      { kind: "faqs", h: l("Membership", "Adhésion"), filter: ["category", "membership"] },
    ],
  },
  privacy: {
    draft: true,
    eyebrow: l("Privacy policy", "Politique de confidentialité"),
    title: l("Privacy policy", "Politique de confidentialité"),
    img: "processor",
    intro: l("Last updated: [Date]", "Dernière mise à jour : [Date]"),
    sections: [
      {
        h: l("Data controller", "Responsable du traitement"),
        p: f(
          "The International Agribusiness Practitioners Association (IAPA), Accra, Ghana, is responsible for the personal data collected through this website. Contact: secretariatexecutif.iapa@gmail.com.",
          "L'Association internationale des praticiens de l'agribusiness (AIPA), Accra, Ghana, est responsable des données personnelles collectées sur ce site. Contact : secretariatexecutif.iapa@gmail.com.",
        ),
      },
      {
        h: l("Data we collect", "Données collectées"),
        list: [
          f(
            "Membership applications: name, contact details, country, professional background and certifications.",
            "Candidatures d'adhésion : nom, coordonnées, pays, parcours professionnel et certifications.",
          ),
          f(
            'Enquiries through "Work with us" and contact forms: name, organisation, email and your message.',
            "Demandes via « Travailler avec nous » et les formulaires de contact : nom, organisation, e-mail et message.",
          ),
          f(
            "Newsletter sign-up: your email address.",
            "Inscription à la lettre d'information : votre adresse e-mail.",
          ),
        ],
      },
      {
        h: l("Why we collect it", "Pourquoi nous les collectons"),
        p: f(
          "We use this data only to process membership applications, respond to enquiries, send IAPA Pulse and manage our relationship with members and partners. We do not sell personal data.",
          "Nous utilisons ces données uniquement pour traiter les candidatures, répondre aux demandes, envoyer IAPA Pulse et gérer notre relation avec membres et partenaires. Nous ne vendons pas de données personnelles.",
        ),
      },
      {
        h: l("How long we keep it", "Durée de conservation"),
        p: f(
          "Membership data is kept for the duration of membership plus [X] years. Enquiries are kept for [X] months. Newsletter data is kept until you unsubscribe.",
          "Les données d'adhésion sont conservées pendant la durée de l'adhésion plus [X] ans. Les demandes sont conservées [X] mois. Les données de la lettre sont conservées jusqu'à votre désinscription.",
        ),
      },
      {
        h: l("Cookies and analytics", "Cookies et mesure d'audience"),
        p: f(
          "This website uses only the cookies needed for it to work and [analytics tool TBC] to understand how pages are used. [Client to confirm]",
          "Ce site utilise uniquement les cookies nécessaires à son fonctionnement et [outil d'analyse à confirmer] pour comprendre l'utilisation des pages. [Client to confirm]",
        ),
      },
      {
        h: l("Your rights", "Vos droits"),
        p: f(
          "You can ask to access, correct or delete your data, object to its use, or withdraw consent at any time by writing to secretariatexecutif.iapa@gmail.com.",
          "Vous pouvez demander l'accès, la rectification ou la suppression de vos données, vous opposer à leur utilisation ou retirer votre consentement à tout moment en écrivant à secretariatexecutif.iapa@gmail.com.",
        ),
      },
    ],
  },
  "legal-notice": {
    draft: true,
    eyebrow: l("Legal notice", "Mentions légales"),
    title: l("Legal notice", "Mentions légales"),
    img: "processor",
    intro: l("Last updated: [Date]", "Dernière mise à jour : [Date]"),
    sections: [
      {
        h: l("Publisher", "Éditeur"),
        p: f(
          "International Agribusiness Practitioners Association (IAPA), a non-profit association registered in Accra, Ghana. Registration number: [Number TBC]. Contact: secretariatexecutif.iapa@gmail.com.",
          "Association internationale des praticiens de l'agribusiness (AIPA), association à but non lucratif enregistrée à Accra, Ghana. Numéro d'enregistrement : [Numéro à confirmer]. Contact : secretariatexecutif.iapa@gmail.com.",
        ),
      },
      {
        h: l("Publication director", "Directeur de la publication"),
        p: l("[Name], [Role]", "[Nom], [Fonction]"),
      },
      { h: l("Hosting", "Hébergement"), p: l("[Hosting provider TBC]", "[Hébergeur à confirmer]") },
      {
        h: l("Intellectual property", "Propriété intellectuelle"),
        p: f(
          "All content on this website, including text, logos and training approach names, belongs to IAPA or its partners unless stated otherwise. Reuse requires prior written permission.",
          "Tous les contenus de ce site, y compris les textes, logos et noms des approches de formation, appartiennent à l'AIPA ou à ses partenaires sauf mention contraire. Toute réutilisation nécessite une autorisation écrite préalable.",
        ),
      },
      {
        h: l("Liability", "Responsabilité"),
        p: f(
          "IAPA takes care to keep information accurate but cannot guarantee it is complete or up to date. Links to external sites are provided for convenience; IAPA is not responsible for their content.",
          "L'AIPA veille à l'exactitude des informations mais ne peut garantir leur exhaustivité ni leur actualité. Les liens vers des sites externes sont fournis à titre indicatif ; l'AIPA n'est pas responsable de leur contenu.",
        ),
      },
    ],
  },
} satisfies Record<string, Page>);
