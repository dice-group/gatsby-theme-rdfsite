import { Link } from 'gatsby';
import React from 'react';
import './customsection.css';

const CustomSection = React.forwardRef((_, ref) => {
  return (
    <div className="hero-body">
      <div className="container">
        <div className="section-header">
          <h1 className="title" ref={ref}>
            Custom area
          </h1>
          <Link className="link-more" to="/projects/">
            All projects →
          </Link>
        </div>

        <div className="research-areas-list">
          <div className="research-area-item research-area-rep">Some</div>
          <div className="research-area-item research-area-cnm">Custom</div>
          <div className="research-area-item research-area-op">Content</div>
          <div className="research-area-item research-area-expl">Here</div>
        </div>
      </div>
    </div>
  );
});

export default CustomSection;
