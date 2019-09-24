import React, { FunctionComponent, useState, useContext, useEffect, useRef, FormEventHandler, MutableRefObject } from "react";
import { ClientContext } from "../Join";
import { ServerContext } from "../Host";
import { Dev } from "../lib/protos/generated/dev_pb_service";
import { ChatService } from "../lib/protos/generated/chat_pb_service";
import { Message } from "../lib/protos/generated/chat_pb";

import { AR, POS2 } from 'js-aruco'

console.log("ARRR", AR)

const Client: FunctionComponent = () => {

    const client = useContext(ClientContext);
    const video = useRef<HTMLVideoElement>();

    const markers = useMarkers(video);

    return <div className="Marker">
        <video ref={video} autoPlay={true} />

        [camera]
        <h4>
            {JSON.stringify(markers)}
        </h4>

    </div>
}



const Server: FunctionComponent = () => {

    const server = useContext(ServerContext);

    return <div className="Marker">

        [AR code]

        <Marker i={123} />

    </div>
}


export const Position = { Server, Client };



// Marker stuff

const Marker: FunctionComponent<{ i: number, size?: number }> = ({ i, size = 100 }) =>
    <svg viewBox="0 0 7 7" width={size} height={size} >
        {
            generate(i)
                .map((row, x) =>
                    <g key={x}>
                        {row.map((value, y) =>
                            value &&
                            <rect
                                key={y}
                                strokeWidth="0.01"
                                width="1"
                                height="1"
                                x={x}
                                y={y}
                            />
                        )}
                    </g>
                )
        }
    </svg>

const w = false, b = true

const rows = [
    [b, w, b, b, b, b, b],
    [b, w, b, w, w, w, b],
    [b, b, w, b, b, w, b],
    [b, b, w, w, w, b, b],

    [b, b, b, b, b, b, b] // border
]

const generate = (i: number) =>
    [
        rows[4],
        rows[i >> 8 & 3],
        rows[i >> 6 & 3],
        rows[i >> 4 & 3],
        rows[i >> 2 & 3],
        rows[i & 3],
        rows[4]
    ]



interface Marker {
    id: number,
    corners: [number, number, number, number]
}

const useMarkers = (videoRef: MutableRefObject<HTMLVideoElement>) => {

    const [markers, setMarkers] = useState<Marker[]>([])

    useEffect(() => {

        let stream: MediaStream;
        let stop = false;

        const run = async () => {
            try {

                stream = await navigator.mediaDevices.getUserMedia({
                    audio: false, video: { facingMode: 'environment' }
                });

                const { current: videoEl } = videoRef;

                videoEl.srcObject = stream;
                await new Promise(res => videoEl.onloadedmetadata = res);
                videoEl.play();

                const canvas = document.createElement('canvas');
                canvas.width = videoEl.videoWidth;
                canvas.height = videoEl.videoWidth;

                const modelSize = 1000; // 1m

                const detector = new AR.Detector()
                const posit = new POS2.Posit(modelSize, canvas.width);

                const loop = async () => {
                    if (stop) return;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(videoEl, 0, 0);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

                    var markers = detector.detect(imageData)

                    if (markers.length) setMarkers(markers)

                    // markers.forEach(marker => {
                    //     const pose = posit.pose(marker.corners);

                    //     const rotate = pose.bestRotation;

                    //     const mat3 = rotate.reduce((a, b) => a.concat(b))

                    //     console.log(mat3)
                    // })

                    setTimeout(loop, 500)
                }
                loop()



            } catch (e) {

                console.error(e)
            }


        }

        run()



        return () => {
            stream && stream.getVideoTracks().forEach(track => track.stop())
            stop = true;
        }

    }, [])


    return markers;

}
