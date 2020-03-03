
# Hello,
# [fit] I'm Ben
## It's nice to be here

---

![](sketch/Mike.png)

---

![](images/oxford-map.png)

---

![fit](images/nz-sarah-map.png)

---

![](images/nz-0.jpg)

---

![](images/nz-1.jpg)

---

![](images/nz-4.jpg)

---

![](images/projects-2.jpg)

---

![](images/projects-3.mp4)

---

![left fit](images/hacks-cardboctober.png)
![right fit](images/hacks-webgl.png)

<!-- ---

![](images/pr1-1200x849.jpg)

---

![fit](images/pr2-1200x947.png) -->

---

![fit](images/oxb-5.jpg)


---

![cover](images/oxb-6.png)

^ we have cars that drive around the place

---

![cover](images/oxb-7.jpg)

---

![fit](images/oxb-3.png)

---

# [fit] Taking the 
# [fit] web on an
# [fit] adventure

^ Making the web useful down the stack

---


![fit](sketch/Adventure-1.png)

---

![fit](sketch/Adventure-2.png)


---

![video](~/work-demo.mov)

---

# Today

---

# Today

# [fit] Challenging 
# [fit] the way we 
# [fit] build the web

^ gonna talk about some technical stuff, as well as dipping into UX and design.

---

<!-- # [fit] Paradigms  -->

# [fit] Received 
# [fit] Wisdoms

<!-- # [fit] Convention -->

<!-- # [fit] Assumptions -->

---

Received Wisdom

# [fit] 1.

[.background-color: #f08]

---

# [fit] 1.

# [fit] Use JSON 
# [fit] for data

[.background-color: #f08]

---


![](sketch/owls.png)

---

![](sketch/owls2.png)

---

![](sketch/owls3.png)

---

![](sketch/owls4.png)

---

# [fit] JSON

(2001)

^ JSON - March 2001

---


```json
{
  "list": [
    {
      "body": "I totally identify with this", 
      "author_id": "038bb12m", 
      "created_at": 12345,
      "spam": false
    }
  ]
}
```

---


```js
const content = {
  "list": [
    {
      "body": "I totally identify with this", 
      "author_id": "038bb12m", 
      "created_at": 12345,
      "spam": false
    }
  ]
}
```

---

![fit](images/netscape-navigator-2-0.png)


<!-- [^1]:https://www.webdesignmuseum.org/web-design-history/netscape-navigator-2-0-1995. -->

^ NN2 - Sept 1995
^ JSON - March 2001 (6 years later)

---

# JSON is baked 
# into the web platform


```js
const comments = await response.json()
```

---

# An alternative?

---

# [fit] Protocol
# [fit] Buffers

[.background-color: #ccc]

---

# Define a message

```
# example.proto

syntax = 'proto3';

message Example {
    string name = 1;
    bool night = 2;
    float size = 3;
}
```

---

# Generate stubs

```bash
protoc 
  --js-out=./dist
  example.proto
```

---

# Use stubs


```js
import {Message} from './stubs/Message' 

const message = new Message()
message.setName('frank')
message.setNight(false)
message.setSize(2)

const output = message.serialiseBinary()
// -> Buffer(...)
```

---


# ❤️Protocol Buffers ❤️

* Impossible to make a mistake
* Efficient on the wire
* Type safety
* Type safety __across__ languages

[.build-lists: true]

---


# Generated data

```
0010010101010001010010010010101
0101010100010120100100101010011
1000101001001001010101000101...
```

---

# Tags

```
{1}0010010101010001010010010010101
0101010{2}100010100100100101010011
10001010010010010{3}10101000101...
```

```
string name = {1};
bool night = {2};
float size = {3};
```

---

# Efficiency


# [fit] 1234567890

```
# JSON
000000  31 32 33 34 35 36 37 38 39 30                    1234567890

# Var Int
000000  d2 85 d8 cc 04                                   Ò.ØÌ.
```


[observablehq.com/@benfoxall/var-int-encoding](https://observablehq.com/@benfoxall/var-int-encoding)

---

# Efficiency

# [fit] true

```
# JSON encoded
000000  74 72 75 65                                      true

# Var Int (1)
000000  01                                               .
```

---

```bash
protoc 
  --js-out=./dist
  --python-out=./dist
  --go-out=./dist
  --rust-out=./dist
  example.proto
```

---

# [fit] Demo


---

Received Wisdom

# [fit] 2.

[.background-color: #f08]

---

# [fit] 2.

# [fit] Use REST 
# [fit] for interfaces

[.background-color: #f08]

---

![](sketch/owls4.png)

---

# [fit] REST
# [fit] Representational state transfer

(2000)


<!-- [^rest]: https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm -->

^ Year 2000

---

GET /posts
GET /posts/53
GET /posts/53/comments
PUT /posts/53/comments/23/reactions
POST /posts/53/comments


---

# Built on HTTP

![](images/timbl.jpg)


<!-- https://home.cern/science/computing/birth-web -->

---

# REST is baked 
# into the web platform

---


# An alternative?
<!-- 
* loose
* manual -->

---

# [fit] gRPC

[.background-color: #ccc]

---

# Resources → Services

---

```
POST PostService/getList
POST PostService/getPostContent
POST CommentService/getComments
POST CommentService/setReaction
POST CommentService/addComment
```

---

```bash
# example.proto
service ExampleService {
  rpc Add (NumberList) returns (Number);
}

# use grpc plugin
protoc
  --plugin=protoc-gen-grpc=grpc-plugin \
  --grpc_out=. \
  example.proto
```

---

# ❤️gRPC ❤️


* Interface code is generated / mistake free
* Type safety (`await getComment()`)
* Type safety __between__ langages


[.build-lists: true]

---

# 🤫 gRPC – slight problem

* It's not supported by web-browsers (yet)
  * http2, frames, streaming
* Option – web-gRPC ⇔︎ gRPC bridge:
  * grpcwebproxy
  * envoy

[.build-lists: true]

---

# [fit] Demo

---

Received Wisdom

# [fit] 3.

[.background-color: #f08]

---

# [fit] 3.

# [fit] Browsers connect
# [fit] to web servers

[.background-color: #f08]

---

![fit](images/first-web-page.png)

---
<!-- 
![fit](images/first-web-page-source.png)
--- -->

<!-- [ two browsers ] -->
![](sketch/network-0.png)

---

<!-- [ two browsers ] -->
<!-- [ web server ] -->

![](sketch/network-1.png)


---

# An alternative?

---

# [fit] PeerToPeer
# with 
# [fit] WebRTC
# datachannels

[.background-color: #ccc]

---


![](sketch/network-1.png)

<!-- [ two browsers ]

[ web server ] -->

---

![](sketch/network-2.png)


<!-- [ TURN / STUN ]

[ two browsers ]

[ web server ] -->

---

![](sketch/network-3.png)

---

![](sketch/network-4.png)

---

# Data

* Media Streams
* Data Channels

[.build-lists: true]

---

# ❤️ WebRTC DataChannels ❤️

* Appropriate latency & bandwidth
* Interactive applications

[.build-lists: true]

---



# [fit] Quick Summary

[.background-color: #08f]

---

# [fit] 1. Protocol Buffers
# [fit] 2. gRPC 
# [fit] 3. webRTC

[.background-color: #08f]

---

# [fit] 1. Serialisation
# [fit] 2. Interface
# [fit] 3. Transport

[.background-color: #08f]

---

![](sketch/prpc-network-0.png)

---

![](sketch/prpc-network-1.png)

---

![](sketch/prpc-network-2.png)

---

![](sketch/prpc-network-2.5.png)

---

![](sketch/prpc-network-3.png)

---

![](sketch/prpc-network-4.png)

---


![](sketch/prpc-network-5.png)

---

# [fit] pRPC

---

# [fit] [prpc.me](https://prpc.me)

---

# Code Example

---


# 1. Define a service

```
syntax = 'proto3';

message NumberPair {
    float value1 = 1;
    float value2 = 2;
}

message Result {
    float value = 1;
}

service CalculatorService {
    rpc Calculate (NumberPair) returns (Result);
}

```

---

# 2. Write Server/Client components

```jsx
const Client: FunctionComponent = () => {
    const [a, setA] = useState(1)
    const [b, setB] = useState(1)
    const [result, setResult] = useState<string | number>('?')

    const calculate = () => {}

    return (
        <div className="Calculator">
            <input type="number" value={a} onChange={e => setA(e.target.valueAsNumber)} />
            ?
            <input type="number" value={b} onChange={e => setB(e.target.valueAsNumber)} />
            =
            <output onClick={calculate} tabIndex={0}>{result}</output>
        </div>
    );
}


const Server: FunctionComponent = () => {
    const server = useContext(ServerContext)
    const [operation, setOperation] = useState('+');

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
```


---

# 3. Hook them together

```ts
// <Calculator.Server>
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

// <Calculator.Client>
const calculate = () => {
    const calc = client.getService(CalculatorService)

    calc('Calculate', (req) => {
        req.setValue1(a)
        req.setValue2(b)
    }).then(res => {
        setResult(res.getValue())
    })
}
```

---

# …What we're not doing

* Implementing interface code
* Assuming types

[.build-lists: true]


---

# [fit] prpc.me

## /Calculator

---


# ...


---

Received Wisdom

# [fit] 4.

[.background-color: #f08]

---

# [fit] 4.

# [fit] Data lives in
# [fit] a data centre

[.background-color: #f08]

---

![fit](sketch/server.png)

---

# An alternative?

---

# [fit] Peer-to-peer
# [fit] storage

[.background-color: #ccc]

---

# [fit] prpc.me

## /Content
## /Chat
## /Camera

---

# [fit] Distributed web

---

![fit](images/ipfs.png)

---

![fit](images/beakerbrowser.png)

---

# ❤️ Distributed web ❤️

* It feels like we own it
* Performance potential

[.build-lists: true]

---

Received Wisdom

# [fit] 5.

[.background-color: #f08]

---

# [fit] 5.

# [fit] Interaction & focus
# [fit] happen on the same device

[.background-color: #f08]

---

![70%](sketch/phone.png)

---

# An alternative?

---

# [fit] Multi
# [fit] device
# [fit] interactions

[.background-color: #ccc]

---

# [fit] prpc.me

## /Draw

---

### [fit] Focus
### Interaction


---

### [fit] Big screen
### Small phones

---

![fit](images/ipad-os.png)

---

![fit](images/jsjoust.png)

---

![](images/jsjoust-photo05.jpg)

---

![fit](images/echo-frames.jpg)

---

# ❤️ Multi device interactions ❤️

* Bridges between tech and our environment
* Make the most of device capabilities

[.build-lists: true]

---

Received Wisdom

# [fit] 6.

[.background-color: #f08]

---

# [fit] 6.

# [fit] The web should provide 
# [fit] the same features 
# [fit] to every user

[.background-color: #f08]

---

![60%](sketch/phone.png)

![60%](sketch/laptop.png)

---

# As a User
# I press the button
# In order to …

---

# Tim Berners-Lee
### WorldWideWeb

![right](images/timbl.jpg)

---

# Nicola Pellow
### Line Mode

![right](images/linemode.jpg)

---

# Line Mode
* Expanded and prove the web
* Showed browsers can be different

---

# Modern Browsers

* Audio
* Video
* SpeechRecognition
* XR
* Bluetooth
* GPU

[.build-lists: true]

---

# An alternative?

---

# [fit] Interface as
# [fit] a function

[.background-color: #ccc]

---

# [fit]Features = UI( Content, Capabilities, Context)

* **Content** – What you're providing to the user
* **Capabilities** – What features that users device has
* **Context** – Where the user is


[.build-lists: true]

---

# Context

Where the user is

* Portability
* Network
* Spatial
* Drunkeness

[.build-lists: true]

---

# ❤️ UI as a function ❤️

* Let's us make use of features
* Avoids over-perfection
* Higher level goals

[.build-lists: true]

---


# [fit] Summary


---

# [fit] 1. Use JSON for data
# [fit] 2. Use REST for interfaces
# [fit] 3. Browsers connect to web servers
# [fit] 4. Data lives in a data centre
# [fit] 5. Interaction & focus happen on the same device
# [fit] 6. A UI should provide the same features to every user

[.build-lists: true]

[.background-color: #f08]

---
<!-- 
Quote?

--- -->

# [fit] Thanks

ben.foxall@oxbotica.com
