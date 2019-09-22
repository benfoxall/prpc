import React, { useState, ChangeEventHandler } from 'react';

export const Start = () => {

    const [code, setCode] = useState('')

    const change: ChangeEventHandler<HTMLInputElement> = (e) =>
        setCode(
            e.target.value.replace(/\W/, '').toLowerCase()
        )

    return (
        <form className="start">
            <h1>Web Browser Server</h1>
            <input name="join" autoComplete="off" placeholder="code" value={code} onChange={change} />
            <button>Connect</button>
        </form>
    )
}
