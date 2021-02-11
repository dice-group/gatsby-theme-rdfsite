#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const arg = require('arg');
const _ = require('lodash');
const fetch = require('isomorphic-unfetch');
const {
  Writer,
  DataFactory: { namedNode, literal, quad },
} = require('n3');

// get user and tags from cli
const args = arg({ '--config': String });
const [user, ...tags] = args._;
const configFile = args['--config'];
if ((!user || !tags || !tags.length) && !configFile) {
  console.log(`No user / tags or config specified! Exiting without doing work.

Either specify user and tags as arguments during next run, e.g.:
  > papers userName tag1 tag2 tag3
  
Or provide a config, e.g.:
  > papers --config=papers.json

Config should contain array of users and tags, e.g.:
  [{
    username: "my-bib-username",
    tags: ["tag1", "tag2"]
  }]
`);
  return process.exit(0);
}

// warn if both user and config are given
if (configFile && user) {
  console.log(
    `WARNING! Config file provided along with user and tags list.
  User and tags list WILL BE IGNORED.
  Using config file...`
  );
}

// create new config
let config = [];

// load config from file if given
if (configFile) {
  const configPath = path.join(process.cwd(), configFile);
  if (!fs.existsSync(configPath)) {
    console.log('ERROR! Given config file does not exist!');
    process.exit(1);
  }
  // require JSON config file
  config = require(configPath);
} else {
  // if config was not given - create new one from input
  config = [
    {
      username: user,
      tags,
    },
  ];
}

// construct paths
const baseFolder = path.join(process.cwd(), 'data');
const folder = path.join(baseFolder, 'papers');

// check if base folder exist
if (!fs.existsSync(baseFolder)) {
  console.log(`Data folder doesn't exist!
Make sure to run this script next to your ./data folder.`);
  return process.exit(1);
}

// check if papers folder exists - if not, create it
if (!fs.existsSync(folder)) {
  console.log(`Papers folder doesn't exist, creating new one..`);
  fs.mkdirSync(folder);
}

// default prefixes
const prefixes = {
  rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  dice: 'https://dice-research.org/',
  dicepapers: 'https://dice-research.org/papers/',
  schema: 'https://schema.dice-research.org/',
};

// writer config
const writerConfig = {
  format: 'Turtle',
  prefixes,
};

// basic url writer
const createUrlWriter = (writer, paperUrl) => (predicate, obj) => {
  // only write triples with non-null objects
  if (!obj || !obj.length) {
    return;
  }
  writer.addQuad(
    quad(namedNode(paperUrl), namedNode(predicate), namedNode(obj.trim()))
  );
};

// basic literal writer
const createLiteralWriter = (writer, paperUrl) => (predicate, obj) => {
  // only write triples with non-null objects
  if (!obj || !obj.length) {
    return;
  }
  writer.addQuad(
    quad(
      namedNode(paperUrl),
      namedNode(`${prefixes.schema}${predicate}`),
      literal(obj)
    )
  );
};

// main work function
const main = async () => {
  // create papers storage array
  const papers = [];

  // iterate over each user and fill papers array
  for (const configEntry of config) {
    // construct base url from config username
    const baseUrl = `https://www.bibsonomy.org/json/user/${configEntry.username}/`;

    // iterate over tags and fill papers array
    for (const tag of configEntry.tags) {
      const url = `${baseUrl}${tag}?items=1000`;
      const { items } = await fetch(url).then(async (r) => {
        if (r.status !== 200) {
          console.log(
            `Could not load papers! Status: ${r.status} ${r.statusText}`
          );
          return process.exit(1);
        }
        return r.json();
      });
      items.forEach((paper) => {
        // ignore papers that are already added
        if (papers.find((p) => p.id === paper.id)) {
          return;
        }

        papers.push(paper);
      });
    }
  }

  console.log(`Fetched ${papers.length} papers, processing...`);

  papers.forEach((paper) => {
    // create new turtle writer for paper
    const writer = new Writer(writerConfig);

    // generate a basename for file and URL
    const baseName = _.upperFirst(_.camelCase(paper.label));
    const baseFileName = paper.id.replace(
      paper.id.includes('/bibtex/')
        ? /https:\/\/www.bibsonomy.org\/bibtex\/(.+?)\/(.+)/
        : /https:\/\/www.bibsonomy.org\/url\/(.+?)\/(.+)/,
      '$1_$2'
    );

    // generate URL for paper
    const paperUrl = `${prefixes.dicepapers}${baseName}`;

    // create writer functions
    const writeUrl = createUrlWriter(writer, paperUrl);
    const writeLiteral = createLiteralWriter(writer, paperUrl);

    // write rdf:type info
    writeUrl(`${prefixes.rdf}type`, `${prefixes.schema}Publication`);

    // write base info
    writeLiteral('type', paper.type);
    writeLiteral('title', paper.label);
    writeLiteral('publicationType', paper['pub-type']);
    writeLiteral('year', paper.year);
    if (paper.booktitle || paper.journal) {
      writeLiteral('source', paper.booktitle || paper.journal);
    }
    if (paper.tags && paper.tags.length > 0) {
      paper.tags.forEach((tag) => {
        writeLiteral('tag', tag);
      });
    }
    writeUrl(`${prefixes.schema}url`, paper.url);
    writeUrl(`${prefixes.schema}bibsonomyId`, paper.id);
    writeUrl(`${prefixes.schema}pdfUrl`, paper['bdsk-url-1'] || paper['1']);
    if (paper.authors && paper.authors.length > 0) {
      // write URLs that link to our website
      paper.authors.forEach((author) => {
        const name = _.upperFirst(_.camelCase(author.first + author.last));
        writeUrl(`${prefixes.schema}author`, `${prefixes.dice}${name}`);
      });
      // write plaintext names
      paper.authors.forEach(({ first, last }) => {
        writeLiteral('authorName', `${first} ${last}`);
      });
    }

    writer.end((error, result) => {
      if (error) {
        throw error;
      }
      // generate filename
      const filename = `${baseFileName}.ttl`;
      const filepath = path.join(folder, filename);
      // write result
      fs.writeFile(filepath, result, (err) => {
        if (err) {
          throw err;
        }
      });
    });
  });

  console.log('Done!');
};

main();
