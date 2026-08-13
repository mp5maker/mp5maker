## PWA / Browser Technologies

1. PWA
  - Progressive Web APP
  - It's a web application that uses browser capabilities to provide a more app-like experience
  - Capabilities Include
    - installability
    - offline support
    - caching
    - backgorund processing
    - push notificiation
    - app-like UI
    - network resilience

```
Normal Web App
      ↓
Browser

PWA
      ↓
Browser
 ┌────┼──────────────┐
 ↓    ↓              ↓
Manifest  Service Worker  Storage
```

2. Web App Manifest

- It is a JSON file that describes how the application show behave when installed

```
manifest.json
```

```
{
  "name": "HealthOS",
  "short_name": "HealthOS",
  "start_url": "/",
  "display": "standalone",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

- important properties

```
name
short_name
start_url
display
icons
theme_color
background_color
```

- display

```
browser
standalone
fullscreen
minimal-ui
```

- standalone
  - It makes the application feel more like an installed application rather than a normal browser tab


3. Service Workers

- It runs separately from the main browser page and can intercept networks request

```
Browser Page
     ↓
Service Worker
     ↓
Cache / Network
```

- This enables
  - offline funtionality
  - caching
  - beckground tasks
  - push notifications
  - request interception

- Service workers are event driven and don't direclty manipulate the DOM

4. Browser Caching

```
Browser
   │
   ├── HTTP Cache
   │
   ├── Service Worker Cache
   │
   └── IndexedDB
```


- HTTP Cache
  - Controlled HTTP caching headers
```
Cache-Control
ETag
Last-Modified
Expires
```

```
Cache-Control: public, max-age=31536000, immutable
```

5. SVG Rendering

- Scalable Vector Graphics
  - It can scale without getting pixalated
  - useful for
    - icons
    - logos
    - diagrams
    - charts
    - maps
    - interactive graphics

6. Webpack
  - It is a module bundler
    - It takes application modules/assets and builds optimized output
    - can handle
      - javascript, typescript, css, images, fonts, code splitting, asset optimization
```
React/TypeScript
      ↓
Webpack
      ↓
Build
      ↓
JavaScript/CSS/assets
      ↓
Browser
```

7. Webpack Entry and Output

```javascript
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js"
  }
};
```

- the entry point is where webpack start building the dependency graph

```
index.js
  ├── App.js
  ├── User.js
  └── API.js
```

- Webpack follows those dependenncies and produces bundles

8. Code Splitting

- Instead of shipping one huge javascript bundle
- It can be split into
```
main.js
dashboard.js
settings.js
admin.js
```

- Then load pieces when required
- This can improve initial load performance

9. Asset Hashing

- This is extremely important for caching
- Browser may keep using an old cached version


10. Service Worker Update Detection

- PWAs have another layer of update detection
- The browser periodically checks whether the registered Service Worker file has changes

```
Existing Service Worker
       ↓
Browser checks sw.js
       ↓
File changed?
       ↓
Install new worker
       ↓
Activate
```

```
CACHE_v1
CACHE_v2
``


```
                  Deployment
                      ↓
              New hashed assets
                      ↓
             New Service Worker
                      ↓
              Version metadata
                      ↓
             Client checks version
                      ↓
               Update available
                 /          \
                /            \
        Automatic reload    User notification
```