## Redux

1. Redux Fundamentals

- Redux provides predictable centralized state management for application state that needs to be shared across multiple parts of the application.

```
Component
   ↓ dispatch(action)
Action
   ↓
Middleware
   ↓
Reducer
   ↓
Store
   ↓
Component re-renders
```

- Store
- Actions
- Reducers
- Dispatch
- Selectors
- Immutable state updates
- Single Store Concept

```tsx
const increment = () => ({
  type: "counter/increment",
});

function reducer(state = { count: 0 }, action) {
  if (action.type === "counter/increment") {
    return { ...state, count: state.count + 1 };
  }

  return state;
}
```

2. Redux Middleware

- Middleware sits between dispatch() and the reducer

```tsx
dispatch(action)
      ↓
   middleware
      ↓
    reducer
      ↓
     store
```

- Async operations
- Logging
- Analytics
- Side Effects

```tsx
const middleware = (store) => (next) => (action) => {
  console.log(action);
  return next(action);
};
```

3. Redux Thunk

```tsx
dispatch({
  type: "USER_LOADING",
});

const fetchUser = () => async (dispatch) => {
  dispatch({ type: "USER_LOADING" });

  try {
    const response = await fetch("/api/user");

    dispatch({
      type: "USER_SUCCESS",
      payload: await response.json(),
    });
  } catch (error) {
    dispatch({
      type: "USER_ERROR",
      payload: error.message,
    });
  }
};
```

4. State Normalization

- Avoid duplicated data
- Easier updates
- Better consistency
- Easier lookup

```tsx
{
  users: {
    byId: {
      1: { id: 1, name: "Photon" }
    },
    allIds: [1]
  }
}
```

5. React Router

- Routes

```tsx
<Routes>
  <Route path="/users" element={<Users />} />
  <Route path="/users/:id" element={<User />} />
</Routes>;

const { id } = useParams();
navigate(`/users/${id}`);
```

- Nested routes
  - Useful when multiples pages share a common layout
  - Parent Layouts uses <Outlet />

```tsx
function DashboardLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

<Route path="/dashboard" element={<DashboardLayout />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>;
```

- Dynamic parameters
  - Used when part of the URL represents data

```tsx
<Route path="/users/:id" element={<User />} />
// /users/123
```

- useParams
  - Reads dynamic router parameter

```tsx
function User() {
  const { id } = useParams();

  return <div>User ID: {id}</div>;
}
```

- useNavigate
  - Programatically changes the URL
  - use case
    - after login
    - after form submission
    - redirecting after an action
    - conditional navigation

```tsx
const navigate = useNavigate();
navigate("/dashboard");

navigate(-1); // go backward
```

- Link
  - Used for navigation without manually manipulating the URL
  - It does client side navigation
    - SPA to transition without a full page reload

```tsx
<Link to="/dashboard">Dashboard</Link>
```

- Protected routes
  - Used when certain routes require authentication

```tsx
function ProtectedRoute({ children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>;
```

- Route layouts
  - A layout allows multiple routes to share UI.

```tsx
<Route element={<AppLayout />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/settings" element={<Settings />} />
</Route>;

function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
```

- Query parameters
  - path parameter -> identifies a resource
  - query parameter -> modifies, filters, sorts a request

```tsx
// /products?page=2&sort=price
const [searchParams, setSearchParams] = useSearchParams();

const page = searchParams.get("page");
const sort = searchParams.get("sort");

setSearchParams({
  page: "3",
  sort: "name",
});
```

- 404 routes
  - Catch unmatched routes with

```tsx
<Route path="*" element={<NotFound />} />

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/users" element={<Users />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

6. Scalable React Architecture

- Feature-based vs layer-based architecture
- Component boundaries
- Reusable components
- Custom hooks
- API/service separation
- State boundaries
- Avoiding giant components
- Dependency direction
- Shared vs feature-specific code

```tsx
src/
├── components/
├── features/
│   ├── users/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── store/
│   └── orders/
├── pages/
├── hooks/
├── services/
├── utils/
├── routes/
└── types/
```

7. Zustancd

```tsx
const useStore = create((set) => ({
  count: 0,

  increment: () =>
    set((state) => ({
      count: state.count + 1,
    })),
}));

const count = useStore((state) => state.count);
const increment = useStore((state) => state.increment);
```

- suzstand subscribe the component to the specific piece of state it needs, reducing unnecessary re-renders

```tsx
const count = useStore((state) => state.count);
```

- Store creation
- Selectors
- Actions
- set
- get
- Derived state
- Middleware
- Persistence
- DevTools
- Async actions
- Store composition
- Preventing unnecessary renders
