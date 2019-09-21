import React from "react";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ReactDOM from "react-dom";
import { Host } from './Host'
import { Start } from './Start'
import { SignalClient } from "./lib/signal";
import reducer, { useSelector } from './reducers'
import { devToolsEnhancer, composeWithDevTools } from 'redux-devtools-extension';
import { SET_UUID, SET_ERROR } from "./reducers/connection";

const store = createStore(reducer, composeWithDevTools())

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

    client.twillio
        .then(s => {console.log("📞", s)})

    client.auth
        .then(s => {
            store.dispatch({
                type: SET_UUID,
                payload: s
            })
        })
        .catch(s => {
            store.dispatch({
                type: SET_ERROR,
                payload: s
            })
        })


    //@ts-ignore
    window.client = client;

}

const App = () => 
    <Provider store={store}>
        {!host && !join && <Start />}
        {host && <Host name={host} />}

        <Connection />
    </Provider>

const Connection = () => {
    const {error, uuid} = useSelector(a => a.connection)

    if(error) {
        return (
            <footer className="Connection error">
                <h2>{String(error)}</h2>
            </footer>
        )
    }

    return (
        <footer className="Connection">
            <h2>
                {uuid ? '⚡️' : '👋'} 
                <span>{uuid}</span> 
            </h2>
        </footer>
    )
}


ReactDOM.render(<App />, document.getElementById("root"));
