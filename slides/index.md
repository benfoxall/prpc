
# Hello,
# [fit] I'm Ben
## Thanks for having me
# 🦉

---

# Selected projects

* Fairy lights
* NZ - stuffometer
* WebGL Hacks
* Publishing rooms

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

# [fit] Taking the web on
# [fit] an adventure

^ Making the web useful down the stack

---

![video](~/work-demo.mov)

---

# 🦉 Today

---

# 🦉 Today

## Challenging the state 
## ...


---

# 🦉 Today

## Challenging the state 
## of how we load data

---

# 🦉 Today

* Technical stuff
* Demo stuff
* Concept stuff

[mark where it sounds like it's going to be boring]

^ I'm going to introduce a technical topic, that has non-technical ramifications

---

# How do we get 
# data into a web page?

---

![](sketch/owls.png)

---

![](sketch/owls2.png)


---

![](sketch/owls3.png)


---

![](sketch/owls4.png)

^ INTERFACE
^ SERIALISATION

---


# [fit] Interface

agreemenent between parties

# [fit] Serialisation

conversion to (common) format

---

# Interface

# [fit] REST

---

# URL
# /post/1b982/comments

---

# Methods
# GET, POST, PUT, DELETE



---

#  REST

* Stateless
* Resource Oriented
* Been around forever
* Great
* HATEOAS

---

# [first ever web browser]

---

# Serialisation

# [fit] JSON

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

Netscape

---

# JSON

* JavaScript Object Notation
* Been around forever (every javascript version could handle it)
* efficient
* defacto [because JS was historically the only language]

---


```js
const content = JSON.stringify(`{
  "list": [
    {
      "body": "I totally identify with this", 
      "author_id": "038bb12m", 
      "created_at": 12345,
      "spam": false
    }
  ]
}`)
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

# Browser <-> Server

### Interface
## REST

### Object Serialisation
## JSON


---

# TODO - HOW DO SERVERS TALK TO OTHER SERVERS

---

* networking is different (containers/microservices)
* HTTP optional
* JavaScript not dominiant

---

# [fit] Lots of ways
# [fit] htttp / queues / sockets / etc

---

# today we'll look at
# [fit] gRPC &
# [fit] Protocol Buffers 

---

# Not New **or** Trendy

^ https://trends.google.com/trends/explore?date=all&q=protocol%20buffers


![inline](images/popularity.png)

---


---

# TODO - SERVER ======= SERVER

---



---


# Other Terms

- client / server
- request / response
- 

---

# Protocol Buffers

## → Serialising Objects

# gRPC

## → Building APIs

---

# Popular & Prolific

---

# Popular & Prolific

## … but not so much in the web

---

# …because with the web

## Serialising Objects → JSON

## Building an API → REST

---

<!--
![](sketch/overview.png)

---

-->

![](sketch/overview+rest.png)

---


![](sketch/overview+target.png)

---
# [fit] Going from JSON
# [fit] to Protocol 
# [fit] Buffers

[.background-color: #ffcc00]

<!---

# getting to
# [fit] Protocol Buffers

# from
# [fit] JSON
-->

---

# JSON → Protocol Buffers

---

![](sketch/json-1-init.png)

---

## Store things better-er

# [fit] 1234567890

```
# JSON
000000  31 32 33 34 35 36 37 38 39 30                    1234567890

# Var Int
000000  d2 85 d8 cc 04                                   Ò.ØÌ.
```


[observablehq.com/@benfoxall/var-int-encoding](https://observablehq.com/@benfoxall/var-int-encoding)

---

## Store things better-er

# [fit] true

```
# JSON encoded
000000  74 72 75 65                                      true

# Var Int (1)
000000  01                                               .
```

---

## Store things better-er

# [fit] 123e4567-e89b-12d3-a456-426655440000

```
# JSON encoded
000000  31 32 33 65 34 35 36 37 2d 65 38 39 62 2d 31 32  123e4567-e89b-12
000010  64 33 2d 61 34 35 36 2d 34 32 36 36 35 35 34 34  d3-a456-42665544
000020  30 30 30 30                                      0000

# Raw bytes
000000  12 3E 45 67 E8 9B 12 D3 A4 56 42 66 55 44 00 00 
000010  B
```

^ TODO - it might be better to to data-uri here

---

![](sketch/json-2-efficient-storage.png)

---

![](sketch/json-3-mistake.png)

---

![](sketch/json-3-mistake.png)

---


![](sketch/json-4-type.png)

---

![](sketch/json-5-type-gen.png)

---

![](sketch/json-6-bonus.png)

---

# [fit] 🎉 We've 🎉 
# [fit] 🎉 Invented 🎉 
# [fit] 🎉 Protocol Buffers 🎉 

---

# 1. 📝 `message.proto` 
# 2. 🤖 `message_pb.js` 
# 3. ✨ `new Message()`

---

# ⚡️ Demo

```
message Example {
    string name = 1;
    bool burger = 2;
    float howMuch = 3;
}
```

---

# The Good stuff

---

# Typed messages across multiple langauges


```bash
protoc example.proto
  --js-out=… 
  --python-out=…
  --c-out=…
```

---

# Avoids translation

```sql
SELECT * FROM comments WHERE …
```

1. Comment model class

2. Rest API Layer

3. fetch(…).then(r => r.json())

4. Comment.fromJSON()

5. <Comment title={item.title}>

[.build-lists: true]

---

# [fit] Going from REST to
# [fit] gRPC


[.background-color: #ffcc00]

---
<!--
# RPC

# a function in your code might transparently run somewhere else

---

-->

# Goals

* REST - Modelling state
* gRPC - Calling remote functions

[.build-lists: true]

---

# Architectural Models

* REST - Resource Oriented
* gRPC - Service Oriented

[.build-lists: true]

---

# REST - Resource Oriented
## Identifier

```
GET /posts/42/comments/15
```

↑ Relates to a resource

---

# gRPC - Service Oriented
## Identifier

```
CommentService/LoadComment
```

↑ Relates to a service method

---

# Interactions

* Request / Response (REST & gRPC)
* Request / Responses (gRPC)
* Requests / Response (gRPC)
* Requests / Responses (gRPC)

[.build-lists: true]

---

# Transport

* REST - HTTP1/HTTP1.1/HTTP2/…
* gRPC - HTTP2

[.build-lists: true]

---

<!--
# Why Only HTTP2

![inline](images/http2.jpg)

slideshare.net/Enbac29/http2-standard-for-video-streaming

^ you wouldn't want a waterfall when calling functions

---

-->

# [fit] Browser Support 

---

# [fit] Browser Support - REST

# [fit] 100%

---

# [fit] Browser Support – gRPC

# [fit] 0%

---

# gRPC-web [^1]


[^1]: [github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md)

---

# Using gRPC-web today

1. Use grpc-web-proxy
2. Use Envoy Proxy
3. Wait for tomorrow

[.build-lists: true]

---

> In the future, we expect gRPC-Web to be supported in language-specific Web frameworks, such as Python, Java, and Node.

---

# The
# Totally
# Cool
# Awesome
# Thing

----

# gRPC interfaces are typed

```bash
# calculator.proto
service Calculator {
  rpc Add (NumberList) returns (Number);
}


# use grpc plugin
protoc calculator.proto
  --plugin=protoc-gen-grpc=grpc-plugin \
  --grpc_out=.
  

# generated ./calculator_grpc_pb.js
```

---

# Demo

```
service Zoom {

    rpc echo(EchoMessage) returns (EchoMessage);

    rpc systemInfo (Noop) returns (stream SystemInfo);
    
    rpc screenShot (Noop) returns (Image);

    rpc setColorScheme (ColorSchemeRequest) returns (Noop);

}
```

---

## Why this is so cool

* Updating a service
* Microservices ↔︎ Components[^*]
* Avoid siloing

<!--* WebAssembly-->


[^*]: https://martinfowler.com/articles/micro-frontends.html

[.build-lists: true]

<!--

---

## Why it feels weird

* The web *is* REST
* JS has been a single language on a platform
* Obfuscation sucks
* We're used to things being fuzzy
* Accessibility 

^ Hypermedia as the engine of application state

<!--

"A REST API should never have “typed” resources"
https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven

-->

---

# Quick summary

* Protocol Buffers
* gRPC


---

![](sketch/overview+target.png)

---

![](sketch/overview-wo-backend.png)

---

# Peer RPC

---

![](sketch/rpc-1.png)

---

![](sketch/rpc-2.png)

---

![](sketch/rpc-3.png)

---

![](sketch/rpc-4.png)

---

![](sketch/rpc-5.png)

---

![](sketch/rpc-6.png)

---

![](sketch/rpc-7.png)


---

```ts
new PeerServiceServer(Zoom, {
  echo: (req, res) => {
    res.setText(
      req.getText()
    )
  },
  setColorScheme: (req) => {
    document.body.style.background =
      req.isDark() ? '#000' : '#fff'
  },
})
```

---

# Demo

* Zoom Service (Web edition)

---

# The good stuff

---

# The good stuff

## Interaction modes

---

# The good stuff

## Realtime

```ts
new PeerServiceServer(Zoom, {
  echo: (req, res) => {
    res.setText(
      req.getText()
    )
  },
  setColorScheme: (req) => {
    document.body.style.background =
      req.isDark() ? '#000' : '#fff'
  }
})
```

---

# Building interfaces

```
service Controller {
  rpc joystick(repeated Move) returns (Noop);
  rpc press(Button) returns (Noop); 
}
```

---

# Summary

* Protocol Buffers
* gRPC
* pRPC

---

# [PART 2]




---

# Chat

---

# Thanks

@benjaminbenben




-------


Demo Stream of thought.

The srtuff I'm wanting to show here is how mazing it is that two browsersw aren't connected to the web, but can still do lots of things.


The first demo!

(we're thinkinhg in challenges here).

We don't need to access the www to get content.

The first demo challenges that servers don't have to be connected to the world wide web. Once you've visited this page, your browser disconnects from the web, but is still able to get content from this other web server.

??? Maybe a content demo?  I write markdown and that content is mirrored in peoples devices ???

>> potentially go on to talk about offline apps and bluetooth


Challenge number 2!

We don't need to post our data into the cloud.

Here's a comment bot - like that example we had before.  As you type in messages here, they're sent to everyone else who's joined the server!  Where this gets interesting is when you think about where the data is stored.  These comments are just a local variable in this browser.  What does that mean for privacy laws?  Am I breaking any data retention laws?!

To a point, we've been thinking about this kind of stuff with whatsapp end-to-end messages.  But what else does that mean.

>> potentially go on to talk about ipfs & distributed content.


Challenge number 3!

A web server can be part of the interaction

Here's another demo,  you can drag your finger or mouse across the panel, and you should be able to see it appear.

Now, I want to do a few things.  I want you to be kind of ANGRY,  now try and thing flow-y thoughts and drift about.  

Now I want you to try and make a circle.

And a square

And a triangle.

So,  What I love about this is where our focus lies.  When we interact, we tend to do so looking at a single screen.  I find it really interesting when we manage to interact with the spaces between. 


Challenge number 4!

A Web Server doesn't just have to serve the web.






>>
>> iPad handoff thing

>> space team / Artemis
>> Johann Sebastian Joust
>> 
>> 
