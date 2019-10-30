import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

const Image = ({ filename, alt, style, className = 'image' }) => {
  // pre-calculate all images data
  // this is required because currently Gatsby don't understand
  // dynamic queries on the build time
  const {
    allImageSharp: { edges: images },
  } = useStaticQuery(graphql`
    query {
      allImageSharp {
        edges {
          node {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);

  // find image that user wanted by matching path end
  let imageEl =
    filename && filename.length > 0
      ? images.find(element => element.node.fluid.src.endsWith(`/${filename}`))
      : undefined;

  // if image is not found - default to project logo
  if (!imageEl) {
    const projectLogo = images.find(element =>
      element.node.fluid.src.endsWith(`/site-icon.png`)
    );

    // if project logo not found - default to empty span
    if (!projectLogo) {
      return <span />;
    }

    imageEl = projectLogo;
  }

  const image = imageEl.node.fluid;
  return (
    <Img
      className={className}
      fluid={image}
      objectFit="cover"
      alt={alt}
      style={style}
    />
  );
};

export default React.memo(Image);
