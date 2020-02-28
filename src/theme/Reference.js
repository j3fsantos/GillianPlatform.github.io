import React, { Fragment } from 'react';

export default ({ publi }) => {

  return (
    <Fragment>
      <h3>Authors</h3>
      <ul>
        {publi.authors.map(x => (
          <li key={x}>{x}</li>
        ))}
      </ul>
      <h3 sidebar_label="Abstract">Abstract</h3>
      <p>{publi.abstract}</p>
      <h3>Venue</h3>
      <p>{publi.venue}</p>
      <h3>Publication Date</h3>
      <p>{publi.date}</p>
      <h3>Identifiers</h3>
      <ul>
        {Object.entries(publi.identifiers).map(([k, { name, link }]) => (
          <li key={k}>
            {k}:<a href={link}>{name}</a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};
