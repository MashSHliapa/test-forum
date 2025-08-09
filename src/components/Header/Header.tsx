import { NavLink } from 'react-router-dom';
import burger from '../../assets/icons/burger.svg';
import './Header.scss';

export function Header() {
  return (
    <header className="header">
      <div className="header__container _container">
        <div className="header__body">
          <div className="header__logo">test-forum</div>
          <nav className="header__navbar">
            <NavLink to="/" className="header__item link">
              Избранное
            </NavLink>
          </nav>
          <div className="header__burger">
            <img src={burger} alt="burger" />
          </div>
        </div>
      </div>
    </header>
  );
}
