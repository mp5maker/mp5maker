## Offline-First Web

```
                    Web Application
                          │
                ┌─────────┴─────────┐
                │                   │
          Service Worker       Application
                │                   │
                ▼                   ▼
             Cache             IndexedDB
                │                   │
                └─────────┬─────────┘
                          │
                       Network
                          │
                          ▼
                       Server
                          │
                          ▼
                       Database
```


```
IndexedDB
Service Worker
Caching Strategies
Offline Queue
Synchronization
Conflict Resolution
Eventual Consistency
```

1. What is offline first

- A normal web application might think

```
Request
  ↓
Network
  ↓
Server
  ↓
Response
  ↓
UI
```

- If the network disappears

```
Request
  ↓
❌ Network
  ↓
Application breaks
```

- An offline-first appliation instead assumes:
  - Thenetwork may be unavailable, so local storage should be cpable of supporting the application temporarily

```
User
 ↓
Application
 ↓
Local data
 ↓
UI
```


```
Local changes
 ↓
Sync
 ↓
Server
```


2. Why IndexedDB?

- For serious offline applications, localStorage isn't enough

- localStorage
  - good for small values
  - string-based sotrage
  - synchronous API
  - relatively small storage capacity
  - not designed for complex datasets
  - poor fit for large offline applications

- IndexedDB
  - It is a browser database designed for storing structured data locally
  - supports
    - objects
    - indexes
    - transactions
    - larger datasets
    - asynchronour operations

3. IndexedDB Object Stores

- An object store is a roughly comparable to a table in a relational database

```
IndexedDB Database
│
├── users
├── appointments
├── patients
├── messages
└── syncQueue
```

An object store could contain
```
{
  "id": "patient-123",
  "name": "John",
  "updatedAt": 1720000000
}
```


4. IndexedDB Keys
  - Every object stored in an object store needs a way to be identified
  - Keys can come from
    - explicit key values
    - keyPath
    - auto-incremented values

5. IndexedDB Indexes

- This s similar to database indexes


6. IndexedDB Transactions

```
Transaction
   ↓
Update patient
   ↓
Create sync queue item
   ↓
Commit
```

7. Service Work
- A service worker is a backgorund browser process that can intercept network requests and participate in caching/offline behaviour

```
Browser
   ↓
Service Worker
   ↓
Network
```

- Service worker can intercept

```
fetch()
```

- and decide

```
Should I use cache?
Should I use network?
Should I return a fallback?
```

8. Service Worker Lifecycle


```
Register
   ↓
Install
   ↓
Activate
   ↓
Fetch events
```

- web application registers the worker

```javascript
navigator.serviceWorker.register("/sw.js");
```

- install browser download and installs the service worker
- This is often where we put pre-cache important assets

```
HTML
CSS
JS
icons
offline page
```

- Activate
  - the new worker becomes active
    - the old caches are cleaned up

```
Old cache
   ↓
Delete
```

- Fetch
  - The service worker can intercept network request

```
Request
 ↓
Service Worker
 ↓
Cache / Network
```


9. Cache Storage vs IndexedDB

- Cache Storage
  - Useful for
    - HTTP responses
    - static assets
    - API responses

```
/cache
 ├── app.js
 ├── styles.css
 └── /api/products
```

- Indexed DB
  - Better for
    - structured application data
    - records
    - offline mutations
    - sync queue

10. Cache First

```
Request
 ↓
Cache?
 ├── YES → return cache
 └── NO
      ↓
    Network
      ↓
    Cache result
      ↓
    Return
```

- Good For
  - static assets
  - application shell
  - images
  - relatively stable reference data

11. Network-First

```
Request
 ↓
Network
 ├── SUCCESS → return + optionally cache
 └── FAIL
       ↓
     Cache
       ↓
     Return cached data
```

- Good when freshness is more important offline support is still required
  - frequiently changing data
  - user dashboards
  - recent server information

12. Stale-While-Revalidate

```
Request
 ↓
Cache
 ↓
Return cached data immediately
          +
       Network
          ↓
     Update cache
```


```
                    HealthOS Web App
                          │
             ┌────────────┴────────────┐
             │                         │
        Service Worker             Application
             │                         │
        Cache static              IndexedDB
        resources                     │
                                ┌──────┴──────┐
                                │             │
                            Local Data    Sync Queue
                                │             │
                                └──────┬──────┘
                                       │
                              Network Available
                                       │
                                       ▼
                                Sync Engine
                                       │
                              Retry / Conflict
                                       │
                                       ▼
                                   API Server
                                       │
                                       ▼
                                  PostgreSQL
```