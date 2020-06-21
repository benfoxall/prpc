import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { Host } from "./Host";
import { Join } from "./Join";
import { Start } from "./Start";
import reducer, { useSelector } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const logger = (store) => (next) => (action) => {
  console.log("%c" + action.type, "color: #f08", action.payload || "");

  return next(action);
};

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger))
);

// work out if we're hosting or joining
const path = document.location.pathname;
const hostR = path.match(/^\/host\/(\w+)/);
const host = hostR && hostR[1];
const joinR = path.match(/^\/(\w+)/);
const join = host ? null : joinR && joinR[1];

const App = () => (
  <Provider store={store}>
    {!host && !join && <Start />}
    {host && <Host name={host} />}
    {join && <Join name={join} />}

    <Connection />
  </Provider>
);

const Connection = () => {
  const connection = useSelector((a) => a.connection);

  const { error, uuid, active, connections } = connection;

  if (!active) {
    return null;
  }

  if (error) {
    return (
      <footer className="Connection error">
        <h2>{String(error)}</h2>
      </footer>
    );
  }

  if (connection.connectionType === "server") {
    return (
      <footer className="Connection">
        <h1>
          <a href={document.location.origin + "/" + uuid} target="_blank">
            {document.location.host}/{uuid}
          </a>
        </h1>
        <h3>
          [ws {connection.wsState ? "⚡️" : "❌"}] [{connections} Peer Client
          {connections !== 1 ? "s" : ""}]
        </h3>
      </footer>
    );
  }

  return (
    <footer className="Connection">
      <h2>client: {uuid || "_"}</h2>
      <h3>
        [web {connection.wsState ? "✅️" : "❌"}] [peer{" "}
        {connection.dcState ? "✅️" : "❌"}]
      </h3>
    </footer>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
