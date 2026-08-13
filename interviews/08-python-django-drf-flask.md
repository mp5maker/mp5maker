## Python / Django / DRF/ Flask

1. Python Fundamentals

- Python is dynamically typed
- the variable itself doesn't have a fixed type

```python
name = "Photon"
name = 123
```

- It is also strongly typed, meaning it doesn't causually mix incompatible types
- It raises an error

```python
"10" + 5
```

2. Mutable vs Immutable Objects

- immutables
  - int
  - float
  - str
  - tuple
  - frozenset
- mutables
  - list
  - dict
  - set

- both variables refers to the same dictionary

```python
user = {
    "name": "Photon"
}

other = user
other["name"] = "John"
```

3. Shallow Copy vs Deep Copy

- Creates a shallow copy

```
copy.copy()
```

- Recursively copies nested objects

```
copy.deepcopy()
```

4. List Comprehension

- Concise ways to construct collections

```python
numbers = [1, 2, 3, 4]
squares = [x * x for x in numbers]
```

5. *args and **kwargs

```python
def example(*args, **kwargs):
    pass

example(1, 2, 3)
# args = (1, 2, 3)

example(name="Photon", age=30)
# kwargs = {
#     "name": "Photon",
#     "age": 30
# }
```

6. Decorators

- A decorator modifies or extends the behaviour of a function without changing the function's core implementation

```python
def logger(func):
    def wrapper(*args, **kwargs):
        print("Calling function")
        result = func(*args, **kwargs)
        print("Finished")
        return result

    return wrapper


@logger
def hello():
    print("Hello")
```

7. Generators

- A generator produces values lazily rather than creating the entire collection in memory
- Memory efficiency

```python
def numbers():
    for i in range(1000000):
        yield i
```

8. Generators Vs List

- List: creates collection immediately

```python
numbers = [x for x in range(1000000)]
```

- Produces values lazily

```python
numbers = (x for x in range(1000000))
```

9. Context Managers

- Context managers handle setup and cleanup automatically.
- useful for
  - files
  - database transactions
  - locks
  - resources that must be cleaned up

```python
with open("file.txt") as file:
    data = file.read()
```

- Create context

```python
class MyContext:
    def __enter__(self):
        print("Start")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("Cleanup")
```

```
enter resource
      ↓
use resource
      ↓
cleanup resource
```

10. Django Architecture

- Model
- Template
- View

```
Request
   ↓
URL routing
   ↓
View
   ↓
Business logic
   ↓
Model / ORM
   ↓
Database
   ↓
Response
```

- with serializer

```
Request
   ↓
URL
   ↓
APIView / ViewSet
   ↓
Serializer
   ↓
Service / ORM
   ↓
Database
   ↓
Serializer
   ↓
Response
```

11. Django Project vs App

- Project represents the overall application

```
myproject/
```

- An app represents a specific domain/feature

```
users/
orders/
products/
payments/
```

12. Django Request Cycle

```
HTTP Request
      ↓
WSGI / ASGI
      ↓
Middleware
      ↓
URL Resolver
      ↓
View
      ↓
ORM / Business Logic
      ↓
Response
      ↓
Middleware
      ↓
HTTP Response
```

13. WSGI vs ASGI

- WSGI
  - Traditional synchronous python web interface
- ASGI
  - Modern asynchronous interface supporting
    - async views
    - web sockets
    - long-lived connections
    - async applications

14. Django Models

- Model represent database structures
- Django ORM lets us work with python objects instead of writing SQL for every operation

```python
class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
```

```
Product table
├── id
├── name
└── price
```

15. Django ORM

```python
Product.objects.filter(price__gt=100)
```

```sql
SELECT *
FROM product
WHERE price > 100;
```

```python
Product.objects.create(...)
Product.objects.get(...)
Product.objects.filter(...)
Product.objects.update(...)
Product.objects.delete(...)
```

16. QuerySets

- A queryset repreents a database query
  - querysets are lazy
    - they don't necessarily immediately execute the database query
    - evaluation happens when we need the result
```python
products = Product.objects.filter(price__gt=100)

list(products)

# or
for product in products:
    pass
```

17. Select Related

- Use `select_related()` primarily for ForeignKey / OnetoOne relationships

```python
orders = Order.objects.select_related("user")
```

- It uses SQL Join
  - voids N+1 queries

18. Prefetch Related

- Use `prefetch_related()` primarily for
  - ManyToMany
  - reverse ForeignKey
  - relationships where separate queries + Pythonn-side joining are appropriate
```python
users = User.objects.prefetch_related("orders")
```

```
Query 1 → users
Query 2 → orders
       ↓
Django combines them
```

19. N+1 Query Problem

```python
orders = Order.objects.all()

for order in orders:
    print(order.user.name)
```

20. Database Indexing
- Frequently improve lookup performance
  - indexes
    - consume storage
    - slow some writes
    - need maintenance

21. Django Migrations
- Migrations track database scheme changes

```
Model change
    ↓
makemigrations
    ↓
Migration file
    ↓
migrate
    ↓
Database schema updated
```

```
python manage.py makemigrations
python manage.py migrate
```

22. Django Views

- traditional views
```python
def product_detail(request, id):
    pass
```
- class based views
```python
class ProductDetailView(View):
  pass
```

23. Django REST Framework
- serializers
- APIViews
- generic views
- viewsets
- routers
- authentication
- permissions
- throttling
- pagination

```
HTTP Request
      ↓
DRF View
      ↓
Serializer
      ↓
Service / ORM
      ↓
Database
```

24. DRF Serializers

- Convert python objects to JSON
- They also perform validation
- We can also validate individual fields

```python
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email"]
```

25. APIView

- More explicit control

```python
class ProductView(APIView):
    def get(self, request):
        pass
```

26. ViewSet

- Groups CRUD operations

```python
class ProductViewSet(ModelViewSet):
  pass
```

27. DRF Authentication

- Common Approaches
  - Session Authentication
  - Token Authentication
  - JWT
  - OAuth-based Authentication

28. DRF Permissions

- Permissions
  - is the authenticated user allowed to perform this operation

```python
permission_classes = [IsAuthenticated]
```

```
Admin
Owner
Staff
ReadOnly
```

29. DRF Pagination

- Drf provides pagination mechanism

30. API Design

```
A good Django API should have:
  - consistent URLs
  - appropriate HTTP methods
  - meaningful status codes
  - validation
  - pagination
  - authentication
  - authorization
  - predictable error responses
  - versioning where necessary

```

```
GET    /api/v1/products
GET    /api/v1/products/123
POST   /api/v1/products
PATCH  /api/v1/products/123
DELETE /api/v1/products/123
```

31. Middleware

- It can process request before they reach the view and responses after the view

```
Common uses:
  - authentication-related processing
  - logging
  - security
  - request IDs
  - timing
  - CORS
  - sessions
```

```
Request
 ↓
Middleware A
 ↓
Middleware B
 ↓
View
 ↓
Middleware B
 ↓
Middleware A
 ↓
Response
```

32. Django Signals

- It allows components to react to certain events

```
post_save
pre_save
post_delete
```

```python
@receiver(post_save, sender=User)
def create_profile(...):
    pass
```

```
save()
 ↓
hidden signal
 ↓
another operation
 ↓
another signal
```

33. Django Caching

- Caching Avoides repeatedly performing expensive operations
- Possible cache layers
```
Browser
 ↓
CDN
 ↓
Application cache
 ↓
Database
```
- Django Supports caching backends such as Redis

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
Store in Redis
 ↓
Return
```

34. Cache Invalidation

- Strategies Includes
  - ttl
  - explicit invalidation
  - cache versioning
  - write-through patterns
  - eent-based invalidation

35. Flask

- It is a much more lightweight python web framework than django

```python
from flask import Flask

app = Flask(__name__)

@app.route("/users")
def users():
    return {"users": []}
```

36. Flask-SQL Alchemy

- Flask doesn't include an ORM by default
- Flask-SQL Alchumy integrates SQLAlchemy with Flask

```
Flask
 ↓
Flask-SQLAlchemy
 ↓
SQLAlchemy
 ↓
Database
```

37. Django Major Version Migrations

```
Django version
Python version
DRF version
Database driver
Third-party packages
```

```
Old API
 ↓
Deprecated
 ↓
Warning
 ↓
Removed in major version
```

```
Django
 ↕
Python
 ↕
DRF
 ↕
django-filter
 ↕
Celery
 ↕
Database drivers
 ↕
Other packages
```