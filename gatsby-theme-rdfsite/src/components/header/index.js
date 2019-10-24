import { Link, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import Image from '../image';

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
            title
          }
        }
      }
    `
  );

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item no-opacity">
          <Image
            filename="site-icon.png"
            alt="Site logo"
            className="dice-nav-logo"
          />
          {site.title}
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
        id="navbarMenu"
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
          <div className="navbar-item no-opacity">
            <Link to="/contact/" className="button">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
