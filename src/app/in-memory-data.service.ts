import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    const places = [
      { id: 1, name: 'North Nice', city: 'Ofakim', country: 'Israel', numberOfCoffie: 18, numberOfCookies: 7 },
      { id: 2, name: 'North Narco', city: 'Beer-sheva', country: 'Israel', numberOfCoffie: 34, numberOfCookies: 9  },
      { id: 3, name: 'North Bombasto', city: 'Bangkok', country: 'Thailand', numberOfCoffie: 7, numberOfCookies: 17  },
      { id: 4, name: 'Central Celeritas', city: 'Tel-Aviv', country: 'Israel', numberOfCoffie: 34, numberOfCookies: 27  },
      { id: 5, name: 'Central Magneta', city: 'Rome', country: 'Italy', numberOfCoffie: 3, numberOfCookies: 37  },
      { id: 6, name: 'Central Rubber', city: 'Beijing', country: 'China', numberOfCoffie: 89, numberOfCookies: 23  },
      { id: 7, name: 'South Dynama', city: 'New York', country: 'United States', numberOfCoffie: 78, numberOfCookies: 3  },
      { id: 8, name: 'South Dr IQ', city: 'Spain', country: 'Spain', numberOfCoffie: 14, numberOfCookies: 5 },
      { id: 9, name: 'South Magma', city: 'Athens', country: 'Greece', numberOfCoffie: 7, numberOfCookies: 56  },
      { id: 10, name: 'South Tornado', city: 'Stockholm', country: 'Sweden', numberOfCoffie: 34, numberOfCookies: 89  }
  ];

    return {places};
  }
}
