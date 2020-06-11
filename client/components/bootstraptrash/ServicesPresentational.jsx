// display details and data about each Pod
import React from 'react';

const Service = ({ name, type, namespace, port, clusterIP }) => {
  return (
    <tbody key={`tbody${i}`}>
      <tr>
        <td>{name}</td>
        <td>{type}</td>
        <td> {namespace}</td>
        <td>{port}</td>
        <td>{clusterIP}</td>
      </tr>
    </tbody>
  );
};
export default Service;
