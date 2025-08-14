import { NavLink } from 'react-router-dom';
import { Filter } from '../Filter/Filter';
import burger from '../../assets/icons/burger.svg';
import './Header.scss';

export function Header() {
  return (
    <header className="header">
      <div className="header__container _container">
        <div className="header__body">
          <div className="header__logo">test-forum</div>
          <nav className="header__navbar">
            <div className="header__filter">
              <Filter />
            </div>
            <NavLink to="/" className="header__item link">
              Posts
            </NavLink>
            <NavLink to="/users" className="header__item link">
              Users
            </NavLink>
            <NavLink to="/create-post" className="header__item link">
              New Post
            </NavLink>
            <NavLink to="/favorites" className="header__item link">
              Favorites
            </NavLink>
            <NavLink to="/personal-account" className="header__item link">
              Account
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
