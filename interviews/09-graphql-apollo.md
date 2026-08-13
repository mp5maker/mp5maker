## GraphQL / Apollo

1. GraphQL vs REST

- Rest exposes multiple endpoints representing resources

```
GET    /users
GET    /users/123
GET    /users/123/orders
POST   /users
PUT    /users/123
DELETE /users/123
```

- GraphQL usually exposes a single endpoint
- The client specifies exactly waht data it wants

```
query {
  user(id: 123) {
    id
    name
    orders {
      id
      total
    }
  }
}
```

- The graphql gives clients more control over the shape of the resonses

2. GraphQL Schema

- The schema is the contract between client and the server
- It defines
  - available types
  - fields
  - queries
  - mutations
  - arguments
  - return types

```tsx
type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  user(id: ID!): User
}

type Mutation {
  createUser(name: String!, email: String!): User!
}
```

```
Schema
   ↓
What can clients ask for?
What arguments are accepted?
What types come back?
What operations are available?
```

- GraphQL is strongly typed

3. GraphQL Types

```
String
Int
Float
Boolean
ID
```

- custom objects
- ! means non-null
- users: [User!]!
  - the list itself cannot be null
  - each user inside the list cannot be null

```
type User {
  id: ID!
  name: String!
}
```

4. Queries

- A query reads data
- The client controls which field it wants

```
query {
  users {
    id
    name
  }
}
```

```
query {
  user(id: "123") {
    name
    email
  }
}
```

5. Mutation

- A mutation changes data
- GraphQL also has subscriptions for real-time/event-driven updates, although your listed sysllabus doesn't specifically require theme

```
mutation {
  createUser(...)
}

mutation {
  updateUser(...)
}

mutation {
  deleteUser(...)
}
```

6. Resolver

- A resolver is the funtion responsible for resolving the field or operation
- The schema defines what is available, the resolver defines how the data is actually obtained

```schema
type Query {
  user(id: ID!): User
}
```

```resolver
const resolvers = {
  Query: {
    user: (_, { id }) => {
      return User.findById(id);
    }
  }
};
```

```
user: (parent, args, context, info) => {
    // ...
}

parent → result from the parent resolver
args → arguments supplied by the client
context → request-level information, often authenticated user, database/services, etc.
info → GraphQL execution information
```

```
Client
 ↓
GraphQL Query
 ↓
Schema
 ↓
Resolver
 ↓
Database / Service
 ↓
Result
```

7. Nested Resolver

```schema
type User {
  id: ID!
  name: String!
  orders: [Order!]!
}
```

```
query {
  users {
    name
    orders {
      id
      total
    }
  }
}
```

```
Query.users
    ↓
User
    ↓
User.orders
    ↓
Order
```

- this is where one of graphql's biggest backend problem appears N+1 problem

8. N+1 Problem

- Suppose we fetch 100 users
- thats 1 query
- Then each user's orders are fetched separately
  - This is not 1 + 100 = 101 queries

9. Batching / DataLoadier

- collect all request ids
- Perform one query

```
100 resolver calls
       ↓
DataLoader
       ↓
Batch IDs
       ↓
1 database query
       ↓
Distribute results
```

10. Apollo Client

- It is a client side graphql library

- It handles
  - sending graphQL queries
  - mutations
  - manging loading/error states
  - caching
  - updating cached data

```tsx
const { data, loading, error } = useQuery(GET_USERS);
```

```
React
 ↓
Apollo Client
 ↓
GraphQL API
 ↓
Backend
```

11. Apollo Client Cache

- Important feature normalized cache
- Apollo can store the entity based on its identity

```
User:123
   ↓
{
  id: 123,
  name: "Photon"
}
```

12. Apollo Fetch Policies

- It can control whether a query uses the cache, network or both.
- Common concepts
  - `cache-first`

```
Cache
 ↓
hit → return
 ↓
miss → network
```

- `network-only`
  - always request from the server
- `cache-and-network`

```
Cache → UI
   +
Network → fresh data → UI
```

13. GraphQL Pagination

- We have to design it

```
query {
  users(page: 2, limit: 20) {
    id
    name
  }
}
```

- cursor based pagination

```
query {
  users(first: 20, after: "cursor123") {
    edges {
      node {
        id
        name
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

14. GraphQL Errors

- GraphQL Errors are slightly different from REST
- A GraphQL resonse can contain both
  - data
  - errors

```
{
  "data": {
    "user": null
  },
  "errors": [
    {
      "message": "User not found"
    }
  ]
}
```

15. GraphQL Authentication vs Authorization

- Authentication
  - who are you

- Authorization
  - are you allowed to perform this operation

```
User 123
 ↓
Request User 456's private profile
 ↓
Authorization check
 ↓
DENIED
```

16. GraphQL Security

- GraphQL has some unique security concerns.
- Query Depth
  - A malicious/deep query could request
- Solutions
  - query depth limits
  - query complexity limits
  - timeouts
- Introspection
  - supports scheme instrospection
    - it can be useful during development but may expose API
- Input Validation
  - arguments
  - IDs
  - filters
  - pagination limits
  - mutation inputs

```
                 GraphQL Client
                      │
                      ▼
                Apollo Client
                      │
              Cache / Network
                      │
                      ▼
                 /graphql
                      │
                      ▼
                  Schema
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
       Query                    Mutation
          │                       │
          ▼                       ▼
      Resolver                 Resolver
          │                       │
          └───────────┬───────────┘
                      ▼
                 Service Layer
                      │
                      ▼
                  DataLoader
                      │
                      ▼
                   Database

```
