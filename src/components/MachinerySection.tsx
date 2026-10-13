'use client';

import { useState } from 'react';

type Category = 'fab' | 'site';
type Machine = { img: string; name: string; desc: string; cat: Category };

const machines: Machine[] = [
  { img: '/machinery/spiro-tornado.webp', name: 'Spiro-Tornado CNC Welder', desc: 'Automated submerged arc welding system for precision beam fabrication at scale.', cat: 'fab' },
  { img: '/machinery/laser-cutter.webp', name: 'WinArc Laser Cutting System', desc: 'High-speed fiber laser cutting for precise steel plate and section profiling.', cat: 'fab' },
  { img: '/machinery/shearing-machine.webp', name: 'EnergyMission Hydraulic Shear', desc: 'Heavy-duty hydraulic plate shearing for high-volume steel sheet processing.', cat: 'fab' },
  { img: '/machinery/bolt-lathe.webp', name: 'Bolt Threading Lathe', desc: 'Precision bolt and rod threading for structural connection hardware.', cat: 'fab' },
  { img: '/machinery/punch-machine.jpg', name: 'BMI Multi Steelworker', desc: 'Combined punch, shear, and notch machine for structural steel processing.', cat: 'fab' },
  { img: '/machinery/robot-welding.webp', name: 'Robotic Welding Arm', desc: 'Yaskawa robotic welder delivering consistent, high-quality weld seams at speed.', cat: 'fab' },
  { img: '/machinery/purlin-forming.jpg', name: 'C-Purlin Roll Former', desc: 'Roll forming machine producing precision C & Z purlins for roofing and cladding systems.', cat: 'fab' },
  { img: '/machinery/field-truck-crane.webp', name: 'Telescopic Truck Crane', desc: 'Mobile hydraulic crane for lifting and placing columns, rafters and heavy sections on site.', cat: 'site' },
  { img: '/machinery/field-boom-lift.webp', name: 'Articulating Boom Lift', desc: 'Aerial work platform for reaching eaves, ridge and cladding at height during erection.', cat: 'site' },
  { img: '/machinery/field-scissor-lift.webp', name: 'Scissor Lift', desc: 'Stable vertical platform for purlin fixing, sheeting and overhead work inside the shed.', cat: 'site' },
  { img: '/machinery/field-telehandler.webp', name: 'Telescopic Handler', desc: 'Rough-terrain telehandler for moving and positioning sheets, purlins and materials on site.', cat: 'site' },
  { img: '/machinery/field-forklift.webp', name: 'Heavy-Duty Forklift', desc: 'High-capacity forklift for loading, unloading and yard handling of fabricated steel.', cat: 'site' },
];

const tabs: { id: 'all' | Category; label: string }[] = [
  { id: 'all', label: 'All Equipment' },
  { id: 'fab', label: 'In-House Fabrication' },
  { id: 'site', label: 'Site & Erection' },
];

const catLabel: Record<Category, string> = { fab: 'Fabrication', site: 'Site & Erection' };

export default function MachinerySection() {
  const [tab, setTab] = useState<'all' | Category>('all');
  const visible = machines.filter((m) => tab === 'all' || m.cat === tab);
  const count = (c: Category) => machines.filter((m) => m.cat === c).length;

  return (
    <section className="mach" id="machinery">
      <div className="mach-head">
        <div>
          <p className="section-eyebrow">Equipment</p>
          <h2>Our Machinery</h2>
          <p className="mach-lead">
            In-house fabrication equipment and site erection fleet, built for precision, quality
            and delivery at scale.
          </p>
        </div>
        <dl className="mach-stats">
          <div>
            <dt>{count('fab')}</dt>
            <dd>Fabrication machines</dd>
          </div>
          <div>
            <dt>{count('site')}</dt>
            <dd>Site & erection equipment</dd>
          </div>
        </dl>
      </div>

      <div className="mach-tabs" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`mach-tab${tab === t.id ? ' active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mach-grid" key={tab}>
        {visible.map((m, i) => (
          <article className={`mach-card ${m.cat}`} key={m.name} style={{ animationDelay: `${i * 60}ms` }}>
            <div className="mach-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.img} alt={m.name} loading="lazy" />
              <span className="mach-badge">{catLabel[m.cat]}</span>
            </div>
            <div className="mach-info">
              <h4>{m.name}</h4>
              <p>{m.desc}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="machinery-credit">
        Site equipment photos via Wikimedia Commons (CC0, CC BY-SA, public domain): Genie S-65 boom lift, JCB S1930E
        scissor lift, JCB telehandler, Komatsu forklift and telescopic truck crane.
        Images are illustrative of equipment types used in the field.
      </p>
    </section>
  );
}
