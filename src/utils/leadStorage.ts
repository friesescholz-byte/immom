export interface LeadInquiry {
  id: string;
  date: string;
  type: 'valuation' | 'expose' | 'checklist' | 'tippgeber';
  name: string;
  email: string;
  phone?: string;
  street?: string;
  zipCity?: string;
  address?: string;
  details: string;
  propertyTitle?: string;
  status: 'neu' | 'bearbeitet';
}

const STORAGE_KEY = 'immom_leads';

const DEFAULT_LEADS: LeadInquiry[] = [
  {
    id: 'lead-101',
    date: '06.07.2026 11:45',
    type: 'expose',
    name: 'Michael Schmidt',
    email: 'm.schmidt@beispiel.de',
    phone: '0171 8849201',
    street: 'Lange Str. 14',
    zipCity: '31582 Nienburg',
    address: 'Lange Str. 14, 31582 Nienburg',
    details: 'Möchte gerne das Exposé und Grundrissunterlagen erhalten.',
    propertyTitle: 'Klassisches Einfamilienhaus in Nienburg',
    status: 'neu'
  },
  {
    id: 'lead-102',
    date: '06.07.2026 10:15',
    type: 'valuation',
    name: 'Sabine & Peter Meyer',
    email: 'meyer-nienburg@gmx.de',
    phone: '05021 44920',
    street: 'Am Weserufer 3',
    zipCity: '31582 Nienburg',
    address: 'Am Weserufer 3, 31582 Nienburg',
    details: 'Bewertung Haus (Einfamilienhaus), ca. 140 m² Wohnfläche, Baujahr 1995.',
    status: 'neu'
  },
  {
    id: 'lead-104',
    date: '06.07.2026 09:20',
    type: 'tippgeber',
    name: 'Torsten Bergmann',
    email: 't.bergmann@web.de',
    phone: '0151 7739201',
    street: 'Mühlenweg 8',
    zipCity: '31608 Marklohe',
    address: 'Mühlenweg 8, 31608 Marklohe',
    details: 'Tippgeber-Hinweis:\nObjekt: Einfamilienhaus in Marklohe (Hermann-Löns-Weg)\nEigentümer: Familie Wagner\nNotiz: Eigentümer planen Umzug ins Seniorenwohnen.',
    status: 'neu'
  },
  {
    id: 'lead-103',
    date: '05.07.2026 16:30',
    type: 'checklist',
    name: 'Anja Hoffmann',
    email: 'anja.hoffmann78@web.de',
    details: 'Beide Eigentümer-Ratgeber (Haus-Verkauf & Aufbereitung) angefordert.',
    status: 'bearbeitet'
  }
];

export const getLeads = (): LeadInquiry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LEADS));
      return DEFAULT_LEADS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading leads from localStorage', e);
    return DEFAULT_LEADS;
  }
};

export const saveLead = (lead: Omit<LeadInquiry, 'id' | 'date' | 'status'>): LeadInquiry => {
  const existing = getLeads();
  const now = new Date();
  const formattedDate = now.toLocaleDateString('de-DE') + ' ' + now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  
  const newLead: LeadInquiry = {
    ...lead,
    id: 'lead-' + Date.now(),
    date: formattedDate,
    status: 'neu'
  };

  const updated = [newLead, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving lead to localStorage', e);
  }
  return newLead;
};

export const updateLeadStatus = (id: string, status: 'neu' | 'bearbeitet') => {
  const existing = getLeads();
  const updated = existing.map(l => l.id === id ? { ...l, status } : l);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error updating lead status', e);
  }
  return updated;
};

export const deleteLead = (id: string) => {
  const existing = getLeads();
  const updated = existing.filter(l => l.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting lead', e);
  }
  return updated;
};
