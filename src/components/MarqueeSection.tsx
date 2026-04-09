const clients = [
  { src: '/clients/mercedes.webp', alt: 'Mercedes-Benz' },
  { src: '/clients/lt.png', alt: 'L&T' },
  { src: '/clients/raymond.png', alt: 'Raymond' },
  { src: '/clients/iron-mountain.png', alt: 'Iron Mountain' },
  { src: '/clients/siemens.png', alt: 'Siemens' },
  { src: '/clients/jj.png', alt: 'Johnson & Johnson' },
  { src: '/clients/paper-boat.png', alt: 'Paper Boat' },
  { src: '/clients/gateway.png', alt: 'Gateway Distriparks' },
  { src: '/clients/calderys.png', alt: 'Calderys' },
  { src: '/clients/simplex.png', alt: 'Simplex Infrastructures' },
  { src: '/clients/drdo.png', alt: 'DRDO' },
  { src: '/clients/act2.png', alt: 'Act II' },
  { src: '/clients/srd.png', alt: 'SRD' },
  { src: '/clients/hni.png', alt: 'HNI bpergo' },
  { src: '/clients/thermit.png', alt: 'Thermit' },
];

const ClientLogos = () => (
  <>
    {clients.map((c) => (
      <div className="client-logo" key={c.alt}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.src} alt={c.alt} />
      </div>
    ))}
  </>
);

export default function MarqueeSection() {
  return (
    <section className="marquee-container" id="brands">
      <div className="marquee-label">Our Clients</div>
      <div className="marquee">
        <div className="marquee-track">
          <ClientLogos />
        </div>
        <div className="marquee-track">
          <ClientLogos />
        </div>
      </div>
    </section>
  );
}
