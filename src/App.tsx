import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Steps from './components/Steps';
import SalesPrep from './components/SalesPrep';
import WhyUs from './components/WhyUs';
import Comparison from './components/Comparison';
import TargetGroups from './components/TargetGroups';
import References from './components/References';
import LeadMagnet from './components/LeadMagnet';
import Tippgeber from './components/Tippgeber';
import Contact from './components/Contact';
import Portfolio, { type Property } from './components/Portfolio';
import AdminDashboard from './components/AdminDashboard';
import LocationNienburg from './components/LocationNienburg';

const DEFAULT_PROPERTIES: Property[] = [
  {
    id: 1,
    title: 'Klassisches Einfamilienhaus in ruhiger Familiendistriktslage',
    type: 'haus',
    location: 'Nienburg',
    price: 385000,
    area: 140,
    rooms: 5,
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'verfuegbar',
    statusTag: 'Neu',
    description: 'Dieses freistehende, solide Einfamilienhaus besticht durch einen großzügigen Grundriss, den gepflegten Garten und eine hervorragende Lage in einem ruhigen Wohngebiet in Nienburg. Der helle und offene Wohn- und Essbereich bildet das Herzstück des Hauses. Von hier aus gelangen Sie direkt auf die gemütliche Sonnenterrasse. Im Obergeschoss erwarten Sie drei geräumige Schlaf- oder Arbeitszimmer sowie ein großes, tageslichtdurchflutetes Familienbad. Die Immobilie ist ideal für Familien geeignet, die eine ruhige, aber dennoch zentrumsnahe Wohnlage suchen.',
    yearBuilt: 1998,
    floors: '2 Geschosse',
    plotSize: '650 m²',
    fittings: 'Hochwertiges Echtholzparkett, moderne Einbauküche inklusive Geräten, tageslichtdurchflutetes Badezimmer mit Badewanne und Dusche, voll unterkellert, Garage mit elektrischem Sektionaltor sowie zwei Außenstellplätze.',
    garages: 1,
    parkingSpaces: 2,
    commission: '3,57 % inkl. MwSt. vom Käufer',
    handover: 'Nach Vereinbarung',
    energyType: 'Verbrauchsausweis',
    energyDemand: '118 kWh/(m²·a)',
    hotWater: 'Ja (in Endenergie enthalten)',
    energyClass: 'D',
    buildingType: 'Freistehendes Einfamilienhaus',
    renovationYear: 'Letzte Sanierung 2018 (Heizung & Dämmung)'
  },
  {
    id: 2,
    title: 'Barrierefreier Winkelbungalow mit traumhaftem Garten',
    type: 'haus',
    location: 'Marklohe',
    price: 349000,
    area: 125,
    rooms: 4,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'reserviert',
    statusTag: 'Reserviert',
    description: 'Dieser ebenerdige Winkelbungalow in Marklohe überzeugt durch eine moderne Architektur und barrierefreies Wohnen auf höchstem Niveau. Durch den großzügigen Winkel-Grundriss entsteht eine windgeschützte und uneinsehbare Terrasse mit Blick in den liebevoll angelegten Garten. Die Immobilie verfügt über ein großes Wohnzimmer mit bodentiefen Panoramafenstern, eine offene Küche mit Kochinsel, ein Elternschlafzimmer mit Bad en Suite sowie zwei weitere Zimmer, die flexibel als Kinder-, Gäste- oder Arbeitszimmer genutzt werden können.',
    yearBuilt: 2014,
    floors: '1 Geschoss (ebenerdig)',
    plotSize: '820 m²',
    fittings: 'Barrierefreie Raumaufteilung, Fußbodenheizung im gesamten Gebäude, dreifach verglaste Isolierglasfenster mit elektrischen Rollläden, Solaranlage zur Brauchwasserunterstützung, Doppel-Carport mit Abstellraum.',
    garages: 0,
    parkingSpaces: 2,
    commission: '3,57 % inkl. MwSt. vom Käufer',
    handover: 'Frei ab Herbst 2026',
    energyType: 'Bedarfsausweis',
    energyDemand: '68 kWh/(m²·a)',
    hotWater: 'Ja (solarunterstützt)',
    energyClass: 'B',
    buildingType: 'Winkelbungalow (freistehend)',
    renovationYear: 'Neubauwertiger Zustand (Baujahr 2014)'
  },
  {
    id: 3,
    title: 'Gemütliches Einfamilienhaus für die große Familie',
    type: 'haus',
    location: 'Husum',
    price: 295000,
    area: 135,
    rooms: 5,
    img: 'https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'verfuegbar',
    statusTag: 'Beliebt',
    description: 'Dieses attraktive Einfamilienhaus in Husum bietet viel Platz für die große Familie. Mit fünf Zimmern auf ca. 135 m² Wohnfläche lässt diese Immobilie keine Wünsche offen. Die Raumaufteilung ist klug konzipiert: Im Erdgeschoss befindet sich das helle Wohnzimmer mit Kaminofen, eine separate Küche und ein Gäste-WC mit Dusche. Im Obergeschoss liegen vier Schlafzimmer und das Hauptbad. Der voll eingezäunte Garten bietet Kindern einen sicheren Platz zum Spielen und Toben.',
    yearBuilt: 1985,
    floors: '1,5 Geschosse',
    plotSize: '580 m²',
    fittings: 'Kaminofen im Wohnbereich, Einbauküche im Landhausstil, Laminat- und Fliesenböden, modernisiertes Gäste-WC, gemütliche Süd-West-Terrasse, Carport und Gartenhaus für Gartengeräte.',
    garages: 0,
    parkingSpaces: 2,
    commission: '3,57 % inkl. MwSt. vom Käufer',
    handover: 'Kurzfristig möglich',
    energyType: 'Verbrauchsausweis',
    energyDemand: '145 kWh/(m²·a)',
    hotWater: 'Ja (über Heizungsanlage)',
    energyClass: 'E',
    buildingType: 'Einfamilienhaus (Satteldach)',
    renovationYear: 'Fortlaufend modernisiert (Fenster & Dachdämmung 2012)'
  },
  {
    id: 4,
    title: 'Zentrumsnahes Mehrfamilienhaus als Renditeobjekt (8 WE)',
    type: 'mehrfamilienhaus',
    location: 'Verden',
    price: 790000,
    area: 520,
    rooms: 24,
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'verfuegbar',
    statusTag: 'Kapitalanlage',
    description: 'Solides und voll vermietetes Mehrfamilienhaus in zentrumsnaher Lage von Verden. Die Immobilie umfasst insgesamt 8 Wohneinheiten mit Wohnungsgrößen zwischen 45 m² und 85 m² (2 bis 3 Zimmer). Die Gesamtwohnfläche beträgt ca. 520 m². Das Objekt befindet sich auf einem ca. 920 m² großen Grundstück und verfügt über eine solide Mieterstruktur. Alle Wohneinheiten sind fortlaufend instand gehalten worden, sodass kein akuter Sanierungsstau vorliegt. Die aktuelle Jahresnettokaltmiete bietet attraktives Steigerungspotenzial.',
    yearBuilt: 1974,
    floors: '3 Geschosse',
    plotSize: '920 m²',
    fittings: '8 Wohneinheiten (jeweils mit eigenem Kellerraum), Gasetagenheizungen für jede Wohnung (Abrechnung direkt über Mieter), 6 Pkw-Stellplätze auf dem Hof, fortlaufende Renovierungen der Bäder und Leitungen bei Mieterwechsel.',
    garages: 0,
    parkingSpaces: 6,
    commission: '5,95 % inkl. MwSt. vom Käufer',
    handover: 'Nach Kaufpreiszahlung',
    energyType: 'Verbrauchsausweis',
    energyDemand: '138 kWh/(m²·a)',
    hotWater: 'Ja (dezentral über Gas)',
    energyClass: 'E',
    buildingType: 'Mehrfamilienhaus (Massivbau)',
    renovationYear: 'Letzte Teilsanierung 2020 (Dacheindeckung & Dämmung)'
  },
  {
    id: 5,
    title: 'Großzügiger Bungalow mit separater Einliegerwohnung',
    type: 'haus',
    location: 'Lindwedel (SG. Schwarmstedt)',
    price: 420000,
    area: 160,
    rooms: 6,
    img: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'verkauft',
    statusTag: 'Verkauft',
    description: 'Großzügiger Bungalow in begehrter, waldnaher Wohnlage von Lindwedel (Samtgemeinde Schwarmstedt). Das Gebäude teilt sich auf in eine geräumige Hauptwohnung mit ca. 110 m² Wohnfläche (4 Zimmer) und eine separate Einliegerwohnung mit ca. 50 m² Wohnfläche (2 Zimmer). Die Einliegerwohnung verfügt über einen eigenen Eingang und eignet sich ideal zur Vermietung, als Büro oder als Mehrgenerationenhaus. Die Immobilie befindet sich auf einem wunderschön eingewachsenen Gartengrundstück.',
    yearBuilt: 1992,
    floors: '1 Geschoss',
    plotSize: '1.100 m²',
    fittings: 'Zwei voll funktionsfähige Wohneinheiten, Kaminofen in der Hauptwohnung, großer Wintergarten mit Heizung, Doppelgarage mit Werkstattbereich, Solaranlage zur Stromerzeugung (Photovoltaik mit Einspeisevergütung).',
    garages: 2,
    parkingSpaces: 3,
    commission: '3,57 % inkl. MwSt. vom Käufer',
    handover: 'Bereits verkauft',
    energyType: 'Verbrauchsausweis',
    energyDemand: '112 kWh/(m²·a)',
    hotWater: 'Ja (in Endenergie enthalten)',
    energyClass: 'D',
    buildingType: 'Bungalow mit Einliegerwohnung',
    renovationYear: 'Wintergarten-Anbau 2005, Photovoltaik-Installation 2011'
  },
  {
    id: 6,
    title: 'Modernes Stadthaus in ruhiger und zentraler Lage',
    type: 'haus',
    location: 'Husum',
    price: 315000,
    area: 150,
    rooms: 5,
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'verfuegbar',
    statusTag: 'Top Zustand',
    description: 'Dieses großzügige, moderne Stadthaus in Husum kombiniert urbanes Wohnen mit viel Platz für die ganze Familie. Die Immobilie befindet sich in einem hervorragenden, absolut neuwertigen Zustand und bietet ca. 150 m² Wohnfläche verteilt auf drei Etagen. Im Erdgeschoss besticht der großzügige Wohn- und Essbereich mit einer angrenzenden, offenen Designer-Küche. Das erste Obergeschoss beherbergt zwei große Kinderzimmer sowie ein Badezimmer. Im komplett ausgebauten Dachstudio befindet sich das Elternschlafzimmer mit separater Ankleide.',
    yearBuilt: 2019,
    floors: '3 Geschosse',
    plotSize: '350 m²',
    fittings: 'Luft-Wasser-Wärmepumpe für niedrige Heizkosten, moderne Fußbodenheizung auf allen Etagen, Designer-Küche mit Marken-Elektrogeräten, exklusive Feinsteinzeugfliesen und hochwertiger Design-Vinylboden, kleiner, pflegeleichter Stadtgarten mit Terrasse, Garage und zusätzlicher Stellplatz.',
    garages: 1,
    parkingSpaces: 1,
    commission: '3,57 % inkl. MwSt. vom Käufer',
    handover: 'Frei zum Winter 2026',
    energyType: 'Bedarfsausweis',
    energyDemand: '48 kWh/(m²·a)',
    hotWater: 'Ja (über Wärmepumpe)',
    energyClass: 'A',
    buildingType: 'Modernes Stadthaus (Reihenendhaus)',
    renovationYear: 'Erstbezug 2019, kontinuierlich instand gehalten'
  },
  {
    id: 7,
    title: 'Luxuriöse Penthouse-Wohnung mit atemberaubendem Weserblick',
    type: 'wohnung',
    location: 'Nienburg',
    price: 495000,
    area: 110,
    rooms: 3,
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'verfuegbar',
    statusTag: 'Luxus',
    description: 'Dieses spektakuläre Penthouse in Nienburg verbindet repräsentatives Wohnen mit einem unvergleichlichen Blick auf die Weser. Die Wohnung befindet sich im exklusiven Staffelgeschoss eines erst 2021 errichteten Stadthauses. Mit dem Aufzug fahren Sie barrierefrei direkt in Ihr neues Zuhause. Die bodentiefen Panoramafenster fluten den gesamten, offen gestalteten Wohn-, Ess- und Küchenbereich mit natürlichem Licht. Ein absolutes Highlight ist die umlaufende Dachterrasse mit perfekter Südausrichtung – ideal für entspannte Abende über den Dächern der Stadt.',
    yearBuilt: 2021,
    floors: '4. Obergeschoss (Staffelgeschoss)',
    plotSize: 'k.A. (Miteigentumsanteil)',
    fittings: 'Aufzug mit Direktzugang in die Wohnung, Fußbodenheizung in allen Räumen, edles Echtholzparkett aus geölter Eiche, Designer-Sanitärobjekte von Duravit, umlaufende Dachterrasse mit Südausrichtung, Tiefgaragenstellplatz mit installierter Wallbox.',
    garages: 1,
    parkingSpaces: 0,
    commission: '3,57 % inkl. MwSt. vom Käufer',
    handover: 'Sofort bezugsfrei',
    energyType: 'Bedarfsausweis',
    energyDemand: '38 kWh/(m²·a)',
    hotWater: 'Ja (Zentralheizung über Fernwärme)',
    energyClass: 'A',
    buildingType: 'Penthouse-Wohnung',
    renovationYear: 'Neubauzustand, Erstbezug 2021'
  },
  {
    id: 8,
    title: 'Stilvoll sanierte Altbauwohnung mit Balkon',
    type: 'wohnung',
    location: 'Verden',
    price: 189000,
    area: 78,
    rooms: 3,
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'verfuegbar',
    statusTag: 'Altbau-Charme',
    description: 'Diese frisch sanierte Altbauwohnung im Herzen von Verden vereint nostalgischen Charme mit zeitgemäßem Wohnkomfort. Die Wohnung besticht durch die typischen Altbaumerkmale: Originale, liebevoll aufgearbeitete Holzdielenböden, hohe Decken mit Stuckverzierungen und historische Flügeltüren. Das großzügige Wohnzimmer lädt zum Verweilen ein. Die Küche bietet ausreichend Platz für eine Einbauküche nach Ihren Wünschen und verfügt über einen direkten Zugang zum charmanten Balkon, der zum ruhigen Innenhof ausgerichtet ist. Ein praktischer Stellplatz rundet dieses seltene Angebot ab.',
    yearBuilt: 1910,
    floors: '1. Obergeschoss',
    plotSize: 'k.A.',
    fittings: 'Original Dielenboden (geschliffen & geölt), Stuckverzierungen an den Decken, historische Flügeltüren, frisch modernisiertes Duschbad, Balkon zum ruhigen Innenhof, eigener Kellerraum, Pkw-Außenstellplatz.',
    garages: 0,
    parkingSpaces: 1,
    commission: '3,57 % inkl. MwSt. vom Käufer',
    handover: 'Vermietet (Jahresnettokaltmiete 7.800 €)',
    energyType: 'Bedarfsausweis',
    energyDemand: '162 kWh/(m²·a)',
    hotWater: 'Ja (Gas-Etagenheizung)',
    energyClass: 'F',
    buildingType: 'Etagenwohnung im Altbau',
    renovationYear: 'Umfassende Sanierung 2015 (Sanitär, Elektrik, Fenster)'
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'portfolio' | 'admin' | 'location-nienburg'>(() => {
    const path = window.location.pathname;
    if (path === '/admin') return 'admin';
    if (path === '/portfolio') return 'portfolio';
    return 'home';
  });
  const [initialPropertyId, setInitialPropertyId] = useState<number | null>(null);
  
  // Persisted state for properties with version-based cache-busting
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('immom_properties');
    const version = localStorage.getItem('immom_db_version');
    const CURRENT_DB_VERSION = 'v4_luxurious_portfolio';
    
    if (saved && version === CURRENT_DB_VERSION) {
      try {
        return JSON.parse(saved) as Property[];
      } catch (e) {
        console.error('Failed to parse properties from localStorage', e);
      }
    }
    // Force reset to new detailed properties and save version
    localStorage.setItem('immom_properties', JSON.stringify(DEFAULT_PROPERTIES));
    localStorage.setItem('immom_db_version', CURRENT_DB_VERSION);
    return DEFAULT_PROPERTIES;
  });

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem('immom_properties', JSON.stringify(properties));
  }, [properties]);

  // Sync state with browser URL path
  useEffect(() => {
    const path = window.location.pathname;
    if (currentPage === 'admin' && path !== '/admin') {
      window.history.pushState(null, '', '/admin');
    } else if (currentPage === 'portfolio' && path !== '/portfolio') {
      window.history.pushState(null, '', '/portfolio');
    } else if (currentPage === 'location-nienburg' && path !== '/nienburg') {
      window.history.pushState(null, '', '/nienburg');
    } else if (currentPage === 'home' && path !== '/') {
      window.history.pushState(null, '', '/');
    }
  }, [currentPage]);

  // Handle back/forward browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/admin') {
        setCurrentPage('admin');
      } else if (path === '/portfolio') {
        setCurrentPage('portfolio');
      } else if (path === '/nienburg') {
        setCurrentPage('location-nienburg');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen to custom navigation events to switch pages programmatically
  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.page) {
        setCurrentPage(customEvent.detail.page);
        if (customEvent.detail.propertyId) {
          setInitialPropertyId(customEvent.detail.propertyId);
        } else {
          setInitialPropertyId(null);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

  return (
    <>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main style={{ minHeight: 'calc(100vh - 80px)' }}>
        {currentPage === 'home' ? (
          <>
            <Hero properties={properties} />
            <WhyUs />
            <Problem />
            <Steps />
            <SalesPrep />
            <Solution />
            <Comparison />
            <TargetGroups />
            <References />
            <Tippgeber />
            <LeadMagnet />
          </>
        ) : currentPage === 'portfolio' ? (
          <Portfolio 
            properties={properties} 
            initialPropertyId={initialPropertyId} 
            setInitialPropertyId={setInitialPropertyId} 
          />
        ) : currentPage === 'location-nienburg' ? (
          <LocationNienburg properties={properties} setCurrentPage={setCurrentPage} />
        ) : (
          <AdminDashboard properties={properties} setProperties={setProperties} />
        )}
      </main>
      <Contact currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App;
