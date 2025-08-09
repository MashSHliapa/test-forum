import './Footer.scss';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container _container">
        <div className="footer__separator"></div>
        <div className="footer__body">
          <p className="footer__copyright">test-forum {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
