import React from "react";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ReactDOM from "react-dom";
import { Host } from './Host'
import { Join } from './Join'
import { Start } from './Start'
import reducer, { useSelector } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools())

// work out if we're hosting or joinging
const search = document.location.search;
const host = new URLSearchParams(search).get('host');
const join = new URLSearchParams(search).get('join');

const App = () =>
    <Provider store={store}>
        {!host && !join && <Start />}
        {host && <Host name={host} />}
        {join && <Join name={join} />}

        <Connection />
    </Provider>

const Connection = () => {
    const { error, uuid, active } = useSelector(a => a.connection)

    if (!active) { return null }

    if (error) {
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
