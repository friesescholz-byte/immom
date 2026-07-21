import React from 'react';
import LocationPage from './LocationPage';
import type { Property } from './Portfolio';

interface LocationNienburgProps {
  properties?: Property[];
  setCurrentPage?: (page: any) => void;
}

export const LocationNienburg: React.FC<LocationNienburgProps> = () => {
  return <LocationPage locationId="nienburg" />;
};

export default LocationNienburg;
