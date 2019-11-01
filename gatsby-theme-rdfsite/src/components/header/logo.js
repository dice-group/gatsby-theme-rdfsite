import React from 'react';
import Image from '../image';

export default ({ site }) => (
  <>
    <Image
      filename="site-icon.png"
      alt="Site logo"
      className="dice-nav-logo"
      style={{ width: 50 }}
    />
    <span className="ml-3">{site.siteName}</span>
  </>
);
