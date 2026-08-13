### Node, Express, Nest.js

1. Node.js Runtime

- It allows javascript/typescript to run outside the browser
- Node uses v8 engine to execute javascript
- It also provides apis for
  - networking
  - filesystem
  - timers
  - streams
  - processes
  - cryptography
  - http
- It is particularly useful for I/O heavy applications because it uses an event-driven, non-blocking architecture

```
Your JS/TS code
      ↓
Node.js
      ↓
V8 JavaScript Engine
      ↓
Operating System
```

2. Non-Blocking I/O

```tsx
const data = await database.query(...);
console.log(data);
```

- While the database operation is waiting on I/O, Node can process other work
- This is why node can handle many concurrent I/O operations efficiently
- Non-blocking doesn't mean "everything is asynchronous"
- CPU heavy javascript still runs on the main event-loop and can block other requests

```
Request A
   ↓
DB query ────────────────┐
                        │
Request B               │
   ↓                    │
Process B               │
                        │
Request C               │
   ↓                    │
Process C               │
                        ↓
                   DB completed
```

3. Event Loop

- The event loop coordinates asynchronous work

```
        ┌──────────────┐
        │ Call Stack   │
        └──────┬───────┘
               ↓
        Execute JS
               ↓
        Async operation
               ↓
       OS / Node APIs
               ↓
       Completion callback
               ↓
        Event Loop
               ↓
        Call Stack
```

4. Deal with CPU Heavy Work

```
Worker Threads
child processes
background job queues
external services
moving computation elsewhere
```

5. Express.js

- It is a lightweight Node.js web framework

```
HTTP Request
     ↓
Express
     ↓
Middleware
     ↓
Route
     ↓
Controller/Handler
     ↓
Response
```

6. Express Middleware

- It sits between the request and the final handler

```tsx
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
```

```
Request
  ↓
Middleware A
  ↓
Middleware B
  ↓
Authentication
  ↓
Route Handler
  ↓
Response
```

7. Next

- next() in express.js
  - continue to the next middleware/handler
  - We can also pass a executing to express's error-handling middleware

8. Express Error Handling

- Don't want every controller manually implementing try/catch

```typescript
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Internal Server Error",
  });
});
```

```
Controller
   ↓
throw error
   ↓
Error middleware
   ↓
HTTP response
```

9. Express Routing

- Routes map HTTP methods + paths to handlers

```
GET    /users
POST   /users
GET    /users/:id
PATCH  /users/:id
DELETE /users/:id
```

```
routes/
├── users.routes.ts
├── orders.routes.ts
└── products.routes.ts
```

10. Rest API Fundamentals

- REST APIs typically use HTTP methods according to the operation

```
| Method | Purpose        |
| ------ | -------------- |
| GET    | Retrieve       |
| POST   | Create         |
| PUT    | Replace        |
| PATCH  | Partial update |
| DELETE | Delete         |

GET    /users/42
POST   /users
PATCH  /users/42
DELETE /users/42
```

11. HTTP Status Codes

```
200 OK
201 Created
204 No Content
```

```
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
429 Too Many Requests
```

```
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
```

12. Path Parameters vs Query Parameters

- path parameters

```
/users/123
```

- query parameters

```
/users?page=2&limit=20&search=photon
```

13. Authentication

- Common Approaches
  - session cookies
  - jwt
  - OAuth
  - OpenID Connect

```
Login
 ↓
Verify credentials
 ↓
Create session/token
 ↓
Client sends credential
 ↓
Server validates it
 ↓
Identify user
```

14. Authorization

- This allows user what they are able to do

```
User
 ↓
Authenticated
 ↓
Role = USER
 ↓
Can access /profile
 ↓
Cannot access /admin/users
```

- RBAC (Role based access control)

```
ADMIN
MANAGER
USER
```

- Permission Based

```
users.read
users.write
orders.refund
products.delete
```

15. JWT (JSON Web Token)

- JWT payload is encoded, not automatically encrypted

```json
{
  "sub": "123",
  "role": "admin",
  "exp": 123456789
}
```

```
Header.Payload.Signature
```

16. Cookies vs Authorization Header

```
Authorization: Bearer <token>
```

or stored in cookie

- in browser secure cookie is useful
  - HttpOnly
  - Secure
  - SameSite

17. Nest.js

- Nest.js provides a structured architecture on top of Node.js
- Nest can use express or fastify underneath

```
Module
 ├── Controller
 ├── Providers
 ├── Services
 └── Repository
```

```
UsersModule
├── UsersController
├── UsersService
└── UsersRepository
```

18. Nest Modules

- Module helps establish application boundaries

```tsx
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

```
UsersModule
     ↓
UsersController
     ↓
UsersService
     ↓
Database
```

19. Controllers

- Controller handle http requests
- It should be generally thin
- It handles
  - http input
  - parameters
  - request/response concerns
  - calling application/service logic

```tsx
@Controller("users")
export class UsersController {
  @Get(":id")
  getUser(@Param("id") id: string) {
    return this.usersService.getUser(id);
  }
}
```

20. Providers/Services

- Business logic generally belongs in providers/services

```tsx
@Injectable()
export class UsersService {
  async getUser(id: string) {
    // business logic
  }
}
```

```
HTTP concern
     ↓
Controller
     ↓
Business logic
     ↓
Service
```

21. Dependency Injection

- Injects the dependency

```tsx
constructor(
  private usersService: UsersService
) {}
```

```
Nest Container
     ↓
Creates UsersService
     ↓
Creates UsersController
     ↓
Injects UsersService
```

- Benefits
  - Loose coupling
  - Easier Testing
  - Centralized dependency management
  - easier replacement/mocking

22. Nest Request Lifecycle

```
Request
 ↓
Middleware
 ↓
Guards
 ↓
Interceptors
 ↓
Pipes
 ↓
Controller
 ↓
Service
 ↓
Response
 ↓
Interceptors
```

23. Guards

- Guards are commonly used for authentication/authorization

```tsx
@UseGuards(AuthGuard)
@Get("/profile")
getProfile() {}
```

```
Request
 ↓
Auth Guard
 ↓
Authenticated?
 ↓ yes
Controller
```

24. Pipes

- It transforms and validate incoming data
- Nest validates the incoming request automatically

```tsx
ValidatePipe;
```

```tsx
class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
```

```tsx
@Post()
create(@Body() dto: CreateUserDto) {}
```

25. Interceptors

- It can execute logic before and/or after the handler
- Useful
  - logging
  - response transformation
  - timing
  - caching
  - metrics
  - serialization

26. ORM

- Object-Relational Mapping
- Instead of writing sql everywhere
  - we can work with objects/models
  - eg
    - TypeORM
    - Sequelize

```
Database table
      ↕
Application model/entity
```

27. TypeORM

- It uses entities

```tsx
@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

userRepository.find({
  where: {
    id: 123,
  },
});
```

28. Sequelize

- It is another ORM for Node.js
- Supports
  - models
  - associations
  - queries
  - transactions
  - migrations

```
Model
 ↓
ORM
 ↓
SQL
 ↓
Database
```

29. ORM Relationships

- One to One

```
User ─── Profile
```

- One-to-Many

```
User ─── Orders
```

- Many-to-Many

```
Users ─── Roles
```

- Usually many-to-many uses a join table

```
users
roles
user_roles
```

30. Transactions

- It ensure multiple database operations behave as one logical operation

```
Create Order
 ↓
Decrease Inventory
 ↓
Create Payment Record
```

- if payment record creation fails
- rollback

```
BEGIN
 ↓
Operation A
 ↓
Operation B
 ↓
Operation C
 ↓
COMMIT

or

ROLLBACK
```

31. Async Error Handling

```tsx
throw new NotFoundException("User not found");
```

32. Validation

- Never trust client input
- Validation should happen on the server even if the frontend already validates

```
body
params
query
headers
files
```

```
email → valid email
age → number
price → positive number
role → allowed enum
```

33. Security Fundamentals

- Input Validation
  - never trust client input

```
req.body
req.query
req.params
```

- SQL injection
  - Use parameterized queries/ORM safely

- XSS
  - Don't blindly render untrusted HTML

- CSRF
  - Important especially with cookie-based authentication

- CORS
  - Controls which origins can make browser requests to our API
  - It is a browser security mechanism
  - The API needs appropriate CORS configuration if the browser frontend is making cross-origin requests

- Rate limiting
  - Protect login/API endpoints from abuse

- Helment/security headers
  - Useful in express applications

- Passwored Hashing
  - never store plain passwords
  - use strong crypto.bcrypt algorithm

34. Pagination

```
GET /users?page=2&limit=20

LIMIT 20 OFFSET 40
```

```
GET /users?cursor=abc123&limit=20
```

- Often better for large datasets and continously changing data

35. API Response Design

- Keep response structures consistent.
- Consistency makes frontend integration much easier

```json
{
  "data": {
    "id": 123,
    "name": "Photon"
  }
}

{
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User not found"
  }
}
```

36. Versioning Strategies

```
/api/v1/users
/api/v2/users
```

- Backward compatibility
- Breaking changes
- migrations
- deprecations

37. Idempotency

- An operation is idempotent if repeating it produces the same intended result
