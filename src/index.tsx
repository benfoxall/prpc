import React from "react";
import ReactDOM from "react-dom";
import { Host } from './Host'
import { SignalClient } from "./lib/signal";

// work out if we're hosting or joinging
const search = document.location.search;
const host = new URLSearchParams(search).get('host');
const join = host ? null : search.slice(1) || null

console.log(join, host)

if (host) {
    const client = new SignalClient(host)

    client.on("data", (message, from) => {
        console.log(message, from)
    })

    //@ts-ignore
    window.client = client;

}

const App = () =>
    <>
        <h1>Web Browser Server</h1>
        <form>
            <input name="host" />
            <button>Start</button>
        </form>

        {host && <Host name={host} />}
    </>


ReactDOM.render(<App />, document.getElementById("root"));
