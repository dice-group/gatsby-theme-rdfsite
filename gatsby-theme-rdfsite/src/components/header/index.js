import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import Logo from './logo';

const links = [
  { url: '/', text: 'Home' },
  { url: '/team/', text: 'Team' },
  { url: '/partners/', text: 'Partners' },
  { url: '/publications/', text: 'Publications' },
  { url: '/deliverables/', text: 'Deliverables' },
];

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const {
    site: { siteMetadata: site },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteName
          }
        }
      }
    `
  );

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-brand-item">
          <Logo site={site} />
        </Link>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenu"
          onClick={() => setExpanded(!expanded)}>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div
        id="navbar-menu"
        className={`navbar-menu ${expanded ? 'is-active' : ''}`}>
        <div className="navbar-start">
          {links.map(l => (
            <Link
              key={l.url}
              to={l.url}
              className="navbar-item"
              activeClassName="is-active"
              partiallyActive={l.url !== '/'}>
              {l.text}
            </Link>
          ))}
        </div>

        <div className="navbar-end">
          <div className="navbar-item is-active">
            <Link to="/contact/" className="contact-button">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
