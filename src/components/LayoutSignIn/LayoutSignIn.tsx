import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import './LayoutSignIn.scss';

export function LayoutSignIn() {
  return (
    <div className="layout-auth">
      <Header />
      <div className="layout-auth__outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
