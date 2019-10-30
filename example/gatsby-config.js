module.exports = {
  siteMetadata: {
    title: `Example RDF website`,
    siteName: 'EXAMPLE',
    description: `Example RDF website generated with Gatsby`,
    author: `@yamalight`,
    footer: `Example footer text`,
    social: {
      twitter: 'https://twitter.com/knowgraphs',
      github: 'https://github.com/test',
      facebook: '',
      youtube: '',
      instagram: '',
    },
    colors: {
      primary: '',
      accent: '',
      brightText: '',
      darkText: '',
    },
  },
  plugins: [{ resolve: `gatsby-theme-rdfsite`, options: {} }],
};
