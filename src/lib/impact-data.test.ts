import { describe, expect, it } from 'vitest';
import { findImpactCountry, IMPACT_REGIONS, IMPACT_TOTALS } from './impact-data';

describe('Supplied IAPA footprint', () => {
  it('retains the supplied 20+ country total without inventing extra mapped countries', () => {
    expect(IMPACT_TOTALS.countries).toBe('20+');
    expect(IMPACT_REGIONS.flatMap(r => r.countries)).toHaveLength(19);
  });
  it('retains five supplied regions', () => {
    expect(IMPACT_TOTALS.regions).toBe(5);
    expect(IMPACT_REGIONS).toHaveLength(5);
  });
  it('retains the supplied 75+ Master Trainers total', () => {
    expect(IMPACT_TOTALS.masterTrainers).toBe('75+');
  });
  it('uses IAPA regional assignments rather than assuming geographic groupings', () => {
    expect(findImpactCountry('MDG')?.region.id).toBe('east');
    expect(findImpactCountry('CMR')?.region.id).toBe('anglophone-central');
    expect(findImpactCountry('CPV')?.region.id).toBe('francophone-west');
    expect(findImpactCountry('KEN')).toBeUndefined();
  });
});