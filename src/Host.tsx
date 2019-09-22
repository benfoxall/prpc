import React, { FunctionComponent, useEffect, useMemo, MouseEventHandler } from 'react';
import { usePeerServer } from './lib/hooks';
import { Dev } from './lib/protos/generated/dev_pb_service';
import { useSelector } from './reducers';
import { useDispatch } from 'react-redux';
import { Actions } from './reducers/route';

export const Host: FunctionComponent<{ name: string }> = ({ name }) => {

    const peerServer = usePeerServer(name);

    useEffect(() => {

        if (!peerServer) return;

        peerServer.addService(Dev, {
            Background: (e) => {
                document.body.style.background = e.getValue();
            }
        })


        // @ts-ignore
        window.server = peerServer
    }, [peerServer])


    const route = useSelector(app => app.route)

    return (
        <main className="Host">
            <h2>
                <LinkTo href="/">⤶</LinkTo> {route.path}
            </h2>



            <ul>
                <li>
                    <LinkTo href="/Debug">Debug</LinkTo>
                </li>

                <li>
                    <LinkTo href="/Chat">Chat</LinkTo>
                </li>

                <li>
                    <LinkTo href="/Trails">Trails</LinkTo>
                </li>
            </ul>

            <h2>PATH {route.path}</h2>

            <Route path="/Debug" >
                <h1>This is the debug panel</h1>
            </Route>


        </main>
    )
}



const LinkTo: FunctionComponent<{ href: string }> = ({ href, children }) => {

    const dispatch = useDispatch();
    const current = useSelector(app => app.route.path)

    const handle: MouseEventHandler = (e) => {
        e.preventDefault()
        dispatch({ type: Actions.SET_PATH, payload: href });
    }

    return <a href={href} className={href === current ? 'active' : ''} onClick={handle}>{children}</a>

}

const Route: FunctionComponent<{ path: string }> = ({ path, children }) => {

    const current = useSelector(app => app.route.path)

    console.log(current)

    return current == path ? <>{children}</> : null;
}
