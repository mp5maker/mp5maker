## Next.js

1. SSR - Server-Side Rendering

- SSR means the page's HTML is generated on the server when the request happens

```
Browser
   ↓
Request /products
   ↓
Next.js Server
   ↓
Fetch data
   ↓
Generate HTML
   ↓
Browser
```

```tsx
export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductList products={products} />;
}
```

- The server gets the data and renders the page before sending it to the browser
- Good For
  - Fequently changing data
  - Personalized pages
  - Pages that need fresh server data

2. Static Site Generation

- SSG means the page is generated ahead of time, rather than generating it for every request
- Good for contents that doesn't change frequently

```
Build
 ↓
Generate HTML
 ↓
Deploy
 ↓
User requests page
 ↓
Already-generated HTML
```

3. Incremental Static Generation

- ISR combines static generation with the ability to regenerate the page after a certain period
- The page/data can be revalidated periodically rather than requiring a completely fresh render on every request
- Good For
  - Product catalogs
  - News
  - Blogs
  - Documentation
  - Content that changes periodically

```
Generate page
      ↓
Serve cached page
      ↓
Revalidation period
      ↓
Generate newer version
      ↓
Serve updated page
```

```tsx
const data = await fetch("https://api.example.com/products", {
  next: {
    revalidate: 60,
  },
});
```

4. CSR - Client Side Rendering

- CSR means the browser does the primary data fetching/rendering after Javascript loads
- When SEO isn't a primary concern

```
Browser
   ↓
Download JS
   ↓
React runs
   ↓
Fetch API
   ↓
Render data
```

```tsx
"use client";

useEffect(() => {
  fetch("/api/products")
    .then(...)
}, []);
```

5. App Router

- Modern Next.js uses the app/ directory

```
app/
├── layout.tsx
├── page.tsx
├── loading.tsx
├── error.tsx
└── products/
    ├── page.tsx
    └── [id]/
        └── page.tsx

/                   → app/page.tsx
/products           → app/products/page.tsx
/products/123       → app/products/[id]/page.tsx
```

- page.tsx represents a route

```tsx
export default function ProductsPage() {
  return <h1>Products</h1>;
}

// /products
```

10. Layout.tsx

- A layout wraps route underneath it
- Layouts are useful for persistent UI
  - Navbar
  - Sidebar
  - Shared Navigation
  - Common Page Structure
- Nested layouts can also be done

```
app/
├── layout.tsx
├── page.tsx
└── dashboard/
    ├── layout.tsx
    ├── page.tsx
    └── settings/
        └── page.tsx
```

```
Root Layout
   ↓
Dashboard Layout
   ↓
Dashboard Page
```

11. Dynamic Routes

```
app/products/[id]/page.tsx

/products/123
/products/456
/products/789
```

```tsx
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>{id}</div>;
}
```

12. Catch-All Routes

```
app/docs/[...slug]/page.tsx
app/docs/[[...slug]]/page.tsx # can also match the base route


/docs/react
/docs/react/hooks
/docs/react/hooks/use-state
```

13. Loading UI

- loading.tsx provides a loading UI while a route segment is being rendered

```
app/
└── dashboard/
    ├── page.tsx
    └── loading.tsx
```

```tsx
export default function Loading() {
  return <Spinner />;
}
```

14. Error Handling

- We can create error.tsx for a route segment
- Error boundaries need to client component

```tsx
"use client";

export default function Error({ reset }: { reset: () => void }) {
  return <button onClick={() => reset()}>Try again</button>;
}
```

15. Not Found

- not-found.tsx for a resource that doesn't exist

```
app/products/[id]/not-found.tsx
```

```tsx
import { notFound } from "next/navigation";

if (!product) {
  notFound();
}
```

16. Client Components

- When the component needs client-side capabilities
- using
  - useEffect
  - useState
  - event handlers
  - browser APIs
  - interactive UI
- We don't need to make the entire page a client component just because one button is interactive

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

17. Data Fetching

```tsx
export default async function Page() {
  const response = await fetch("https://api.example.com/products");

  const products = await response.json();

  return <Products products={products} />;
}
```

18. Server-side Database Access

- Server Component can also interact with server-side resources

```
Server Component
      ↓
Database
      ↓
PostgreSQL
```

19. Caching

- Caching is one of the more confusing parts of modern Next.js.

You need to distinguish between:

- Request/data caching
- Full route/page caching
- Client Router Cache
- Revalidation

```tsx
fetch(url, {
  next: {
    revalidate: 60,
  },
});
```

20. Revalidation

```
Cached data
    ↓
Mutation happens
    ↓
Invalidate/revalidate
    ↓
Next request gets fresh data
```

```tsx
revalidatePath();
revalidateTag();
updateTag();
```

21. Server Actions

- Useful for mutations
  - create
  - update
  - delete
  - form submission

```
Client
 ↓
Server Action
 ↓
Database
```

```tsx
"use server";

export async function createProduct(formData: FormData) {
  // server-side operation
}
```

22. Route Handlers

```
app/api/products/route.ts
```

```tsx
export async function GET() {
  return Response.json({
    products: [],
  });
}
```

23. SEO (Search Engine Optimization)

- It is strong for SEO because content can be rendered on the server
- Benefits from
  - server-rendered content
  - proper metadata
  - semantic HTML
  - cralable URLs
  - Open Graph metadata
  - structured data where appropriate

```tsx
export const metadata = {
  title: "Products",
  description: "Browse our products",
};

export async function generateMetadata() {
  return {
    title: "Product",
  };
}
```

24. Routing APIs

- for client side
- <Link /> for normal navigation becuase next.js can optimize navigation/prefetching

```tsx
"use client";

import { useRouter } from "next/navigation";

const router = useRouter();

router.push("/dashboard");
router.replace("/login");
router.back();

import Link from "next/link";

<Link href="/products">Products</Link>;
```

25. Redirects

- on the server

```tsx
import { redirect } from "next/navigation";

if (!user) {
  redirect("/login");
}
```

- this is useful for authentication and server-side conditions

```
Dashboard
   ↓
Check session
   ↓
Not authenticated
   ↓
redirect("/login")
```

26. Middleware/Proxy

- The logic that should happen before a route is rendered
- Common use case
  - authentication
  - redirects
  - locale detection
  - request-based routing
  - headers/cookies

27. Streaming

- Next.js can stream parts of a page as they become ready instead of waiting for the entire page

```
Request
  ↓
Send shell/UI
  ↓
Send available content
  ↓
Slow data arrives
  ↓
Replace loading state
```

- works together with

```
loading.tsx
Suspense
Server Components
```

28. Suspense

- We can use React.Suspense around slow sections
- This enables more granular loading experience

```tsx
<Suspense fallback={<Loading />}>
  <SlowComponent />
</Suspense>
```

```
Page
├── Header       ← immediately available
├── Product list ← waiting
└── Footer       ← immediately available
```
