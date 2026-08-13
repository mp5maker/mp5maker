## WebRTC & Websockets

- Websockets
  - Real-time clinet <-> server communication
- SSE
  - Server -> client real-time updates
- WebRTC
  - Peer <-> peer real-time communication

1. Polling

- It is the simplest approach
- The client repeated asks the server

```
Client
  │
  ├── GET /messages
  │
  ├── GET /messages
  │
  ├── GET /messages
  │
  └── GET /messages
```


```javascript
setInterval(() => {
    fetch("/api/messages");
}, 5000);
```

- Advantages
  - Simple
  - Works with normal HTTP infrastructure
  - Easy to implement

- Disadvantages
  - Repeated request even when nothing changed
  - Higher latency
  - Unnecessary server/network load
  - Poor fit for high-frequency real-time data


2. Long Polling

- Long polling improves regular polling
- Instead of immediately responding, the server keeps the connection open until

```
Client → Server
new data available
       OR
timeout
Server → Response
       ↓
Client immediately makes another request
```

```
Client
   │
   ├──────── Request ────────→ Server
   │                            │
   │                         Wait...
   │                            │
   │                      New event!
   │                            │
   ←──────── Response ──────────┤
   │
   └──────── New request ──────→
```

3. Websockets

- It provide a persistent, biddirectional connection between client and server
- Websockets allow either side to send mesages whenever needed
- Useful for
  - chat
  - multiplayer games
  - collaborative application
  - live dashboards
  - notifications
  - real-time status updates

4. Websocket Handshake

- Websockets start with an HTTP-based handshake

```
Client
  │
  │ HTTP Upgrade request
  ▼
Server
  │
  │ 101 Switching Protocols
  ▼
WebSocket connection
```

5. Websocket Lifecycle

```
CONNECTING
    ↓
OPEN
    ↓
MESSAGES
    ↓
CLOSING
    ↓
CLOSED
```


```javascript
const socket = new WebSocket("wss://example.com/ws");

socket.onopen = () => {
    console.log("Connected");
};

socket.onmessage = (event) => {
    console.log(event.data);
};

socket.onclose = () => {
    console.log("Disconnected");
};

socket.onerror = (error) => {
    console.error(error);
};
```

6. Reconnection

- Real-world WebSocket conections will disconnect

- network chagnes
- wifi->mobile data
- phone goes to sleep
- server restart
- proxy timeout
- temporary connectivity loss
- poor mobile signal

```
Connected
   ↓
Disconnected
   ↓
Wait
   ↓
Reconnect
   ↓
Connected
```

- use exponental backoff
- Usually with a maximum delay and some random jitter

```
1 second
 ↓
2 seconds
 ↓
4 seconds
 ↓
8 seconds
 ↓
16 seconds
```

| Feature     | Polling                | WebSocket                          |
| ----------- | ---------------------- | ---------------------------------- |
| Connection  | Repeated HTTP requests | Persistent                         |
| Direction   | Client → Server        | Bidirectional                      |
| Latency     | Higher                 | Low                                |
| Server load | Potentially high       | More efficient for frequent events |
| Complexity  | Low                    | Higher                             |
| Real-time   | Approximate            | True real-time                     |


7. Server-Sent Events (SSE)

- It provides a persistent server -> client stream

```
Server
   │
   │ events
   ▼
Client


WebSocket:
Client ↔ Server

SSE:
Server → Client
```

- SEE uses normal HTTP and provdies an event stream
  - notifications
  - live status
  - progress updates
  - dahsboards
  - streamig server-generated events


8. Websocket vs SSE

- Choose SSE when the client mainly needs to receive updates
- Choose Websockets when both sides need to communicate in real time


9. WebRTC

- It is designed for real-time peero-to-peer communication
- supports
  - audio
  - video
  - arbitrary data

```
             Signaling Server
              /           \
             /             \
            ▼               ▼
        Peer A            Peer B
           │                 │
           └──── WebRTC ─────┘
              connection
```

10. Signaling

- WebRTC itself does not prescribe a specific signaling protcol
  - exchanging session descriptions
  - exchanging ICE candidates
  - coordinated connection setup

```
Peer A
   │
   │ SDP / ICE candidates
   ▼
WebSocket Server
   │
   │
   ▼
Peer B
```

14. SDP

- Session Description Protocol
  - It describes the characteristics of the communication session
    - Audio
    - Video
    - Codecs
    - Media capabilities
    - Connection information

```
Peer A
  ↓
Offer
  ↓
Signaling
  ↓
Peer B
  ↓
Answer
  ↓
Signaling
  ↓
Peer A
```

15. ICE
  - Interactive Connectivity establishmen
    - Find a network path that allows the two peers to communicate
      - path cans be
        - local address
        -  public address
        - TURN relay

```
Possible paths
      ↓
ICE
      ↓
Connectivity checks
      ↓
Working path
```

16. STUN
  - It helps a device discover its public-facing network address
```
Private IP
192.168.1.10
      ↓
NAT
      ↓
Public IP
203.x.x.x
```
  - The STUN server helps the client discover how it appears from the public internet
  - STUN is useful for establishing direct peer-to-peer connections


17. TURN
- Sometimes direct peer-ro-peer communication isn't possible because of restrictive NAT/firewalls
- TURN comes in

Instead of this
```
Peer A ─────────────── Peer B
```


We do this
- turn relays the traffic

```
Peer A
   ↓
TURN Server
   ↓
Peer B
```


- STUN
  - Discover public network information
  - help establish direct connection
- TURN
  - Relays traffic when direct connection fails

```
Peer A                         Peer B
  │                              │
  │──── Offer via signaling ────→│
  │←─── Answer via signaling ────│
  │                              │
  │──── ICE candidates ─────────→│
  │←─── ICE candidates ──────────│
  │                              │
  └──── Connectivity checks ─────┘
               │
               ▼
        Direct connection?
          /          \
        YES           NO
         │             │
         ▼             ▼
      P2P path      TURN relay

```

18. Media Channels

- Audio
- video
- WebRTC handles the real-time transport and negotiation while codecs handle encoding/decoding

```
Microphone
    ↓
WebRTC
    ↓
Peer
    ↓
Speaker
```

```
Camera
   ↓
WebRTC
   ↓
Peer
   ↓
Screen
```

```
                    Signaling
                  WebSocket Server
                   /          \
                  /            \
                 ▼              ▼
              Peer A          Peer B
                 │              │
                 └── WebRTC ────┘
                    Audio/Video
```

- Websocket handles
  - signaling
  - connection events
  - call state
- WebRTC handles
  - audio
  - video
  - data

```
                         Contrars Client
                               │
                    ┌──────────┴──────────┐
                    │                     │
              REST/HTTP APIs          WebSocket
                    │                     │
                    │               Real-time events
                    │                     │
                    └──────────┬──────────┘
                               │
                          Backend
                               │
                    ┌──────────┴──────────┐
                    │                     │
                 Database          Real-time services
```