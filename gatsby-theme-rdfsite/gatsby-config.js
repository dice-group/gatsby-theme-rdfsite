module.exports = {
  plugins: [
    // RDF processing
    // theme base data
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `rdfData`,
        path: `${__dirname}/data`,
      },
    },
    // user data
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `rdfData`,
        path: `./data`,
      },
    },
    // `gatsby-transformer-rdf`,
    {
      // Standard plugin with options example
      resolve: require.resolve(`./plugins/gatsby-transformer-rdf`),
    },

    // mdx processing
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `./pages`,
      },
    },
    `gatsby-plugin-mdx`,

    // svg inlining
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },

    // postcss support
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/components/styles/main.css`],
      },
    },

    // emotion styling support
    `gatsby-plugin-emotion`,

    // default gatsby plugins
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `./images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        start_url: `/`,
        background_color: `#50b4c8`,
        theme_color: `#50b4c8`,
        display: `minimal-ui`,
        icon: `./images/site-icon.png`,
      },
    },
  ],
};
