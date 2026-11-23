import type { Lang } from './i18n';

type Label = Record<Lang, string>;
export type ImpactRegion = { id: string; name: Label; position: [number, number]; countries: { id: string; name: Label }[] };
const country = (id: string, en: string, fr = en) => ({ id, name: { en, fr } });
// Source: the supplied IAPA regional country list, retained in pages.ts.
// These are network locations, not project locations or country-level impact totals.
export const IMPACT_REGIONS: ImpactRegion[] = [
  { id: 'north', name: { en: 'North Africa', fr: 'Afrique du Nord' }, position: [390, 88], countries: [country('TUN', 'Tunisia', 'Tunisie'), country('DZA', 'Algeria', 'Algérie')] },
  { id: 'francophone-west', name: { en: 'Francophone West Africa', fr: "Afrique de l’Ouest francophone" }, position: [205, 245], countries: [country('BEN', 'Benin', 'Bénin'), country('BFA', 'Burkina Faso'), country('MLI', 'Mali'), country('CPV', 'Cabo Verde', 'Cap-Vert'), country('TGO', 'Togo')] },
  { id: 'anglophone-central', name: { en: 'Anglophone West & Central Africa', fr: "Afrique de l’Ouest et centrale anglophone" }, position: [340, 305], countries: [country('GHA', 'Ghana'), country('NGA', 'Nigeria', 'Nigéria'), country('CMR', 'Cameroon', 'Cameroun')] },
  { id: 'east', name: { en: 'East Africa', fr: "Afrique de l’Est" }, position: [625, 340], countries: [country('SSD', 'South Sudan', 'Soudan du Sud'), country('ETH', 'Ethiopia', 'Éthiopie'), country('TZA', 'Tanzania', 'Tanzanie'), country('RWA', 'Rwanda'), country('MDG', 'Madagascar')] },
  { id: 'south', name: { en: 'Southern Africa', fr: 'Afrique australe' }, position: [510, 475], countries: [country('NAM', 'Namibia', 'Namibie'), country('MOZ', 'Mozambique'), country('ZMB', 'Zambia', 'Zambie'), country('MWI', 'Malawi')] },
];
export const IMPACT_TOTALS = { countries: '20+', regions: 5, masterTrainers: '75+' } as const;
export function findImpactCountry(id: string) {
  const region = IMPACT_REGIONS.find(r => r.countries.some(c => c.id === id));
  const country = region?.countries.find(c => c.id === id);
  return region && country ? { region, country } : undefined;
}