# Deep Dive: Express Routing

## What is Routing in Express?

Routing is the mechanism that maps an incoming HTTP request to a specific function in your backend.  
It matches based on two things:

- The HTTP method (GET, POST, PUT, DELETE, etc.)
- The URL path (like `/posts`, `/comments`, etc.)

For example:

```js
app.post('/posts', handler);
```

This tells Express:  
"If a POST request comes to `/posts`, call the `handler` function."

## Why Routing is Needed

Without Routing:

- You would manually check `req.url` and `req.method` in a big callback function.
- All your logic would live in one place, making it difficult to scale or maintain.
- Features like posts and comments would be mixed together.
- Adding a new route increases risk of breaking existing ones.
- No code modularity, testing becomes harder, and errors increase.

With Routing:

- Express handles path and method matching automatically.
- You can define routes cleanly and keep logic for each route separate.
- Helps organize large applications with feature-specific files.
- Express checks for matching method and path, and calls the correct handler.

## How Express Routing Works Internally

1. A request arrives at your Express app after OS-level port forwarding and TCP/IP handling.
2. Express begins scanning its internal list of routes and middleware.
3. Each route is registered as an object containing method, path, and handler.
4. Express compares the method (like POST) and the path (like `/posts`) of the incoming request.
5. If it finds a match, it calls the handler function associated with that route.

## Route Handlers Are Just Middleware

- Every route you define (like `app.get`, `app.post`) is internally stored like middleware.
- It contains a condition: "only run this if method and path match."
- That’s why you can chain other middleware (like auth checks or validation) before the final route handler.

## Types of Routing

Basic Routing:

```js
app.get('/posts', handler);
```

Dynamic Routing (Route Parameters):

```js
app.get('/posts/:id', handler);
```

A request to `/posts/123` would result in `req.params.id` being `"123"`.

Modular Routing (Routers):

```js
const postsRouter = express.Router();
postsRouter.get('/', handler);
app.use('/posts', postsRouter);
```

This separates logic for `/posts` into its own module.

## Behind the Scenes

When you write:

```js
app.post('/posts', handler);
```

Express internally stores this route like:

```json
{
  method: 'POST',
  path: '/posts',
  handler: function
}
```

On every request, Express:

- Compares the request’s method and path
- Finds the matching route object
- Executes the associated handler function

## Express Router – Extending Routing Logic

What is a Router:

- A Router is like a mini Express app that only handles routes for a specific feature (e.g., posts).
- It has its own middleware, route definitions, and handlers.

Why Use Routers:

- They let you separate logic by feature or domain (e.g., posts, comments).
- Your main app file stays clean.
- You can plug in or remove routers without affecting the whole app.

## What If Routing Didn’t Exist?

Without Routing:

- You would use `if/else` or `switch` statements for every route and method.
- Your code would be hard to read and scale.
- New features would require editing the central logic, risking unrelated bugs.

With Routing:

- Routes are registered declaratively and separately.
- Easy to test and debug.
- Code stays modular and manageable even as features grow.

## Summary: How Routing Works

Routing is the process of mapping incoming HTTP requests to specific functions.

Concepts and their roles:

- Routing: Matches method + path to a function
- Internal Structure: Express stores routes as an internal map or list
- Handler Function: The function that runs when a route matches
- Routers: Self-contained route managers for specific features
- Method Matching: Checks if incoming request method matches the defined one
- Path Matching: Compares request path with registered route path
- Route Parameters: Supports dynamic segments like `/posts/:id` accessible via `req.params`

