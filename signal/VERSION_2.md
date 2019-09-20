# Next Version

This one kind of sucks a bit.

* issue client JWT from separate endpoint
* Map connection -> client on {setup}.  Don't allow re-maps
* maintain local connectid->uuid lookup map to cache ddb requests 



```js
{action: 'init', token: '12345b23412'}
{action: 'init', uuid: 'ben'}
{action: 'init', error: 'invalid'}

{action: 'send', uuid: 'someone', payload: 'hello, world'}
{action: 'send', ok: true}
{action: 'send', error: true}
```



# inbound

```
{action: 'send', from: 'someone', payload: 'hello, world'}
```
