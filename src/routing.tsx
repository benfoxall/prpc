import React, { FunctionComponent, MouseEventHandler } from 'react'
import { useDispatch } from 'react-redux';
import { Actions } from './reducers/route';
import { useSelector } from './reducers';


export const LinkTo: FunctionComponent<{ href: string }> = ({ href, children }) => {

    const dispatch = useDispatch();
    const current = useSelector(app => app.route.path)

    const handle: MouseEventHandler = (e) => {
        e.preventDefault()
        dispatch({ type: Actions.SET_PATH, payload: href });
    }

    return <a href={href} className={href === current ? 'active' : ''} onClick={handle}>{children}</a>

}

export const Route: FunctionComponent<{ path: string }> = ({ path, children }) => {

    const current = useSelector(app => app.route.path)

    console.log(current)

    return current == path ? <>{children}</> : null;
}
