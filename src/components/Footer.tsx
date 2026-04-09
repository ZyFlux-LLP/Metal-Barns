export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-top">
        <div>
          <h2 className="footer-cta text-mask">
            <span>Build</span> <span>With</span>
            <br />
            <span style={{ color: 'var(--brand-blue)' }}>MBI.</span>
          </h2>
        </div>

        <div className="footer-contact gsap-fade-up">
          <h4>Registered Office</h4>
          <p>
            W 12/12 MIDC, Hingna Road Area,
            <br />
            Nagpur - 440016, Maharashtra
          </p>
          <a href="tel:+917620044077">+91 76200 44077</a>
          <a href="mailto:info@metalbarns.in" style={{ fontSize: '1rem' }}>
            info@metalbarns.in
          </a>
        </div>

        <div className="footer-contact gsap-fade-up">
          <h4>Unit II</h4>
          <p>
            Plot No 613-616, Near Mohpa ST Bus Stand,
            <br />
            Kalmeshwar Saoner Road,
            <br />
            District - Nagpur
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Metal Barns India. ISO 9001:2015 Certified.</p>
        <p>
          Designed &amp; Developed by <strong>Zyflux</strong>
        </p>
      </div>
    </footer>
  );
}
