module.exports = {
  siteMetadata: {
    title: `Example RDF website`,
    description: `Example RDF website generated with Gatsby`,
    author: `@yamalight`,
    footer: `Example footer text`,
    social: {
      twitter: 'https://twitter.com/test',
      github: 'https://github.com/test',
      facebook: '',
      youtube: '',
      instagram: '',
    },
    colors: {
      primary: '',
      secondary: '',
    },
  },
  plugins: [{ resolve: `gatsby-theme-rdfsite`, options: {} }],
};
