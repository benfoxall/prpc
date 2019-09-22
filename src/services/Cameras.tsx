import React, { FunctionComponent, useContext, useMemo, useRef, useEffect, useState, FormEventHandler } from "react"
import { useSelector } from "../reducers"
import { ServerContext } from '../Host'
import { CameraService } from "../lib/protos/generated/cameras_pb_service"
import { useDispatch } from "react-redux"
import { ClientContext } from "../Join"
import { Actions } from "../reducers/route"



const Client: FunctionComponent = () => {
    const dispatch = useDispatch()
    const [showVideo, setShowVideo] = useState(false);
    const video = useRef<HTMLVideoElement>();
    const client = useContext(ClientContext);

    useEffect(() => {
        if (!client) return;

        const service = client.getService(CameraService)

        let stop = false

        const loop = async () => {
            const response = await service("Wait")

            if (stop || response.getCancel()) return;

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: false, video: { facingMode: response.getFacemode() }
                });

                const { current: videoEl } = video;

                videoEl.srcObject = stream;
                await new Promise(res => videoEl.onloadedmetadata = res);

                videoEl.play();

                setShowVideo(true);

                const delay = Math.max(response.getSeconds() * 1000, 500)
                await new Promise(res => setTimeout(res, delay))

                const targetHeight = 200;

                const canvas = document.createElement('canvas');
                canvas.width = (targetHeight / videoEl.videoHeight) * videoEl.videoWidth | 0;
                canvas.height = targetHeight;

                // debugger;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

                setShowVideo(false);

                stream.getVideoTracks().forEach(track => track.stop())


                const image: Blob | null = await new Promise(resolve => canvas.toBlob(resolve))

                const fr = new FileReader();
                fr.readAsArrayBuffer(image);

                await new Promise(resolve => fr.addEventListener("load", resolve))

                const u8 = new Uint8Array(fr.result as ArrayBuffer);


                await service("PostPhoto", req => {
                    req.setType(image.type)
                    req.setData(u8)
                })


            } catch (e) {
                console.error(e)
            }

            loop();



        }
        loop();

        return () => {
            stop = true;
        }

    }, [client])


    return (
        <div className="Camera">
            <div className="emoj">📷</div>

            <video autoPlay={true} ref={video} style={{ display: showVideo ? '' : 'none' }} />

        </div>
    )
}



const Server: FunctionComponent = () => {
    const peerServer = useContext(ServerContext)

    const pending = useMemo(() => new Set<(proceed: boolean) => void>(), [])

    const [timer, setTimer] = useState(3);
    const [selfie, setSelfie] = useState(true);
    const [images, setImages] = useState<string[]>([]);

    const selfieRef = useRef<boolean>();
    selfieRef.current = selfie;

    const timerRef = useRef<number>();
    timerRef.current = timer;

    useEffect(() => {
        if (!peerServer) return;

        peerServer.addService(CameraService, {
            PostPhoto: (req, res) => {
                const blob = new Blob([req.getData_asU8()], { type: req.getType() })
                const url = URL.createObjectURL(blob);

                setImages(before => [url].concat(before))

            },
            Wait: async (req, res) => {

                const proceed = await new Promise<boolean>(r => pending.add(r))

                res.setCancel(!proceed);
                res.setFacemode(selfieRef.current ? 'user' : 'environment')
                res.setSeconds(timerRef.current)

            }
        })

        return () => {
            pending.forEach(cb => cb(false));
            pending.clear();
        }

    }, [peerServer])

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        pending.forEach(cb => cb(true))
        pending.clear()
    }

    return (
        <div className="Camera">

            <form onSubmit={submit}>

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

                <ul className="photos">
                    {images.map(image => <li key={image}>
                        <img src={image} />
                    </li>)}
                </ul>

            </form>

        </div>
    )

}



export const Cameras = { Server, Client }
