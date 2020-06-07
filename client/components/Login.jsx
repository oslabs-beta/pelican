import React from 'react';

export default () => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(evt);
  };

  return (
    <div id="login">
      <div id="app-name">
        <h1> finch </h1>
      </div>

      <form id="form" onSubmit={handleSubmit}>
        <div id="aws-logo">{/* <img src="../assets/aws-logo.png"> </img> */}</div>
        <div>
          <label htmlFor="accessKey"> Access Key </label>
          <input
            id="inputAccessKey"
            type="text"
            name="accessKey"
            required
            placeholder="Enter access key..."
          />
        </div>
        <div>
          <label htmlFor="secret"> Secret Access Key </label>
          <input
            id="secret"
            type="password"
            name="secret"
            placeholder="Enter secret access key..."
            required
          />
        </div>
        <div>
          <input id="login-button" type="submit" value="Authenticate" />
        </div>
      </form>
    </div>
  );
};
