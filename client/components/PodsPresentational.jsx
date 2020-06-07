// display details and data about each Pod
import React from "react";

const Pod = ({ name, namespace, podIP, createdAt, status }) => {
  if (status === "Running") {
    return (
      <tbody key={`tbody${i}`}>
        <tr>
          <td>{name}</td>
          <td>{namespace}</td>
          <td> icon goes here</td>
          <td>{podIP}</td>
          <td>{createdAt}</td>
        </tr>
      </tbody>
    );
  } else {
    // if not "Running", render red circle(maybe trigger alert?)
    //addAlert(p);???
    return (
      <tbody key={`tbody${i}`}>
        <tr>
          <td>{name}</td>
          <td>{namespace}</td>
          <td>red icon goes here on !status</td>
          <td>{podIP}</td>
          <td>{createdAt}</td>
        </tr>
      </tbody>
    );
  }
};

export default Pod;
