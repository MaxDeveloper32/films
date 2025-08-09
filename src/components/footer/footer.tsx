import Logo from '../header/logo';
import './footer.css';


const Footer = () => (
  <footer className="footer">
    <section className="footer__logo logo logo--smaller">
      <Logo />
    </section>
    <section className="footer__statistics">
      <p>130 291 movies inside</p>
    </section>
  </footer>
);

export default Footer;
