/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { css, Global } from '@emotion/core';
import { MDXProvider } from '@mdx-js/react';
import { Link, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import ExternalLink from '../components/externalLink';
import Footer from './footer';
import Header from './header';
import Image from './image';
import './styles/main.scss';
import Table from './table';

const mdxComponents = { Image, Link, ExternalLink, Table };

const Layout = ({ children, withContainer = true }) => {
  const {
    site: {
      siteMetadata: { colors },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            colors {
              primary
              secondary
            }
          }
        }
      }
    `
  );

  console.log({ colors });

  return (
    <MDXProvider components={mdxComponents}>
      <Global
        styles={css`
          :root {
            --primary-color: #000;
            --accent-color: #999;
          }
        `}
      />
      <Header />
      {withContainer ? (
        <section className="section">
          <div className="container">{children}</div>
        </section>
      ) : (
        <>{children}</>
      )}
      <Footer />
    </MDXProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
