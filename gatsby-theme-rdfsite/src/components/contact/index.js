import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Image from '../image';
import Phone from '../phone';

const contactsQuery = graphql`
  {
    allRdf(
      filter: {
        data: {
          rdf_type: {
            elemMatch: { id: { eq: "https://schema.dice-research.org/Person" } }
          }
          contact: {
            id: {
              in: [
                "https://dice-research.org/MainContact"
                "https://dice-research.org/AdditionalContact"
              ]
            }
          }
        }
      }
    ) {
      edges {
        node {
          path
          data {
            name
            namePrefix
            phone
            email
            photo
            role {
              data {
                name
              }
            }
            contact {
              id
            }
          }
        }
      }
    }
  }
`;

const ContactForm = () => {
  const {
    allRdf: { edges },
  } = useStaticQuery(contactsQuery);

  const mainProfile = edges.find(
    ({ node }) =>
      node.data.contact.id === 'https://dice-research.org/MainContact'
  ).node;
  const additionalProfile = edges.find(
    ({ node }) =>
      node.data.contact.id === 'https://dice-research.org/AdditionalContact'
  ).node;

  return (
    <div className="contacts">
      <div className="column">
        <div className="round-image">
          <Image
            filename={mainProfile.data.photo}
            alt={`${mainProfile.data.name} photo`}
          />
        </div>
        <p className="property-name">Head of DICE</p>
        <p className="property-value">
          {mainProfile.data.namePrefix} {mainProfile.data.name}
        </p>

        <p className="property-name">Email</p>
        <a className="property-value brand-color" href={mainProfile.data.email}>
          {mainProfile.data.email.replace('mailto:', '')}
        </a>

        <p className="property-name">Phone</p>
        <p className="property-value">
          <Phone phone={mainProfile.data.phone} />
        </p>
      </div>
      <div className="column">
        <div className="round-image">
          <Image
            filename={additionalProfile.data.photo}
            alt={`${additionalProfile.data.name} photo`}
          />
        </div>
        <p className="property-name">{additionalProfile.data.role.data.name}</p>
        <p className="property-value">
          {additionalProfile.data.namePrefix} {additionalProfile.data.name}
        </p>

        <p className="property-name">Email</p>
        <a
          className="property-value brand-color"
          href={additionalProfile.data.email}>
          {additionalProfile.data.email.replace('mailto:', '')}
        </a>

        <p className="property-name">Phone</p>
        <p className="property-value">
          <Phone phone={additionalProfile.data.phone} />
        </p>
      </div>
    </div>
  );
};

export default ContactForm;
