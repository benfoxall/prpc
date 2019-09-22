import React, { FunctionComponent, useState, useContext, useEffect, useRef, useReducer, useMemo } from "react";
import { ClientContext } from "../Join";
import { ServerContext } from "../Host";
import { TrailsService } from "../lib/protos/generated/trails_pb_service";


const Client: FunctionComponent = () => {
    const [color, setColor] = useState('#000000')

    const size = 500;
    const canvas = useRef<HTMLCanvasElement>()
    const colorRef = useRef(color);
    colorRef.current = color;

    const client = useContext(ClientContext);
    const service = useMemo(() => client && client.getService(TrailsService), [client]);

    useEffect(() => {
        service && service("Color", (req) => req.setValue(color))
    }, [color, service])

    // useEffect(() => {
    //     if (client) {
    //         const devService = client.getService(TrailsService)
    //         // devService("Background", res => res.setValue(color))
    //     }

    // }, [color, client])



    useEffect(() => {
        if (!service) return;

        let timeout = 500;
        let wait = false;
        const send = (points: number[]) => {
            // timeout stuff
            if (wait) return;
            wait = true;

            setTimeout(() => {
                wait = false
            }, timeout)

            console.log("WILL SEND")

            service("Line", line => {
                line.setCoordsList(points)
            }).then(resp => {
                timeout = resp.getTimeout()

                console.log("T", timeout)
            })
        }




        let stop = false;
        let dirty = false;
        let lastX = 0;
        let lastY = 0;

        let points = []

        const move = (e) => {
            e.preventDefault();

            const { left, width, top, height } = canvas.current.getBoundingClientRect()

            const pageX = e.touches ? e.touches[0].pageX : e.pageX;
            const pageY = e.touches ? e.touches[0].pageY : e.pageY;

            const x = ((pageX - left) / width)
            const y = ((pageY - top) / height)

            // don't allow large jumps (easy on touch devices)
            const jump = Math.abs(x - lastX) + Math.abs(y - lastY);
            if (jump > 0.25) {
                points = [];
            }

            lastX = x;
            lastY = y;

            points.unshift(x, y);

            while (points.length > 20) { points.pop(); }
            dirty = true;

            send(points);

        }


        const ctx = canvas.current.getContext('2d')
        ctx.lineWidth = 5;
        const render = () => {
            if (stop) return;
            requestAnimationFrame(render);

            if (dirty) {
                dirty = false;

                ctx.clearRect(0, 0, size, size);

                ctx.strokeStyle = colorRef.current;

                ctx.beginPath()
                for (let i = 0; i < points.length; i += 2) {
                    ctx.lineTo(points[i] * size, points[i + 1] * size);
                }
                ctx.stroke()
            }
        }
        render()

        // because react uses root listeners which are become passive for touch events
        canvas.current.addEventListener("touchmove", move);
        canvas.current.addEventListener("mousemove", move);

        return () => {
            stop = true;
        }
    }, [colorRef, service])

    return <main className="Trails">
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        <canvas width={size} height={size} ref={canvas} />
    </main>
}


const Server: FunctionComponent = () => {

    const server = useContext(ServerContext);

    const size = 1000;
    const canvas = useRef<HTMLCanvasElement>()

    const [timeout, setTimeoutValue] = useState(100);
    const timeoutRef = useRef(timeout);
    timeoutRef.current = timeout;


    useEffect(() => {
        if (!server) return;

        let stop = false;
        let dirty = false;

        const lines = new Map<string, number[]>()
        const colors = new Map<string, string>()

        server.addService(TrailsService, {
            Color: (req, res, meta) => {
                colors.set(meta.peerId, req.getValue())
                dirty = true
            },
            Line: (req, res, meta) => {
                lines.set(meta.peerId, req.getCoordsList())
                res.setTimeout(timeoutRef.current)

                dirty = true
            },
        })

        const ctx = canvas.current.getContext('2d')
        ctx.lineWidth = 5;

        const render = () => {
            if (stop) return;

            if (dirty) {
                dirty = false;
                ctx.clearRect(0, 0, size, size);

                for (let key of lines.keys()) {

                    ctx.strokeStyle = colors.get(key)

                    let points = lines.get(key);

                    ctx.beginPath()
                    for (let i = 0; i < points.length; i += 2) {
                        ctx.lineTo(points[i] * size, points[i + 1] * size);
                    }
                    ctx.stroke()
                }

            }

            requestAnimationFrame(render);
        }

        render();

        return () => {
            server.removeService(TrailsService)
        }

    }, [server])



    return (
        <main className="Trails">
            <input type="number" min="0" max="3000" value={timeout} onChange={e => setTimeoutValue(e.target.valueAsNumber)} />
            <canvas width={size} height={size} ref={canvas} />
        </main>
    )
}


export const Trails = { Server, Client };
