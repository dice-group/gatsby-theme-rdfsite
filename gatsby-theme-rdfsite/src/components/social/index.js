import { graphql, useStaticQuery } from 'gatsby';
import _ from 'lodash';
import React, { useMemo } from 'react';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

const icons = {
  twitter: FaTwitter,
  github: FaGithub,
  facebook: FaFacebook,
  youtube: FaYoutube,
  instagram: FaInstagram,
};

const Social = ({ style, className, hiddenMobile = true }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            social {
              twitter
              github
              facebook
              youtube
              instagram
            }
          }
        }
      }
    `
  );

  const links = useMemo(
    () =>
      Object.keys(site.siteMetadata.social)
        .filter(
          key =>
            site.siteMetadata.social[key] &&
            site.siteMetadata.social[key].length > 0
        )
        .map(key => ({
          url: site.siteMetadata.social[key],
          text: _.capitalize(key),
          icon: icons[key],
        })),
    [site.siteMetadata.social]
  );

  return (
    <div
      className="column social"
      style={{
        position: 'fixed',
        left: 0,
        top: 96,
        height: 'calc(60% - 96px)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        maxWidth: 50,
        margin: '0.5em',
        ...style,
      }}>
      {links.map(l => (
        <a key={l.url} href={l.url} title={l.text}>
          <span className="icon is-large">
            <l.icon size={25} />
          </span>
        </a>
      ))}
    </div>
  );
};

export default Social;
