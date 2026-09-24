export type Project = {
  client: string;
  type: string;
  location: string;
  area: string;
  tonnage: string;
  img?: string;
  logo?: string;
  note?: string;
};

export type ProjectClass = {
  key: string;
  label: string;
  projects: Project[];
};

export const projectClasses: ProjectClass[] = [
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
      },
      {
        client: 'Sumitra Agrotech Foodpark',
        type: 'Cold Storage',
        location: 'Mangaldoi, Assam',
        area: '16,500 sq ft',
        tonnage: '53 MT',
        logo: '/clients/srd-group-logo-retina.png',
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
      },
    ],
  },
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
      },
      {
        client: 'Himalaya Agro Industries',
        type: 'Warehouse',
        location: 'Purnia, Bihar',
        area: '25,000 sq ft',
        tonnage: '75 MT',
        img: '/projects/himalaya-agro.webp',
      },
      {
        client: 'DRDO-HAL Campus',
        type: 'Aircraft Hangar Doors',
        location: 'Bengaluru, Karnataka',
        area: '13,000 sq ft',
        tonnage: '99 MT',
        img: '/projects/drdo-hal-campus.webp',
      },
      {
        client: 'Snowman Logistics Ltd',
        type: 'Warehouse Built Over Roof',
        location: 'Mumbai, Maharashtra',
        area: '30,000 sq ft',
        tonnage: '60 MT',
        img: '/projects/snowman.webp',
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
        logo: '/clients/srd-group-logo-retina.png',
      },
      {
        client: 'Repose Bake House',
        type: 'Factory',
        location: 'Mangaldoi, Assam',
        area: '27,705 sq ft',
        tonnage: '85.8 MT',
        logo: '/clients/repose-bake-house.png',
      },
      {
        client: 'SRD Bakers, Unit 2',
        type: 'Factory',
        location: 'Mangaldoi, Assam',
        area: '9,308 sq ft',
        tonnage: '38.35 MT',
        logo: '/clients/srd-group-logo-retina.png',
      },
      {
        client: 'North East Global Company',
        type: 'Factory',
        location: 'Mangaldoi, Assam',
        area: '11,818 sq ft',
        tonnage: '118.6 MT',
        logo: '/clients/negc.webp',
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
        logo: '/clients/srd-group-logo-retina.png',
      },
      {
        client: 'Kirti Oil Industries Pvt Ltd',
        type: 'Warehouse, Dry & Cleaning and Machine Platforms',
        location: 'Ambajogai, Barshi, Udgir, Parbhani, Hinganghat & Karanja, Maharashtra',
        area: '6,98,000 sq ft',
        tonnage: '2,260 MT',
        logo: '/clients/kirti-oil.png',
        note: 'Still from the video — one of MBI\'s largest single-client rollouts across 6 locations.',
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
