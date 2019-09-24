import React, { useState, ChangeEventHandler } from 'react';

export const Start = () => {

    const [code, setCode] = useState('')

    const change: ChangeEventHandler<HTMLInputElement> = (e) =>
        setCode(
            e.target.value.replace(/\W/, '').toLowerCase()
        )

    return (
        <div className="Start">

            <h2>Start a server</h2>
            <code>{document.location.host}/host/<span>[code]</span></code>

            <h2>Join a server</h2>
            <code>{document.location.host}/<span>[code]</span></code>
        </div>
    )
}
