import { graphql } from 'gatsby';
import React from 'react';
import ReactMarkdown from '../components/markdown';
import BackButton from '../components/backButton';
import Image from '../components/image';
import Layout from '../components/layout';
import PapersFilter from '../components/papers/filter';
import Paper from '../components/papers/paper';
import Phone from '../components/phone';
import SEO from '../components/seo';

export default function PersonTemplate({ data: { rdf, allRdf } }) {
  const {
    data: { content, name, namePrefix, role, phone, email, photo, jsonld },
  } = rdf;
  const { edges } = allRdf;
  console.log(jsonld);
  return (
    <Layout>
      <SEO title={`${namePrefix} ${name}`} jsonld={jsonld} />
      <div className="content person-page">
        <BackButton />

        <h1 className="header">Profile page</h1>

        <div className="person-info">
          <div className="person-image">
            <Image
              filename={photo}
              alt={`${namePrefix} ${name} photo`}
              style={{ width: 300 }}
            />
          </div>

          <div className="person-data">
            <h2>
              {namePrefix} {name}
            </h2>
            <p className="role">{role.data.name}</p>
            {email && (
              <div className="meta">
                <div className="meta-label">Email</div>
                <div className="meta-value">
                  <a href={email}>{email.replace('mailto:', '')}</a>
                </div>
              </div>
            )}
            {phone && phone.replace('tel:', '') && (
              <div className="meta">
                <div className="meta-label">Phone</div>
                <div className="meta-value">
                  <Phone phone={phone} />
                </div>
              </div>
            )}
          </div>
        </div>
        {content && (
          <div className="person-content">
            {content.map((mdString, i) => (
              <ReactMarkdown key={`content_${i}`} source={mdString} />
            ))}
          </div>
        )}


        {edges && edges.length > 0 && (
          <>
            <h1>Publications</h1>
            <PapersFilter limit={5} edges={edges}>
              {papers =>
                papers.map(({ node }) => (
                  <Paper key={node.id} data={node.data} />
                ))
              }
            </PapersFilter>
          </>
        )}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    rdf(path: { eq: $path }) {
      data {
        content
        name
        namePrefix
        phone
        email
        photo
        jsonld
        role {
          data {
            name
          }
        }
      }
    }
    allRdf(
      filter: {
        data: {
          rdf_type: {
            elemMatch: {
              id: { eq: "https://schema.dice-research.org/Publication" }
            }
          }
          author: { elemMatch: { path: { eq: $path } } }
        }
      }
    ) {
      edges {
        node {
          data {
            type
            title
            publicationType
            year
            source
            url
            tag
            bibsonomyId
            author {
              id
              path
              data {
                name
              }
            }
            authorName
          }
          id
        }
      }
    }
  }
`;
