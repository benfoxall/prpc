import React from "react";

export const Start = () => {
  return (
    <div className="Start">
      <h2>Start a server</h2>
      <code>
        {document.location.host}/host/<span>[code]</span>
      </code>

      <h2>Join a server</h2>
      <code>
        {document.location.host}/<span>[code]</span>
      </code>
    </div>
  );
};
