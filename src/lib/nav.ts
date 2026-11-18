import type { Lang } from "./i18n";

type L = Record<Lang, string>;
export type NavLink = { label: L; slug: string };
export type NavGroup = { label: L; slug: string; blurb: L; columns: { title: L; links: NavLink[] }[] };

const l = (en: string, fr: string): L => ({ en, fr });

export const NAV: NavGroup[] = [
  {
    label: l("Who We Are", "Qui sommes-nous"),
    slug: "who-we-are",
    blurb: l("A pan-African professional body of agribusiness practitioners from 20+ countries.", "Un organisme professionnel panafricain de praticiens de l'agribusiness de plus de 20 pays."),
    columns: [
      { title: l("About", "À propos"), links: [
        { label: l("About IAPA", "À propos de l'AIPA"), slug: "who-we-are" },
        { label: l("Leadership", "Direction"), slug: "who-we-are/leadership" },
        { label: l("Governance", "Gouvernance"), slug: "who-we-are/governance" },
      ]},
      { title: l("Network", "Réseau"), links: [
        { label: l("Partners & funders", "Partenaires et bailleurs"), slug: "who-we-are/partners" },
        { label: l("Where we work", "Où nous travaillons"), slug: "who-we-are/where-we-work" },
      ]},
    ],
  },
  {
    label: l("Our Work", "Nos activités"),
    slug: "our-work",
    blurb: l("Advisory, curricula, certified training and events that strengthen value chains.", "Conseil, curricula, formations certifiées et événements au service des chaînes de valeur."),
    columns: [
      { title: l("Results", "Résultats"), links: [
        { label: l("Impact map", "Carte d'impact"), slug: "our-work/impact-map" },
        { label: l("IAPA in numbers", "L'AIPA en chiffres"), slug: "our-work/numbers" },
        { label: l("Stories", "Histoires"), slug: "our-work/stories" },
        { label: l("Testimonials", "Témoignages"), slug: "our-work/testimonials" },
      ]},
    ],
  },
  {
    label: l("Training", "Formation"),
    slug: "training",
    blurb: l("Certified, practical, adult-centred approaches delivered by Master Trainers.", "Des approches certifiées, pratiques et centrées sur l'adulte, dispensées par des Master Trainers."),
    columns: [
      { title: l("Our approaches", "Nos approches"), links: [
        { label: l("Farmer Business School", "École d'entrepreneuriat agricole"), slug: "training/fbs" },
        { label: l("Cooperative Business School", "École d'entrepreneuriat coopératif"), slug: "training/cbs" },
        { label: l("Processor Business School", "École d'entrepreneuriat des transformateurs"), slug: "training/pbs" },
        { label: l("Aquaculture Business School", "École d'entrepreneuriat aquacole"), slug: "training/abs" },
        { label: l("Inclusive Contract Farming", "Agriculture contractuelle inclusive"), slug: "training/cf" },
        { label: l("Good Agricultural Practices", "Bonnes pratiques agricoles"), slug: "training/gap" },
      ]},
      { title: l("Formats", "Formats"), links: [
        { label: l("Online courses", "Cours en ligne"), slug: "training/formats" },
        { label: l("Residential programmes", "Programmes résidentiels"), slug: "training/formats" },
        { label: l("Blended courses", "Cours hybrides"), slug: "training/formats" },
        { label: l("Tailor-made programmes", "Programmes sur mesure"), slug: "training/formats" },
      ]},
    ],
  },
  {
    label: l("Knowledge Hub", "Centre de savoirs"),
    slug: "knowledge-hub",
    blurb: l("Evidence, tools and learning from practitioners across Africa.", "Données, outils et apprentissages de praticiens à travers l'Afrique."),
    columns: [
      { title: l("Read", "Lire"), links: [
        { label: l("Publications", "Publications"), slug: "knowledge-hub" },
        { label: l("Policy briefs", "Notes de politique"), slug: "knowledge-hub" },
        { label: l("Research papers", "Articles de recherche"), slug: "knowledge-hub" },
        { label: l("Case studies", "Études de cas"), slug: "knowledge-hub" },
      ]},
      { title: l("Watch & listen", "Voir et écouter"), links: [
        { label: l("Webinars & recordings", "Webinaires et enregistrements"), slug: "knowledge-hub" },
        { label: l("Multimedia", "Multimédia"), slug: "knowledge-hub" },
        { label: l("Podcasts", "Podcasts"), slug: "knowledge-hub" },
      ]},
    ],
  },
  {
    label: l("Media", "Médias"),
    slug: "media",
    blurb: l("News, events and the IAPA Pulse newsletter.", "Actualités, événements et la lettre IAPA Pulse."),
    columns: [
      { title: l("Newsroom", "Salle de presse"), links: [
        { label: l("News", "Actualités"), slug: "media/news" },
        { label: l("Events", "Événements"), slug: "media/events" },
        { label: l("Press releases", "Communiqués de presse"), slug: "media/press" },
        { label: l("Newsletter archive", "Archives de la lettre"), slug: "media/newsletter" },
        { label: l("Key documents", "Documents clés"), slug: "media/documents" },
      ]},
    ],
  },
  {
    label: l("Join Us", "Nous rejoindre"),
    slug: "join",
    blurb: l("Become a member, apply for a role or find a scholarship.", "Devenez membre, postulez à un poste ou trouvez une bourse."),
    columns: [
      { title: l("Opportunities", "Opportunités"), links: [
        { label: l("Membership", "Adhésion"), slug: "join" },
        { label: l("Vacancies", "Offres d'emploi"), slug: "join/vacancies" },
        { label: l("Scholarships", "Bourses"), slug: "join/scholarships" },
      ]},
    ],
  },
];
