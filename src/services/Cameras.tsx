import React, { FunctionComponent, useContext, useMemo, useRef, useEffect, useState } from "react"
import { useSelector } from "../reducers"
import { ServerContext } from '../Host'
import { CameraService } from "../lib/protos/generated/cameras_pb_service"
import { useDispatch } from "react-redux"
import { ClientContext } from "../Join"
import { Actions } from "../reducers/route"



const Client: FunctionComponent = () => {
    const dispatch = useDispatch()

    const client = useContext(ClientContext);


    return (
        <div className="Camera">
            <div className="emoj">📷</div>
        </div>
    )
}



const Server: FunctionComponent = () => {
    const peerServer = useContext(ServerContext)

    const [timer, setTimer] = useState(8);
    const [selfie, setSelfie] = useState(false);

    return (
        <div className="Camera">

            <form>

                <button>
                    {selfie ? '🤳' : '📷'}
                </button>

                <label>
                    Timer:
                    <input type="number" min="0" max="20" value={timer} onChange={e => setTimer(e.target.valueAsNumber)} />
                    s
                </label>

                <label>
                    <input type="checkbox" checked={selfie} onChange={e => setSelfie(e.target.checked)} /> selfie
                </label>

            </form>




        </div>
    )

}



export const Cameras = { Server, Client }
