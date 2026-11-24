import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ArrowRight, MapPin, Minus, Plus, RotateCcw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import geography from '@/lib/impact-geography.json';
import { findImpactCountry, IMPACT_REGIONS, IMPACT_TOTALS } from '@/lib/impact-data';
import type { Lang } from '@/lib/i18n';

export function ImpactMap({ lang }: { lang: Lang }) {
  const fr = lang === 'fr';
  const [regionId, setRegionId] = useState('all');
  const [countryId, setCountryId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const region = IMPACT_REGIONS.find(r => r.id === regionId);
  const selected = countryId ? findImpactCountry(countryId) : undefined;
  const countries = (region ? region.countries : IMPACT_REGIONS.flatMap(r => r.countries)).filter(c => c.name[lang].toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  const activeIds = new Set((region ? region.countries : IMPACT_REGIONS.flatMap(r => r.countries)).map(c => c.id));
  const pickCountry = (id: string) => { const match = findImpactCountry(id); if (match) { setCountryId(id); setRegionId(match.region.id); } };
  const chooseRegion = (id: string) => { setRegionId(id); setCountryId(null); setSearch(''); };
  return <article className="impact-page bg-card text-ink">
    <header className="mx-auto max-w-7xl px-4 pb-16 pt-12 text-center lg:px-6">
      <Breadcrumbs lang={lang} slug="our-work/impact-map" tone="dark" />
      <p className="eyebrow text-forest-deep">{fr ? "Carte d’impact" : 'Impact map'}</p>
      <h1 className="mt-4 text-4xl text-forest-deep md:text-5xl">{fr ? 'Notre présence en Afrique' : 'Our footprint across Africa'}</h1>
      <p className="mx-auto mt-8 max-w-2xl text-lg font-light opacity-95">{fr ? 'Un réseau de praticiens certifiés, relié par cinq régions africaines.' : 'A network of certified practitioners, connected across five African regions.'}</p>
      <div className="section-content mx-auto grid max-w-4xl grid-cols-3 gap-4">
        {[[IMPACT_TOTALS.countries, fr ? 'Pays dans le réseau' : 'Countries in the network'], [IMPACT_TOTALS.regions, fr ? 'Régions' : 'Regions'], [IMPACT_TOTALS.masterTrainers, fr ? 'Master Trainers' : 'Master Trainers']].map(([value, label]) => <div key={label}>
          <p className="text-4xl font-bold leading-none md:text-5xl">{value}</p><span className="mx-auto my-4 block h-px w-6 bg-clay" /><p className="text-xs text-muted-foreground md:text-sm">{label}</p>
        </div>)}
      </div>
    </header>
    <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-6" aria-label={fr ? 'Présence régionale' : 'Regional footprint'}>
      <div className="flex flex-wrap gap-2 border-b border-border pb-5">
        <Button variant={regionId === 'all' ? 'default' : 'ghost'} onClick={() => chooseRegion('all')} aria-pressed={regionId === 'all'} className="rounded-full">{fr ? 'Toutes les régions' : 'All regions'}</Button>
        {IMPACT_REGIONS.map(r => <Button key={r.id} variant={regionId === r.id ? 'default' : 'ghost'} onClick={() => chooseRegion(r.id)} aria-pressed={regionId === r.id} className="h-auto whitespace-normal rounded-full py-2 text-left">{r.name[lang]}</Button>)}
      </div>
      <div className="grid gap-8 pt-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="relative min-w-0 overflow-hidden bg-secondary/40">
          <TransformWrapper minScale={1} maxScale={4} wheel={{ disabled: true }} doubleClick={{ disabled: true }}>
            {({ zoomIn, zoomOut, resetTransform }) => <>
              <div className="absolute right-3 top-3 z-10 flex gap-1 bg-card p-1 shadow-sm">
                <Button variant="ghost" size="icon" aria-label={fr ? 'Agrandir' : 'Zoom in'} title={fr ? 'Agrandir' : 'Zoom in'} onClick={() => zoomIn()}><Plus /></Button>
                <Button variant="ghost" size="icon" aria-label={fr ? 'Réduire' : 'Zoom out'} title={fr ? 'Réduire' : 'Zoom out'} onClick={() => zoomOut()}><Minus /></Button>
                <Button variant="ghost" size="icon" aria-label={fr ? 'Réinitialiser la carte' : 'Reset map'} title={fr ? 'Réinitialiser la carte' : 'Reset map'} onClick={() => resetTransform()}><RotateCcw /></Button>
              </div>
              <TransformComponent wrapperClass="impact-map-wrapper" contentClass="impact-map-content">
                <svg viewBox="0 0 850 650" className="block h-auto w-full" aria-label={fr ? 'Carte des pays africains' : 'Map of African countries'}>
                  {geography.map(c => { const member = findImpactCountry(c.id); const active = activeIds.has(c.id); return <g key={c.id}>
                    <path d={c.dots.map(([x,y]) => `M${x},${y}h.1`).join('')} className={countryId === c.id ? 'impact-dots-selected' : active ? 'impact-dots-active' : 'impact-dots'} />
                    {member && <path d={c.path} className="impact-hit" role="button" tabIndex={0} aria-label={member.country.name[lang]} aria-pressed={countryId === c.id} onClick={() => pickCountry(c.id)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickCountry(c.id); } }}><title>{member.country.name[lang]}</title></path>}
                  </g>; })}
                  <g role="button" tabIndex={0} aria-label={fr ? 'Cap-Vert' : 'Cabo Verde'} onClick={() => pickCountry('CPV')} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickCountry('CPV'); } }} className="impact-pin"><title>{fr ? 'Cap-Vert' : 'Cabo Verde'}</title><circle cx="44" cy="191" r="10" className="fill-card stroke-clay" /><circle cx="44" cy="191" r="4" className="fill-clay" /></g>
                  {IMPACT_REGIONS.map(r => <g key={r.id} transform={`translate(${r.position[0]} ${r.position[1]})`} className={`impact-pin ${regionId === r.id ? 'impact-pin-selected' : ''}`} role="button" tabIndex={0} aria-label={r.name[lang]} aria-pressed={regionId === r.id} onClick={() => chooseRegion(r.id)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chooseRegion(r.id); } }}><title>{r.name[lang]}</title><path d="M0,0 C-5,-9 -17,-24 -17,-34 A17,17 0 1 1 17,-34 C17,-24 5,-9 0,0Z" className="fill-clay stroke-card" strokeWidth="2" /><circle cy="-34" r="6" className="fill-sun" /></g>)}
                </svg>
              </TransformComponent>
            </>}
          </TransformWrapper>
          <div className="flex flex-wrap gap-5 px-5 pb-5 text-xs text-muted-foreground"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-forest" />{fr ? 'Pays nommés dans le réseau' : 'Named network countries'}</span><span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-clay" />{fr ? 'Régions IAPA' : 'IAPA regions'}</span></div>
        </div>
        <aside className="min-w-0 border-l-2 border-clay pl-6">
          <div aria-live="polite"><p className="eyebrow text-forest-deep">{selected ? (fr ? 'Pays' : 'Country') : (fr ? 'Réseau régional' : 'Regional network')}</p>
            <h2 className="mt-3 text-2xl">{selected?.country.name[lang] ?? region?.name[lang] ?? (fr ? 'Cinq régions, un réseau' : 'Five regions, one network')}</h2>
            <p className="mt-4 text-sm text-muted-foreground">{selected ? selected.region.name[lang] : (fr ? `${countries.length} pays nommés dans la liste régionale fournie.` : `${countries.length} countries named in the supplied regional list.`)}</p>
            {selected && <p className="mt-4 text-sm">{fr ? 'Présence de membres dans le réseau IAPA. Les résultats et effectifs par pays ne sont pas encore fournis.' : 'Member presence in the IAPA network. Country-level results and trainer counts have not yet been supplied.'}</p>}
          </div>
          <div className="relative mt-6"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input value={search} onChange={e => setSearch(e.target.value)} aria-label={fr ? 'Rechercher un pays' : 'Search countries'} placeholder={fr ? 'Rechercher un pays' : 'Search countries'} className="bg-card pl-9" /></div>
          <div className="mt-3 flex max-h-64 flex-col overflow-y-auto">
            {countries.map(c => <Button key={c.id} variant="ghost" aria-pressed={countryId === c.id} onClick={() => pickCountry(c.id)} className={`justify-between rounded-none ${countryId === c.id ? 'bg-secondary text-forest-deep' : ''}`}>{c.name[lang]}<ArrowRight /></Button>)}
            {!countries.length && <p role="status" className="py-4 text-sm text-muted-foreground">{fr ? 'Aucun pays trouvé.' : 'No countries found.'}</p>}
          </div>
          <Button asChild variant="link" className="mt-5 h-auto whitespace-normal px-0 text-left"><Link to="/$lang/$" params={{ lang, _splat: 'work-with-us' }}>{fr ? 'Contacter le Secrétariat' : 'Contact the Secretariat'}<ArrowRight /></Link></Button>
        </aside>
      </div>
      <p className="mt-8 max-w-4xl text-xs leading-relaxed text-muted-foreground">{fr ? 'Source : documents IAPA et liste régionale fournie. Le total déclaré de plus de 20 pays concerne l’ensemble du réseau ; 19 pays sont nommés dans cette liste. Les repères représentent des régions, et non des sites de projets. Fond de carte : Natural Earth (domaine public) ; les frontières n’impliquent aucune prise de position.' : 'Source: supplied IAPA documents and regional country list. The reported 20+ countries refers to the whole network; 19 countries are named in that list. Pins represent regions, not project sites. Map boundaries: Natural Earth (public domain); boundaries imply no position on territorial status.'}</p>
    </section>
  </article>;
}