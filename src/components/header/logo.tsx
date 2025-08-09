import classNames from 'classnames';
import { Link } from 'react-router-dom';

type LogoProps = {
  isActive?: boolean;
}

const Logo = ({isActive}: LogoProps) => (
  <Link
    to='/'
    className={classNames(
      'header__logo logo',
      {'header__logo--active': isActive}
    )}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="300" height="150">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6A0DAD" />
          <stop offset="100%" stopColor="#B399D4" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="none" />
      <path d="M50,65 L30,50 L30,80 L50,65 Z M70,50 L70,80 L90,65 L70,50 Z M110,50 L110,80 L130,65 L110,50 Z"
        fill="url(#gradient)" stroke="#4B0082" strokeWidth="2"
      />
      <rect x="30" y="65" width="100" height="20" fill="none" stroke="#4B0082" strokeWidth="2" rx="2" />
      <text x="100" y="90" fontFamily="Arial, sans-serif" fontSize="25" fontWeight="bold"
        fill="#8A3E4D" textAnchor="middle"
      >FILM GRAND
      </text>
      <line x1="80" y1="100" x2="140" y2="100" stroke="#8A2BE2"
        strokeWidth="3" strokeLinecap="round"
      />
    </svg>
  </Link>
);

export default Logo;
