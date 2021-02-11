import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

const Image = ({ filename, alt, style, className = 'image' }) => {
  // pre-calculate all images data
  // this is required because currently Gatsby don't understand
  // dynamic queries on the build time
  const {
    allImageSharp: { edges: images },
    svgs: { edges: svgs },
  } = useStaticQuery(graphql`
    query {
      svgs: allFile(filter: { extension: { eq: "svg" } }) {
        edges {
          node {
            extension
            publicURL
          }
        }
      }

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
      ? images.find((element) =>
          element.node.fluid.src.endsWith(`/${filename}`)
        )
      : undefined;

  // find svg that user wanted by matching public URL end
  const svgEl =
    filename && filename.length > 0
      ? svgs.find(
          (element) =>
            element.node.publicURL.includes(filename.replace('.svg', '')) &&
            element.node.publicURL.endsWith('.svg')
        )
      : undefined;

  // if image is not found - default to project logo
  if (!imageEl && !svgEl) {
    const projectLogo = images.find((element) =>
      element.node.fluid.src.endsWith(`/site-icon.png`)
    );

    // if project logo not found - default to empty span
    if (!projectLogo) {
      return <span />;
    }

    imageEl = projectLogo;
  }

  // render svg if present
  if (svgEl) {
    const svgPath = svgEl.node.publicURL;
    return <img src={svgPath} alt={alt} style={style} />;
  }

  // render image otherwise
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
