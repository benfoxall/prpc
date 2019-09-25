import React, { FunctionComponent, useContext, useEffect, useState } from "react"
import { ServerContext } from '../Host'
import { ClientContext } from "../Join"
import { CalculatorService } from "../lib/protos/generated/calculator_pb_service"


const Client: FunctionComponent = () => {
    const [a, setA] = useState(1)
    const [b, setB] = useState(1)
    const [result, setResult] = useState<string | number>('?')

    const client = useContext(ClientContext);

    useEffect(() => {
        if (!client) return;

        const calc = client.getService(CalculatorService)

        calc('Calculate', (req) => {
            req.setValue1(a)
            req.setValue2(b)
        }).then(res => {
            setResult(res.getValue())
        })


    }, [client, a, b])

    return (
        <div className="Calculator">
            <input type="number" value={a} onChange={e => setA(e.target.valueAsNumber)} />
            <input type="number" value={b} onChange={e => setB(e.target.valueAsNumber)} />
            <output>
                {result}
            </output>
        </div>
    );
}



const Server: FunctionComponent = () => {
    const server = useContext(ServerContext)
    const [operation, setOperation] = useState('+');


    useEffect(() => {
        if (!server) return;

        server.addService(CalculatorService, {
            Calculate: (req, res) => {
                res.setValue(
                    compute(
                        req.getValue1(),
                        operation,
                        req.getValue2(),
                    )
                )
            }
        })

        return () => server.removeService(CalculatorService)

    }, [server, operation]);

    return (
        <div className="Calculator">
            <select value={operation} onChange={e => setOperation(e.target.value)} >
                <option>+</option>
                <option>-</option>
                <option>/</option>
            </select>
        </div>
    )

}



export const Calculator = { Server, Client }



const compute = (a: number, operation: string, b: number) => {
    switch (operation) {
        case '+': return a + b;
        case '-': return a - b;
        case '/': return a / b;
        default: return Math.random()
    }
}
