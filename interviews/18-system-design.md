## System Design

1. What is System Design

- It is the process of deciding how different components work together to satisfy requirements
  - scalibility
  - performance
  - reliability
  - availability
  - security
  - maintainability
  - consistency


- How should entire system behave when 100,000 users are using it?

```
Client
   ↓
Load Balancer
   ↓
Application Servers
   ↓
 ┌───────────┬────────────┐
 ↓           ↓            ↓
Redis     PostgreSQL   Elasticsearch
             ↓
           Queue
             ↓
        Background Workers
```


2. Start system Design with Requiremnents

- For chat what do I need?

```
Send Message
Receive Message
View History
Online/Offline Status
```

- How should it behave?

```
10 million users
99.9% availability
Low latency
Horizontal scalability
Data durability
```

3. Scalable Rest API Design

```
Client
 ↓
Load Balancer
 ↓
API Server
 ↓
Service Layer
 ↓
Database / Cache / Queue

GET /api/v1/products/123
POST /api/v1/orders
PATCH /api/v1/orders/123
DELETE /api/v1/orders/123
```

4. API Versioning

```
/api/v1/users
/api/v2/users
```

5. Stateless Application Servers

- For horizontal scaling, application servers should ideally be stateless

```
             ┌── Server A
Client ──────┼── Server B
             └── Server C
                    │
                    ▼
                  Redis
```

6. Horizontal Scaling

- Instead of making one machine increasingly powerful
- Horizontal scaling is generally more flexible for web application

```
        Load Balancer
        /     |      \
       ↓      ↓       ↓
    Server  Server  Server
      A       B       C
```

- Vertical scaling

```
Small server
    ↓
Bigger CPU/RAM server
```

7. Load Balancing

- A load balancer distributes requests across application servers

```
                 Load Balancer
                /      |      \
               ↓       ↓       ↓
             App 1   App 2   App 3
```

- Send traffic to the server currently handling fewer connections
- Give stronger servers more traffic


8. Database Scaling

- A database can become a bottleneck
- Might introduct Read Replicas
- Write goes to the primary

```
                 ┌→ Read Replica 1
App → Database ──┼→ Read Replica 2
                 │
                 └→ Primary
```

```
INSERT
UPDATE
DELETE
```

9. Database Connection Pooling

- Opening a new database connection for every request can be expensive
- Request reuse existing conections
- This improves performance and prevents the application creating an excessive number of database connections

```
Application
    ↓
Connection Pool
 ┌──┼──┬──┐
 ↓  ↓  ↓  ↓
 DB connections
```

10. Redis

- It is an in-memory data store commonly used for
  - caching
  - sessions
  - rate limiting
  - distributed locks
  - counters
  - temrporary data
  - queues/pub-sub patterns

- concepts
  - cache validation
  - redis ttl

11. Cache-Aside Pattern

```
Application
     ↓
Check Redis
     ↓
Cache hit → Return
     │
     └── Cache miss
             ↓
          Database
             ↓
          Redis.set()
             ↓
           Return
```


```
1. Requirements
       ↓
2. Scale / traffic assumptions
       ↓
3. API / communication model
       ↓
4. High-level architecture
       ↓
5. Database design
       ↓
6. Caching
       ↓
7. Async processing / queues
       ↓
8. Scaling
       ↓
9. Failure handling
       ↓
10. Observability
       ↓
11. Security
```

```
1. Requirements
       ↓
2. Scale / traffic assumptions
       ↓
3. API / communication model
       ↓
4. High-level architecture
       ↓
5. Database design
       ↓
6. Caching
       ↓
7. Async processing / queues
       ↓
8. Scaling
       ↓
9. Failure handling
       ↓
10. Observability
       ↓
11. Security
```