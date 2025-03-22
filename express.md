# Deep Dive: Understanding Express.js

## 1. What is Express?

- **Express.js** is a lightweight framework for building web applications and APIs in Node.js.
- It simplifies how we create HTTP servers, parse requests, handle routes, and send responses.

### Why It Exists

- Node’s native `http` module is powerful but very low-level.
- Express adds **abstractions and helpers** to handle common tasks more easily and cleanly.

## 2. How Does Express Actually Work?

### When you write:

```js
const express = require('express');
const app = express();
```

- `express()` returns a **function** with a built-in **middleware system**.
- This function can be passed directly to `http.createServer(app)`.

### Internally

- Express **wraps Node’s HTTP server**, handling every incoming request.
- Your app becomes the main request handler function.

## 3. app.listen(port) — What Does It Do?

```js
app.listen(4000);
```

### What’s Happening Under the Hood:

- Express internally calls:

  ```js
  http.createServer(app).listen(4000)
  ```

- `http.createServer()`:
  - Tells Node to **bind to port 4000** using a **TCP socket**.
  - This means: “Hey OS, anything that comes to port 4000, give it to me.”

### Port Binding (OS-level):

- The OS maintains a **Port → Process Map**.
  - When a request comes to port 4000, the OS checks:
    - Is a process listening there?
    - If yes → forwards the TCP data to that process (Node/Express).

---

## 🌐 4. What Happens When a Request Comes In?

### Step-by-Step

1. **Request reaches the OS** (via IP + Port)
   - Example: `http://localhost:4000/posts`
2. **OS finds the process bound to port 4000**
   - Sends data (via TCP socket) to Node.js
3. **Node’s `http.Server` emits a 'request' event**
   - Express (as the handler) takes control
4. **Express starts processing through middleware**


## 5. What is Middleware in Express?

- Middleware = **functions** that run one after another to process a request.

  ```js
  app.use((req, res, next) => {
    console.log('Request received');
    next();
  });
  ```

### Purpose of Middleware:

- Modify `req` or `res`
- End the response cycle (like sending back a result)
- Or pass control to the next middleware using `next()`

### Types of Middleware:

- **Built-in**: `express.json()`, `express.static()`
- **Third-party**: `cors`, `helmet`, `morgan`
- **Custom**: Anything you write yourself

### Behind the Scenes:

- Express stores middleware functions in an array.
- For every request, Express runs them one by one.
- Each function decides: "Do I handle this?" or "Pass to the next?"

---

## 📩 6. What are `req` and `res`?

These are the **core objects** used in any Express handler or middleware:

### `req` (Request Object)

- Based on Node’s `http.IncomingMessage`
- Holds information about the incoming request:
  - `req.method` → GET, POST, etc.
  - `req.url` → The route/path
  - `req.headers` → Info like content type, auth, etc.
  - `req.body` → Parsed body (if `express.json()` is used)

### `res` (Response Object)

- Based on Node’s `http.ServerResponse`
- Controls what’s sent back to the client:
  - `res.send()` → Sends string/HTML/body
  - `res.json()` → Sends JSON
  - `res.status()` → Sets HTTP status

### Why We Need Them

- `req` gives you full control over what the client is asking.
- `res` gives you full control over what you send back.

---

## 7. express.json() – How Body Parsing Works

```js
app.use(express.json());
```

- Tells Express to look for `Content-Type: application/json`
- Reads the raw request body stream and parses it into a JavaScript object.
- Attaches the result to `req.body`

### How It Works

- It’s middleware.
- Uses internal logic (formerly `body-parser`) to read the incoming chunks.
- If you don’t use this, `req.body` will be undefined for JSON payloads.

---

## 8. What Makes Express Different from Native Node HTTP?

| Feature             | Node.js (http)                     | Express.js                          |
|---------------------|------------------------------------|-------------------------------------|
| Server creation     | `http.createServer()`              | `app.listen()`                      |
| Route handling      | Manually using `if/else`           | `app.get()`, `app.post()`, etc.     |
| Body parsing        | Must read stream manually          | `express.json()`                    |
| Middleware          | Not supported                      | Built-in chaining system            |
| JSON responses      | Manually set headers and stringify | `res.json()`                        |
| Code structure      | All logic in one place             | Modular via routers and middleware  |

---

## Summary — What Express Brings

| Feature                  | What It Does                                                    | Why It's Needed                                               |
|--------------------------|------------------------------------------------------------------|---------------------------------------------------------------|
| `express()`              | Creates the app and middleware stack                            | You can't register routes/middleware without it              |
| `app.listen()`           | Starts server, binds port                                       | Needed for OS to deliver requests to your app                |
| Middleware               | Modular processing of requests                                  | Reduces code duplication, adds flexibility                   |
| `req` and `res`          | Wrap low-level request/response into helper-rich objects        | Makes working with headers, JSON, and status codes easier    |
| `express.json()`         | Parses JSON from request body                                   | Without it, `req.body` is undefined for POST/PUT requests    |
| Routing                  | Matches path + method to handler                                | Makes code modular, testable, and organized                  |
