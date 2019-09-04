# ppRPC

gRPC over webRTC for "web server in a web-browser" kind of thing

## Server

```ts
import { Server } from 'pprpc'
import { EchoService } from '_generated/echo_service'


const service = new EchoService()
service.on('echo', request => request)


// a server may contain several services
const server = new Server()
server.add(service)


server.listen(id => {
  console.log(`Listening: ${id}`) // '1244'
})

```

## Client

```ts
import { Client } from 'pprpc'
import { EchoClient } from '_generated/echo_client'
import { EchoRequest } from '_generated/echo_pb'

const client = new Client('1244')
const echoClient = client.use(EchoClient);

echoClient.echo(request)
echoClient.echo(request => request.setText('hello'))

```

bin/pprpc-codegen
bin/pprpc-signaller