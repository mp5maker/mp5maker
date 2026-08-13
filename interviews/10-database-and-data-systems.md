## PostgreSQL, Oracle

1. PostgreSQL Indexes

- An index is a data structure that helps the database find rows without scanning the entire table

- without an index

```
SELECT * FROM users WHERE email = 'x@example.com';

Database
 ↓
Scan row 1
Scan row 2
Scan row 3
...
Scan row 1,000,000
```

```
Query
 ↓
Index
 ↓
Find matching location
 ↓
Table row
```

- Don't bloind index every columne
  - consumes storage
  - make write more expensive
  - need maintenance
  - aren't always useful for low-selectivity columns

2. Joins

- Joins combine related rows between tables
- innerjoins
  - only matching records
- left join
  - everything from the left table + matching rows from the right


```
Match on
left.customer_id = right.customer_id

Left table
customer_id	customer
1	Ava
2	Bo
4	Dee

Right table
customer_id	level
1	Gold
3	Silver
4	Bronze
↓

INNER JOIN · Result
customer_id	customer	level
1	Ava	Gold
4	Dee	Bronze

LEFT JOIN · Result
customer_id	customer	level
1	Ava	Gold
2 Bo  NULL
4	Dee	Bronze

Right JOIN · Result
customer_id	customer	level
1	Ava	Gold
2 NULL Silver
4	Dee	Bronze

FULL OUTER JOIN · Result
customer_id	customer	level
1	Ava	Gold
2 Bo  NULL
3 NULL Silver
4	Dee	Bronze
```

3. B-Tree

- The default and most commonly used in postgresql
- good for
```sql
=
<
>
<=
>=
ORDER BY
```

```sql
CREATE INDEX idx_users_email
ON users(email);
```

4. Hash

- Useful mainly for equality comparison, alothough B-tree is sually the general purpose choice

5. GIN

- Useful
  - JSONB
  - array
  - full-text search

6. GiST

- Useful for pseacialized data types such as:
  - geometric data
  - ranges
  - som full-text/search use cases

7. Composite Indexes

```sql
SELECT *
FROM orders
WHERE customer_id = 123
AND status = 'pending';
```

```sq;
CREATE INDEX idx_orders_customer_status
ON orders(customer_id, status);
```


8. Constraints

- Constraints enforce data integrity at the dataase level

- Primary Key
  - uniquely identies a row
```sql
id BIGINT PRIMARY KEY
```
- Foreign Key
  - Maintains relations
```sql
user_id BIGINT REFERENCES users(id)
```
- UNIQUE
  - Prevents duplication
```sql
email TEXT UNIQUE
```

- NOT NULL
  - requires a value
```sql
name TEXT NOT NULL
```

- CHECK
  - enforces a condition;
```sql
age INT CHECK (age >= 0)
```

- Why database contraints matter
  - Don't rely exclusevely o application-level validation

```
Application
   ↓
"email doesn't exist"
   ↓
Database
```

9. Transactions

- A transaction groups multiple database operations into one logical unit.

```
BEGIN
 ↓
Debit A
 ↓
Credit B
 ↓
COMMIT
```

10. ACID

- Atomicity
  - All operations success or none do
- Consistency
  - the database moves from one valid state to another
- Isolation
  - concurrent transations should not improperly interface with each other
- Durability
  - Once committed, data should survive a crash


11. Transaction Isolation

- Isolation determines what one transaction can see while other transaction are executing

```
Read Uncommitted
Read Committed
Repeatable Read
Serializable
```

12. Locking

- Locks control concurrent access to data

```
Transaction A
     ↓
Updating account balance

Transaction B
     ↓
Updating same account
```

- Row level locking
  - Postgresql can lock specific rows

```sql
SELECT *
FROM accounts
WHERE id = 123
FOR UPDATE;
```

```
Transaction A
     ↓
Locks account 123
     ↓
Updates it

Transaction B
     ↓
Tries to modify account 123
     ↓
Must wait
```

- Pessimistic Concurrency
  - Assume conflicts might happen and lock the resource
- Optimistic Concurrency
  - Assume conflicts are uncommon and detect conflicts when updating

13. Normalization

- Normalization reduces duplication and improves data integrity
- benefits
  - less duplication
  - easier updates
  - better consistency
  - cleaner relationships

```
customers
---------
id
name
email
address

orders
------
id
customer_id
total
```

14. Denormalization

- It intentionaly duplicates data to improve read performance or simplify queries

15. EXPLAIN

- It tells use how postgresql plants to execute a query

```
EXPLAIN
SELECT *
FROM users
WHERE email = 'x@example.com';
```

- Explain Analyze

```
EXPLAIN ANALYZE
SELECT *
FROM users
WHERE email = 'x@example.com';
```

- estimated rows
- actual rows
- execution time
- scan type
- joins sort operations
- loops

- Query Optimization process
```
Slow query
   ↓
EXPLAIN ANALYZE
   ↓
Identify bottleneck
   ↓
Check indexes / joins / filters
   ↓
Optimize
   ↓
EXPLAIN ANALYZE again
```

16. Postgres vs Oracle

- Postgress
  - Strong open source eco systems
  - extensions
  - powerful indexing
  - PostgreSQL specific types
  - JSONB
- Oracle
  - Enterprise focused ecosystem
    - PL/SQL
    - sequences
    - pakcages
    - Oracle specific tooling
    - enterprise features

17. Redis

- Redis is an in-memory data store commonly used for
  - caching
  - sessions counters
  - rate limiting
  - distributed locks
  - pub/sub
  - queues/streams depending on the architecture

18. Redis Caching

```
Request
 ↓
Check Redis
 ↓
Cache hit → return
 ↓
Cache miss
 ↓
Database
 ↓
Store result in Redis
 ↓
Return
```

```python
value = redis.get("user:123")

if not value:
    value = database.get_user(123)
    redis.set("user:123", value)
```

19. Redis TTL

- TTL = Time to Live
- useful for invalidation

20. Redis Pub/Sub

- Pub/sub allows publishers to send messages to subscribers
- It is not the thing as a durable message queue
- It generally aren't stored fro cosumers to process later if they were disconnected
  - Dureable Ones
    - Redis Streams
    - RabbitMQ
    - Kafka
```
Publisher
   ↓
Redis channel
   ↓
Subscribers
```

```
Order Service
     ↓
"order.created"
     ↓
Redis
   ↙   ↘
Email  Notification
```

21. Redis vs Message Broker

- REdis Cache -> fast temporary data
- Pub/Sub -> Real time event distribution
- Message Broker -> Reliable asynchronous message processing

```
API
 ↓
Queue
 ↓
Worker
 ↓
Email
```

22. Elasticsearch

- It is a distributed search and analytics engine built around an inverted index
- Usefull for
  - full-text search
  - fuzzy matching
  - filtering
  - ranking
  - log/search workloads
  - aggregations

```
Application
   ↓
PostgreSQL
   ↓
Source of truth

PostgreSQL
   ↓
Indexing pipeline
   ↓
Elasticsearch
   ↓
Search API
```

23. Elasticsearch Index

- In Elasticseasrch, an index is a logical collection of documents
- Elasticesearch indexes the fields so it can search theme efficiently

24. Eleasticsearch Mappings

- Mappings define how fields are stored and indexed
- text
  - usef for full-text search
    - the text is analyzed and tokenized
- keyword
  - used for exact matching, filter, sorting, aggregations
    - category = guitar


25. Elasticsearch Queries

- Match
  - Full-text search
```
match: {
  name: "electric guitar"
}
```

- Term
  - Exact value
```
term: {
  category: "guitar"
}
```

- Bool
  - Combine Conditions
```
must
should
filter
must_not
```

```
Search "guitar"
AND
category = "electric"
AND
price < 200000
```


```
                    PostgreSQL
                        │
                   Source of truth
                        │
                        ▼
                Event / Sync process
                        │
                        ▼
                  Elasticsearch
                  ┌─────┴─────┐
                  ▼           ▼
               Shard        Shard
                  │           │
               Replica      Replica
                        │
                        ▼
                    Search API
```

- Elastic Search is optimized for

```
search
ranking
filtering
aggregations
```

26. BigQuery

- It is a cloud data warehouse designed primarily for large-scale anlytical workloads

```
Application databases
       ↓
 ETL / ELT pipeline
       ↓
    BigQuery
       ↓
Analytics / BI / Reports
```

- Answers analytics data


```
SELECT
    country,
    COUNT(*) AS users
FROM users
GROUP BY country;
```

```
How many users?
Revenue by country?
Monthly active users?
Average order value?
Sales trends?
```

27. Aggregations

- Common Aggregation functions

```
COUNT
SUM
AVG
MIN
MAX
```


```
SELECT
    country,
    SUM(revenue)
FROM sales
GROUP BY country;
```

```
Raw events
    ↓
GROUP BY
    ↓
Aggregation
    ↓
Analytical result
```

```
SELECT country, COUNT(*) AS customer_count FROM customers GROUP BY country;
SELECT age, COUNT(*) AS customer_count FROM customers GROUP BY age;
```

28. BigQuery Cost & Performance

- It is designed to process massive amount of data but query design matters.
- Avoid scanning unnecessary data

- Select only the columns you need

```sql
SELECT
    user_id,
    revenue
FROM huge_table;
```

- Partition large tables by a useful field such as

```
date
timestamp
```

- Clustering can also cluster data around frequently filtered/grouped columns


29. The Big Picture

```
┌───────────────────────────────────────┐
│ PostgreSQL                            │
│ Transactional / relational database  │
│ Users, orders, payments, etc.        │
└───────────────────────────────────────┘

┌───────────────────────────────────────┐
│ Redis                                 │
│ Fast temporary/in-memory data         │
│ Cache, sessions, counters, events     │
└───────────────────────────────────────┘

┌───────────────────────────────────────┐
│ Elasticsearch                         │
│ Search engine                         │
│ Full-text search, filtering, ranking  │
└───────────────────────────────────────┘

┌───────────────────────────────────────┐
│ BigQuery                              │
│ Analytical data warehouse             │
│ Large-scale analytics / reporting     │
└───────────────────────────────────────┘
```

30. ELK Stack

- Elasticsearch
  - Store & Search

- Logstach
  - Ingest & Transform

- Kibana
  - Visualize & Analyze

```
Logstash ──→ Elasticsearch ──→ Kibana
   │              │               │
   │              │               │
Ingest          Store &          Visualize &
/Transform      Search           Analyze
```

- Logstash
  - It is a data ingestion and processing pipeline
  - receive data from different sources
  - parse data
  - transform data
  - filter data
  - send data to elasticsearch or other destinations

```
Application
    ↓
Log files / events
    ↓
Logstash
    ↓
Parse / Transform / Filter
    ↓
Elasticsearch
```

```
input → filter → output
```

```
input
 ↓
Read application logs
 ↓
filter
 ↓
Parse JSON / extract fields
 ↓
output
 ↓
Elasticsearch
```

- Kibana
  - It is the visualization and analysis layer
    - It connects to elastic search and let use
      - search ocuments
      - explore logs
      - create dashboards
      - create visualizations
      - monitor metrics
      - investigate error
      - analyze trends

```
                    Elasticsearch
                    /           \
                   /             \
              Application       Kibana
                                  ↓
                              Dashboard
                                  ↓
                         Charts / Tables / Logs
```


```
┌─────────────────────────────────────┐
│ Application Monitoring              │
├─────────────────────────────────────┤
│ Requests:        1.2M               │
│ Errors:          2,431              │
│ Error Rate:      0.20%              │
│                                     │
│ Requests / Hour                     │
│ ███████████████████████             │
│                                     │
│ Top Errors                          │
│ 500 → Payment Service               │
│ 404 → User Service                  │
└─────────────────────────────────────┘
```

- Complete ELK Archictecture

```
                    Application Servers
                           │
                           ▼
                     Log Files / Events
                           │
                           ▼
                        Logstash
                           │
                    Parse / Filter
                           │
                           ▼
                    Elasticsearch
                     /           \
                    /             \
                   ▼               ▼
               Search            Kibana
                                  │
                                  ▼
                              Dashboards
                              Monitoring
                              Investigation
```

- Modorn architecture does this
  - It uses beats
    - Beats are lightweight agents that collect data from machines/services
```
Filebeat
    ↓
Collect log files
    ↓
Logstash
```

```
Application
    ↓
Filebeat / Elastic Agent
    ↓
Logstash
    ↓
Elasticsearch
    ↓
Kibana
```