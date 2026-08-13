## React Native Expo

1. React Native & Expo

- It is the framework for building native mobile applications with React
- Expo is a platform/tooling layer build around React Native that makes development, native APIs, builds, updates and configuration easiers

```
Expo
  ↓
React Native
  ↓
iOS / Android
```

2. Expo Workflow

- Expo Go
  - A pre-build application for quickly testing expo projects
  - good for
    - basic development
    - rapid prototyping
    - expo-supported APIs
- Production Build
  - The actual application distributed through:
    - App Store
    - Google Play

3. Expo Application Service (EAS)

- It provides cloud services for Expo projects
- EAS Build -> builds Android/IOS application
- EAS Submit -> submit builds to store
- EAS Update -> delivers Javascript/assets updates over the air

4. Expo Configuration

- app.json or app.config.js or app.config.ts
- configuration can control
  - app names
  - icons
  - splash screen
  - permissions
  - URL schemes
  - native plugins
  - ios configurations
  - android configuration

```json
{
  "expo": {
    "name": "MyApp",
    "scheme": "myapp",
    "plugins": ["expo-notifications"]
  }
}
```

5. Expo Router

- It provides file based routing
- Similarly to next.js

```
app/
├── _layout.tsx
├── index.tsx
├── profile.tsx
└── products/
    ├── index.tsx
    └── [id].tsx

/                 → index.tsx
/profile          → profile.tsx
/products         → products/index.tsx
/products/123     → products/[id].tsx
```

6. Route Layouts

```
app/
├── _layout.tsx
└── products/
    ├── _layout.tsx
    ├── index.tsx
    └── [id].tsx
/products
/products/:id
```

7. Dynamic Routes

```
products/[id].tsx

/products/123
/products/456
/products/789
```

```tsx
const { id } = useLocalSearchParams();
```

8. Nested Routes

```
app/
├── _layout.tsx
├── index.tsx
└── dashboard/
    ├── _layout.tsx
    ├── index.tsx
    ├── profile.tsx
    └── settings.tsx

Root Navigator
└── Dashboard Navigator
    ├── Dashboard
    ├── Profile
    └── Settings
```

9. React Navigation

- Expo Router is built on React Navigation
- React Navigation
  → navigation library/API
- Expo Router
  → file-based routing system built on React Navigation

```tsx
<Stack.Navigator>
  <Stack.Screen name="Home" component={Home} />
</Stack.Navigator>;

navigation.navigate("Home");
```

10. Deep Linking

- It allows an external URL to open a specific screen
- use cases
  - push notifications
  - email links
  - qr codes
  - authentication redirects
  - links from website
- Deep linking with authentications
  - app opens -> checks authentications -> then redirects

```
myapp://products/123
/products/123
id = "123"
```

11. Universal Links & App Links

- There are two major platform concepts
  - IOS
    - Unversal links
      - https://example.com/products/123
      - can open the mobile application
  - Andoird
    - App Links
      - myapp://proucts/123
      - a custom scheme is easier to set up but doesn't provide the same web-domain technologies

12. React Native Rendering

```typescript
<View>
  <Text>Hello</Text>
</View>
```

```
React
 ↓
React Native
 ↓
Native UI
 ↓
iOS / Android
```

13. Javascript Thread

- It handles
  - react state
  - business logic
  - api processing
  - navigation logic
  - event handling
- Performance Optimization
  - React.memo
  - useMemo
  - useCallback
  - optimize based on bottleneck

14. FlatList

- For large list, avoid rendering everything at once

```typescript
<FlatList
  data={products}
  renderItem={({ item }) => (
    <Product item={item} />
  )}
  keyExtractor={(item) => String(item.id)}
/>
```

15. Low-End Device Optimization

```
App is slow
     ↓
Is JS thread blocked?
     ↓
Are too many components rendering?
     ↓
Is the list optimized?
     ↓
Are images too large?
     ↓
Is memory increasing?
```

16. Push notification

- notification can contain data, which connext push notifications + deep linking

```typescript
import * as Notifications from "expo-notifications";
```

```
Permission
   ↓
Push token
   ↓
Send token to backend
   ↓
Backend stores token
   ↓
Backend sends notification
   ↓
Device receives notification
   ↓
User taps notification
   ↓
Deep link
   ↓
Authentication check
   ↓
Destination screen
```

17. Permissions

- Many device APIs require permission.

```
Location
Camera
Notifications
Photos
Microphone

Request permission
      ↓
Granted?
   ↙     ↘
 Yes      No
  ↓        ↓
Use API   Handle denial
```

18. IOS vs Android

- Platform differences still remain
- differences
  - permissions
  - notifications
  - keyboard behaviour
  - status bars
  - navigation bars
  - background execution
  - gestures
  - file handling

```
import { Platform } from "react-native";

if (Platform.OS === "ios") {
  // iOS-specific behavior
}

Component.ios.tsx
Component.android.tsx
```

19. Expo Device APIs

```
Camera
Location
Notifications
File System
Secure Store
Device information
Image Picker
Haptics

Your JavaScript
      ↓
Expo API
      ↓
Native capability
      ↓
Device
```

20. Debugging

```
JavaScript
    ↓
Logic / state / API / navigation

Native/platform
    ↓
Permissions / device APIs / build issues

Performance
    ↓
Rendering / JS thread / memory / lists
```

21. Bridge, Fabric & Turbomodules

- Bridge (old architecture)

```
JavaScript
   ↓
Bridge
   ↓
Native
```

- Fabric
  - Modern React Native Architecture

- Turbomodules
  - Modern Architecture for native modules

22. Platform working or not (IOS/Android)

```
Android works
      ↓
iOS doesn't
      ↓
Check iOS notification permission
      ↓
Check APNs / Expo push configuration
      ↓
Check push token generation
      ↓
Check iOS capabilities/configuration
      ↓
Check physical-device testing
      ↓
Check notification payload/handling
      ↓
Only then → platform-specific code
```