import { Link } from 'gatsby';
import 'gatsby-theme-rdfsite/src/components/customSection/customsection.css';
import React from 'react';

const CustomSection = React.forwardRef((_, ref) => {
  return (
    <div className="hero-body">
      <div className="container">
        <div className="section-header">
          <h1 className="title" ref={ref}>
            Custom override
          </h1>
          <Link className="link-more" to="/projects/">
            All projects →
          </Link>
        </div>

        <div className="research-areas-list">
          <div className="research-area-item research-area-rep">1</div>
          <div className="research-area-item research-area-cnm">2</div>
          <div className="research-area-item research-area-op">3</div>
          <div className="research-area-item research-area-expl">4</div>
        </div>
      </div>
    </div>
  );
});

export default CustomSection;
