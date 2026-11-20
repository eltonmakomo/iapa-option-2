import type { Lang } from "./i18n";
import abf from "@/assets/abf.png.asset.json";
import giz from "@/assets/giz.png.asset.json";
import europeanUnion from "@/assets/european-union.png.asset.json";
import oacps from "@/assets/oacps.png.asset.json";
import acbf from "@/assets/acbf.png.asset.json";
import comcashew from "@/assets/comcashew.png.asset.json";
import aaa from "@/assets/africa-agribusiness-academy.png.asset.json";

type L = Record<Lang, string>;

export type PartnerLogo = { key: string; url: string; name: L };

export const PARTNER_LOGOS: PartnerLogo[] = [
  { key: "abf", url: abf.url, name: { en: "Agri-Business Facility for Africa (ABF)", fr: "Agri-Business Facility for Africa (ABF)" } },
  { key: "giz", url: giz.url, name: { en: "GIZ — Deutsche Gesellschaft für Internationale Zusammenarbeit", fr: "GIZ — Deutsche Gesellschaft für Internationale Zusammenarbeit" } },
  { key: "european-union", url: europeanUnion.url, name: { en: "European Union", fr: "Union européenne" } },
  { key: "oacps", url: oacps.url, name: { en: "OACPS — Organisation of African, Caribbean and Pacific States", fr: "OEACP — Organisation des États d'Afrique, des Caraïbes et du Pacifique" } },
  { key: "acbf", url: acbf.url, name: { en: "ACBF — The African Capacity Building Foundation", fr: "ACBF — The African Capacity Building Foundation" } },
  { key: "comcashew", url: comcashew.url, name: { en: "ComCashew", fr: "ComCashew" } },
  { key: "africa-agribusiness-academy", url: aaa.url, name: { en: "Africa Agribusiness Academy", fr: "Africa Agribusiness Academy" } },
];

const BY_KEY: Record<string, PartnerLogo> = Object.fromEntries(PARTNER_LOGOS.map((p) => [p.key, p]));

export const logoOf = (key: string): PartnerLogo => BY_KEY[key] ?? PARTNER_LOGOS[0]!;
