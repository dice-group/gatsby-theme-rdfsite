<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Theme for creating RDF-based websites
</h1>

For usage instructions see [Gatsby RDFSite template](https://github.com/dice-group/gatsby-template-rdfsite).

## Layout

```shell
.
├── README.md
├── gatsby-theme-rdfsite
│   ├── data
│   ├── papers-to-ttl
│   ├── plugins/gatsby-transformer-rdf
│   ├── src
│   ├── gatsby-config.js
│   ├── gatsby-node.js
│   ├── index.js
│   ├── README.md
│   ├── package.json
│   └── tailwind.config.js
├── example
│   ├── data
│   ├── images
│   ├── pages
│   ├── src/gatsby-theme-rdfsite
│   ├── gatsby-config.js
│   ├── package.json
│   └── README.md
├── package.json
└── yarn.lock
```

### `gatsby-theme-rdfsite`

This directory is the theme package itself.

- `gatsby-theme-rdfsite/`
  - `data`: RDF folder with base classes and basic RDF structure used across all the generated websites.
  - `papers-to-ttl`: papers generation utility that queries Bibsonomy API and generates RDF with papers from it.
  - `plugins/gatsby-transformer-rdf`: Gatsby plugin that transforms RDF into GraphQL entries for Gatsby to consume.
  - `src`: source code with all the basic pages, components and templates used on the website.
  - `gatsby-config.js`: basic gatsby-config that includes all the required setup for RDF-based websites.
  - `gatsby-node.js`: basic gatsby-node config that includes page generation from RDF and Markdown resources.
  - `index.js`: since themes also function as plugins, this is an empty file that gatsby needs to use this theme as a plugin.
  - `package.json`: the dependencies that your theme will pull in when people install it. `gatsby` should be a `peerDependency`.
  - `tailwind.config.js`: basic Tailwind.css config for theme postcss build.

### `example`

This is an example usage of the theme.

- `example/`
  - `data`: RDF folder with website RDF data.
  - `images`: images folder with all the images that are used on the website.
  - `pages`: pages folder with all the markdown (MD or MDX) pages used on the website.
  - `src/gatsby-theme-rdfsite`: custom overrides folder for theme components.
  - `gatsby-config.js`: Specifies which theme to use as well as website metadata, colors, etc.

You can run the example with:

```shell
yarn workspace example develop
```
