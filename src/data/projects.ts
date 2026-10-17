export type Project = {
  client: string;
  type: string;
  location: string;
  area: string;
  tonnage: string;
  img?: string;
  imgs?: string[];
  logo?: string;
  duration?: string;
  details?: string[];
  note?: string;
};

export type ProjectClass = {
  key: string;
  label: string;
  projects: Project[];
};

export const projectClasses: ProjectClass[] = [
  {
    key: 'industrial',
    label: 'Industrial',
    projects: [
      {
        client: 'Calderys India Pvt Ltd',
        type: 'Warehouse',
        location: 'Jamnagar, Gujarat',
        area: '10,000 sq ft',
        tonnage: '20 MT',
        img: '/projects/calderys.webp',
        duration: '70 days',
        details: ['Warehouse without column foundations: minimal civil foundations using advanced PCC techniques.'],
      },
      {
        client: 'Himalaya Agro Industries',
        type: 'Warehouse',
        location: 'Purnia, Bihar',
        area: '25,000 sq ft',
        tonnage: '75 MT',
        img: '/projects/himalaya-agro.webp',
        duration: '90 days',
      },
      {
        client: 'DRDO-HAL Campus',
        type: 'Aircraft Hangar Doors',
        location: 'Bengaluru, Karnataka',
        area: '13,000 sq ft',
        tonnage: '99 MT',
        img: '/projects/drdo-hal-campus.webp',
        duration: '68 days',
        details: ['Aircraft hangar doors, 15 m x 80 m.'],
      },
      {
        client: 'Snowman Logistics Ltd',
        type: 'Warehouse Built Over Roof',
        location: 'Mumbai, Maharashtra',
        area: '30,000 sq ft',
        tonnage: '60 MT',
        img: '/projects/snowman.webp',
        duration: '123 days',
        details: ['Valley gutter of 80 m, single slope.', 'Built over the roofs of existing buildings.'],
      },
      {
        client: 'Siemens Ltd',
        type: 'Warehouse',
        location: 'Nagpur Metro Last Station',
        area: '40,000 sq ft',
        tonnage: '110 MT',
        img: '/projects/siemens.webp',
      },
      {
        client: 'Trinity Fructa Pvt Ltd, Unit-III',
        type: 'Factory, Utility Building & Boiler Shed',
        location: 'Mangaldoi, Assam',
        area: '86,162 sq ft',
        tonnage: '369.4 MT',
        img: '/projects/trinity-fructa.webp',
        note: 'Inaugurated by PM Modi — judged the best facility internationally among 5 countries by Johnson & Johnson.',
      },
      {
        client: 'Sumitra Agrotech Foodpark',
        type: 'Warehouse',
        location: 'Mangaldoi, Assam',
        area: '25,000 sq ft',
        tonnage: '75 MT',
        imgs: [
          '/projects/sumitra-foodpark-1.webp',
          '/projects/sumitra-foodpark-2.webp',
          '/projects/sumitra-warehouse.webp',
        ],
        details: ['Part of the 20-acre food park: steel and civil design, steel supply and commissioning of 2,500+ tons, delivered in 2.5 years.'],
      },
      {
        client: 'Repose Bake House',
        type: 'Factory',
        location: 'Mangaldoi, Assam',
        area: '27,705 sq ft',
        tonnage: '85.8 MT',
        img: '/projects/repose-bake-house.webp',
      },
      {
        client: 'SRD Bakers, Unit 2',
        type: 'Factory',
        location: 'Mangaldoi, Assam',
        area: '9,308 sq ft',
        tonnage: '38.35 MT',
        img: '/projects/srd-bakers-unit-2.webp',
      },
      {
        client: 'North East Global Company',
        type: 'Factory',
        location: 'Mangaldoi, Assam',
        area: '11,818 sq ft',
        tonnage: '118.6 MT',
        img: '/projects/negc.webp',
      },
      {
        client: 'SRD Food & Beverages Pvt Ltd',
        type: 'Factory',
        location: 'Mangaldoi, Assam',
        area: '12,378 sq ft',
        tonnage: '115 MT',
        logo: '/clients/srd-group-logo-retina.png',
      },
      {
        client: 'Rolling Spin Flour Mills',
        type: 'Factory',
        location: 'Mangaldoi, Assam',
        area: '7,020 sq ft',
        tonnage: '30.13 MT',
        img: '/projects/rolling-spin.webp',
      },
      {
        client: 'Kirti Oil Industries Pvt Ltd',
        type: 'Warehouse, Dry & Cleaning and Machine Platforms',
        location: 'Ambajogai, Barshi, Udgir, Parbhani, Hinganghat & Karanja, Maharashtra',
        area: '6,98,000 sq ft',
        tonnage: '2,718+ MT',
        imgs: [
          '/projects/kirti-oil-1.webp',
          '/projects/kirti-oil-2.webp',
          '/projects/kirti-oil-3.webp',
        ],
        note: 'One of MBI\'s largest single-client rollouts, spread across 6 locations.',
        duration: '11 months',
        details: [
          'Turnkey PEB solution across 6 locations on 15 acres.',
          'Solvent plants: 40,000 sq ft x 6 nos, 672 tons.',
          'Machine platforms: 12 m x 6 nos, 726 tons.',
          'Agri commodity warehouses: 93,000 sq ft x 6 nos, 1,320 tons.',
        ],
      },
    ],
  },
  {
    key: 'cold-storage',
    label: 'Cold Storage',
    projects: [
      {
        client: 'Gateway Distriparks Ltd',
        type: 'Multilevel Cold Storage',
        location: 'Coimbatore, Tamil Nadu',
        area: '50,000 sq ft',
        tonnage: '150 MT',
        img: '/projects/gateway-distriparks.webp',
        details: ['Multilevel cold storage built in a windmill zone.'],
      },
      {
        client: 'Sumitra Agrotech Foodpark',
        type: 'Cold Storage',
        location: 'Mangaldoi, Assam',
        area: '16,500 sq ft',
        tonnage: '53 MT',
        img: '/projects/sumitra-cold-storage.webp',
        details: ['Part of the 20-acre food park: steel and civil design, steel supply and commissioning of 2,500+ tons, delivered in 2.5 years.'],
      },
    ],
  },
  {
    key: 'data-centre',
    label: 'Data Centre',
    projects: [
      {
        client: 'Iron Mountain',
        type: 'Data Centre',
        location: 'Jaipur, Rajasthan',
        area: '50,000 sq ft',
        tonnage: '111 MT',
        img: '/projects/iron-mountain.webp',
        duration: '105 days',
      },
    ],
  },
  {
    key: 'medical-infrastructure',
    label: 'Medical Infrastructure',
    projects: [
      {
        client: 'KIM – Kingsway Hospitals',
        type: 'Building Floors Over 140 ft',
        location: 'Nagpur, Maharashtra',
        area: '75,000 sq ft',
        tonnage: '480 MT',
        img: '/projects/kim-kingsway-hospitals.webp',
      },
    ],
  },
  {
    key: 'commercial',
    label: 'Commercial',
    projects: [
      {
        client: 'Mercedes-Benz (Central Star)',
        type: 'RCC & PEB Hybrid Showroom',
        location: 'Nagpur MIDC, Maharashtra',
        area: '9,000 sq ft',
        tonnage: '30 MT',
        img: '/projects/merc-benz.webp',
        details: ['Complex RCC-to-steel connections in a high-end automobile showroom.'],
      },
      {
        client: 'Arena (Pandya Automobiles)',
        type: 'RCC & PEB Hybrid Service Centre',
        location: 'Chhindwara, Madhya Pradesh',
        area: '24,000 sq ft',
        tonnage: '190 MT',
        img: '/projects/arena.webp',
      },
    ],
  },
  {
    key: 'residential',
    label: 'Residential',
    projects: [
      {
        client: 'Private Residence',
        type: 'Farmhouse',
        location: 'Borgaon, Nagpur',
        area: '7,000 sq ft',
        tonnage: '110 MT',
        img: '/projects/farmhouse.webp',
      },
    ],
  },
];
