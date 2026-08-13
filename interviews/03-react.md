# React

1. Rendering & Component Lifecycle

- A react component generally goes through:
  - mount
  - update
  - unmount
- When a component renders, React calculates what the UI should like
  - React then compares the result with the previous result and commits only the necessary DOM changes
```tsx
function Counter() {
  const [count, setCount] = useState(0);

  console.log("render");

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```
- Calling setCount() causes re-render, but react doesn't necessarily recreate the DOM element

2. Props

- Data passed from parent -> child
  - Props are readonly from the component perspective
```tsx
function User({ name }) {
  return <h1>{name}</h1>;
}
```

3. State

- Data managed by the component
```tsx
const [count, setCount] = useState(0)
```
- Update state schedules a re-render
- Prop comes from outside, state is managed inside


4. Controlled vs Uncontrolled Component

- Controlled
  - React owns the value
  - Controlled components are usually easier when we need validation, conditional UI or synchronization with other state
```tsx
const [name, setName] = useState("");

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```
- Uncontrolled
  - DOM owns the value
```tsx
const inputRef = useRef();

<input ref={inputRef} />
inputRef.current.value
```

5. useState

- Used for component state

```tsx
const [count, setCount] = useState(0);
// ❌ user.name = "Photon";

// ✅
setUser({
  ...user,
  name: "Photon"
});
```

- Useful when the new state depends on the new state
- Multiple states are batched

```tsx
setCount(prev => prev + 1);
```


6. useEffect

- Used to synchronize a component with external systems
  - api requests
  - subscriptions
  - timers
  - browser APIs
  - Websocket
```tsx
useEffect(() => {
  fetchUsers();
  // runs when mounted
}, []);

useEffect(() => {
  // runs after every render
});

useEffect(() => {
  // runs when userId changes
}, [userId]);
```
- cleanup

```tsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => {
    clearInterval(id);
  };
}, []);
```

7. useMemo

- caches a calculated value
- without useMemo, the calculation runs every render

```tsx
const filteredUsers = useMemo(() => {
  return users.filter(user => user.active);
}, [users]);
```

8. useCallback

- Caches a function reference

```tsx
const handleClick = useCallback(() => {
  console.log("clicked");
}, []);
```

9. useRef

- Stores a mutable value that persists across renders without causing a re-render when changed
- DOM Reference
```tsx
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current?.focus();
```
- Persistent Value

```tsx
const renderCount = useRef(0);
renderCount.current++;
```

10. useContext

- Context allows data to be shaed without manually passing props through every component
- used in
  - themes
  - authentication state
  - locale
  - application level configuration

```tsx
const ThemeContext = createContext();

<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>
const theme = useContext(ThemeContext);
```

- Context is not a automatic replacement for redux
- Context value changes, consumers of that context can re-render
- For frequently changing or complex global state, dedicated state-management patterns may be more appropriate
  - zustand
  - redux
  - mobX

11. Reconciliation & Virtual DOM

- React maintains a representation of the UI and compares the new render with the previous one
- The process is called conciliation
- The Virtual DOM is the in-memory representation React uses as part of this process

```
State change
    ↓
Render
    ↓
New React tree
    ↓
Compare with previous tree
    ↓
Commit necessary changes
    ↓
DOM
```

12. Keys

- It help react identify elements between renders

```tsx
users.map(user => (
  <User key={user.id} user={user} />
))
```

- don't use index
  - Can cause problems when items are
    - inserted
    - removed
    - reordered
- use a stable unique identifier

13. Why Components Re-render

- State changes
- Parent Rerenders
- Props changes
- A consumed context value changes

14. useMemo vs useCallback vs React.memo

- useMemo: memoize a calculated value
- useCallback: memoize a function
- React.memo memoize a component render based on props

```tsx
const value = useMemo(() => expensiveCalculation(data), [data]);

const handleClick = useCallback(() => {
  save(data);
}, [data]);

const User = React.memo(UserComponent);
```

16. React 16 -> 19 Migration

```tsx
React upgrade
     ↓
Third-party libraries
     ↓
Deprecated / incompatible dependencies
     ↓
Replace library
     OR
Rebuild component
     ↓
Regression testing
     ↓
Verify existing functionality
```

17. Jest
- Unit Tests
- Mockings
- Assertions
- Test Suites

18. React Testing Library
- It focuses on testing the application from the user's perspective
- Jest provides the testing framework/assertions/mocking systems
- React Testing Library provides utilities for rendering and interacting with React components in a user-focused way

19. useImperativeHandle

- Lets a child comopnent control what is exposed through a ref to its parents

```tsx
const Input = forwardRef((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    }
  }));

  return <input ref={inputRef} />;
});

const ref = useRef(null);

<Input ref={ref} />

ref.current?.focus();
```

20. forwardRef

- It allows a parent to pass a ref through a component to a child DOM/native element
- Use cases
  - focus an input
  - scroll to an element
  - access DOM/native APIs
  - expose imperative methods

```tsx
const Input = forwardRef<HTMLInputElement>((props, ref) => {
  return <input ref={ref} />;
});
```

21. useLayoutEffect

- Similar to useEffect, but it runs synchronously after DOM mutations and before the browser paints
- Useful
  - Measure DOM dimensions
  - Position elements
  - Make visual adjustments before painting

```tsx
useLayoutEffect(() => {
  const height = elementRef.current?.getBoundingClientRect().height;

  // adjust something before the user sees the result
}, []);
```

22. useEffect vs useLayoutEffect

```
useEffect
    ↓
Browser can paint
    ↓
Effect runs
```

```
useLayoutEffect
    ↓
DOM updated
    ↓
Layout effect runs
    ↓
Browser paints
```

23. useState vs useReducer

- useState is ideal for simple, independent state.
- useReducer is useful when state has multiple related fields and transitions are more complex or action-driven.