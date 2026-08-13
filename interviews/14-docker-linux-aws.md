### Docker / Linux / AWS

1. Docker
  - Now movig into deployment
  - Docker packages applications into containers
    - A container gives us a consistent runtime environment
```
Application
    +
Dependencies
    +
Runtime
    ↓
Docker Image
    ↓
Container
```

2. Docker Image vs Container

- Images
  - An immutable-ish template/packages used to create containers
  - blueprint

```
Dockerfile
    ↓
docker build
    ↓
Image
```

- Container
  - A running instance of a image
  - running instance
```
Image
 ↓
docker run
 ↓
Container
```

3. Dockerfile

- A dockerfil e describes how to build an image

```dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "start"]
```

```
FROM
WORKDIR
COPY
RUN
ENV
EXPOSE
CMD
ENTRYPOINT
```

4. Docker Layers

- Docker images are built in layers

```
FROM node
    ↓
COPY package.json
    ↓
RUN npm install
    ↓
COPY source
```

- Docker can reuse unchanged layers from chache
- This is why Dockerfile ordering matters

5. Multi-Stage Builds

- Multi-stage builds allow us to separate the build environment from the runtime environment
- Benefits
  - Smaller Image
  - Less attack surface
  - faster deployment
  - cleaner production environment

```
Stage 1
Node
 ↓
npm install
 ↓
npm build
 ↓
dist/


Stage 2
Nginx
 ↓
COPY dist/
```

6. Docker Volumes

- Containers are ephemeral by default.
- If a container is removed, its writable filesystem disappears.
- Volumes provide persistent storage
- Useful for:
  - databases
  - persistent application data
  - files that must survive container recreation

```
Container
   ↕
Volume
```

7. Docker Networks
  - Containers need to communicate
  - Docker networks allow contaienrs to communicate using service/container name

```
nginx
  ↓
backend
  ↓
postgres

postgres:5432
```

8. Docker Compose
- It is useful for local development and smaller deployments
- for multiple services

```
services:
  nginx:
  backend:
  postgres:
  redis:
```

```
             Docker Network
                   │
       ┌───────────┼───────────┐
       ↓           ↓           ↓
     Nginx       Backend     PostgreSQL
                   │
                   ↓
                 Redis
```

9. Nginx
- It is commonly used fas:
  - reverse proxy
  - static file server
  - load balancer
  - TLS termination point

```
Client
  ↓
Nginx
  ↓
Application
```

10. Reverse Proxy

- Suppose our backend runs on localhost:8000
- We don't necessarily wants users accessing that directly
- Nginx can expose:
```
https://example.com/api
```
- Proxy it internally

```
Client
  ↓
Nginx :443
  ↓
Backend :8000
```

```
location /api/ {
    proxy_pass http://backend:8000;
}
```

11. Statix Asset Serving

- Nginx is very efficient at service static files
- the backend doesn't need to handle those requests

```
Nginx
 ├── index.html
 ├── app.abc123.js
 ├── styles.def456.css
 └── images/
```

```
Client
   ↓
Nginx
 ├── /assets → static files
 │
 └── /api → backend
```

12. typical Nginx Architecture

```
                   Internet
                      │
                      ▼
                   Nginx
                /          \
               /            \
        Static Assets      /api
             │               │
             ▼               ▼
          Frontend        Application
                              │
                       ┌──────┴──────┐
                       ▼             ▼
                   PostgreSQL      Redis
```

13. AWS EC2

- Elastic Compute Cloud
- It's essentially a virtual server in AWS

```
Instance type
AMI
Storage
Networking
Security groups
IAM role
```

- Then run our application on the machine

```
AWS
 └── EC2
      └── Linux server
           ├── Docker
           ├── Nginx
           └── Application
```

14. EC2 Security Groups

- Security groups act as a network level access controls for EC2 Instances

```
80   → HTTP
443  → HTTPS
22   → SSH
```

- Just expose the ports which are needed

```
Internet
   ↓
80/443
   ↓
Nginx
```

15. Environment Variable

- Configuration should generally be separated from application code
- different values for

```
Development
Staging
Production
```


16. Secrets
  - Includes
    - Database passwords
    - API keys
    - JWT signng secrets
    - AWS credentials
    - Private keys
  - use
    - AWS Secretes Manager
    - AWS Systems Manager Parameter Store


17. Linux Proccess

- find running process

```
ps aux
top
htop
```

- Find a specific resource

```
ps aux | grep nginx
```

- Check services

```
systemctl status nginx
```

- Check logs

```
journalctl -u nginx
docker logs -f <container>
```

18. CPU/Memory Troubleshooting
  - if the server is slow
    - CPU
    - Memory
    - Disk
    - Network
    - Application
    - Databasee

- high cpu -> inspect processes
- high memory -> inspect memory usage/leaks
- disk full -> inspect logs/files
- network issue -> inspect connectivity / ports

```bash
top
free -h
df -h
du -sh *
```

19. Linux Network Terminology

- to see listening ports

```
ss -tulpn
```

- to test an HTTP service

```
curl http://localhost:800
```

- for basic connectivity

```
ping example.com
nslookup example.com
dig example.com
```

- DNS troubleshooting

```
Is process running?
       ↓
Is port listening?
       ↓
Can localhost reach it?
       ↓
Can another machine reach it?
       ↓
DNS correct?
       ↓
Firewall / Security Group?
       ↓
Nginx configuration?
```

```
                         Internet
                            │
                            ▼
                       AWS EC2
                            │
                            ▼
                         Nginx
                     ┌──────┴──────┐
                     │             │
                     ▼             ▼
                Static Files    /api/*
                                    │
                                    ▼
                              Application
                             ┌──────┴──────┐
                             │             │
                             ▼             ▼
                         PostgreSQL      Redis

                    EC2
                     │
                Docker Network
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
    Nginx         Backend        Redis
                     │
                     ▼
                PostgreSQL
```


20. Request Flow

```
Browser
  ↓
HTTPS
  ↓
Nginx
  ↓
Reverse Proxy
  ↓
Backend Container
  ↓
Application
  ↓
Redis cache
  ↓
PostgreSQL
  ↓
Backend
  ↓
Nginx
  ↓
Browser
```

21. Production Deployment Flow

```
Developer
    ↓
Git
    ↓
CI/CD
    ↓
Build Docker Image
    ↓
Push Image to Registry
    ↓
EC2 pulls image
    ↓
Start Container
    ↓
Nginx
    ↓
Application
```


```
GitHub
   ↓
CI/CD
   ↓
Docker Build
   ↓
Container Registry
   ↓
EC2
   ↓
Docker
   ↓
Application
```