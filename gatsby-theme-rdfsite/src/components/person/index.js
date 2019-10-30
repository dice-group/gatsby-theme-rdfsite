import { Link } from 'gatsby';
import React from 'react';
import Image from '../image';

const WrapLink = ({ person, children }) =>
  person.link && person.link.length > 0 ? (
    <a href={person.link}>{children}</a>
  ) : (
    <Link to={person.path}>{children}</Link>
  );

export const Person = ({ person }) => (
  <WrapLink person={person}>
    <div className="person">
      <div className="person-image">
        <Image
          filename={person.photo}
          alt={`${person.name} photo`}
          style={{ width: 160 }}
        />
      </div>
      <span className="link">
        {person.namePrefix} {person.name}
      </span>
    </div>
  </WrapLink>
);

export const rdfToPerson = ({ data, path }) => ({
  ...data,
  path: path,
  projects: data.projects
    ? data.project.map(p => ({
        name: p.data.name,
        path: p.path,
      }))
    : [],
  role: data.role ? data.role.data : {},
});

export const rdfToPeopleArray = edges =>
  edges.map(n => n.node).map(rdfToPerson);
