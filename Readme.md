# Express.js Basics with Routing

#### Section A: Practical Coding Tasks

**1. Creating an Express.js Route for Home Page**

- Write a route in Express.js that serves a `home.html` file. Create a new HTML file called `home.html` that contains an `<h1>` tag with the message "Welcome to ExpressJs Tutorial". Ensure that the home page is served to the client when the `/home` route is accessed.

**2. Serving JSON Data from a User File**

- Modify the route `/profile` to return all details from a `user.json` file in JSON format. The file should be sent as a response when a client makes a request to the `/profile` route.

**3. Implementing User Authentication**

- Modify the `/login` route to accept `username` and `password` as JSON body parameters.
- Read user data from `user.json` file.
- If the `username` and `password` are valid, return the following response:

    ```json
    {
        "status": true,
        "message": "User Is valid"
    }
    ```

- If the `username` is invalid, return:

    ```json
    {
        "status": false,
        "message": "User Name is invalid"
    }
    ```

- If the `password` is invalid, return:

    ```json
    {
        "status": false,
        "message": "Password is invalid"
    }
    ```

**4. Creating a Logout Route**

- Modify the `/logout` route to accept a `username` as a parameter.
- Return a message in HTML format that displays `<b>{username} successfully logged out.<b>` when a user accesses the `/logout` route.

**5. Add error handling middleware to handle below error**

- Return 500 page with message "Server Error"
```
app.use((err,req,res,next) => {
  res.send('This is error router');
});
```
---

#### Section B: Short Answer Questions

**6. Explain the Purpose of `express.Router()` in the Code Above.**

- Why is `express.Router()` used in Express.js applications, and how does it benefit the code structure?

**Answer:**
`express.Router()` is used to create modular, mountable route handlers in Express.js applications. It provides several key benefits:

1. **Modularity**: Allows you to organize routes into separate files/modules, making the code more maintainable and organized.

2. **Reusability**: Router instances can be reused across different parts of the application or even in different applications.

3. **Separation of Concerns**: Different route groups (like user routes, admin routes, API routes) can be separated into different files.

4. **Middleware Isolation**: Each router can have its own middleware stack, allowing for route-specific middleware.

5. **Cleaner Code Structure**: Instead of having all routes in one main file, you can split them logically across multiple files.

In our code, `express.Router()` is used in `routes/users.js` to create a router instance that handles all user-related routes (`/profile`, `/login`, `/logout`), which is then mounted in the main application using `app.use('/api/v1/user', userRouter)`.

**7. Error Handling in Express.js**

- How would you implement error handling in the Express routes to ensure that any issues (such as file not found or server errors) are appropriately handled? Provide an example.

**Answer:**
Error handling in Express.js can be implemented using several approaches:

1. **Try-Catch Blocks**: Wrap async operations in try-catch blocks to handle synchronous errors.

2. **Error Middleware**: Create error handling middleware that catches and processes errors.

3. **Promise Rejection Handling**: Use `.catch()` for promise-based operations.

**Example Implementation:**

```javascript
// Error handling middleware (must be last)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});

// Route-level error handling
app.get('/profile', (req, res) => {
    try {
        const userData = JSON.parse(fs.readFileSync('user.json', 'utf8'));
        res.json(userData);
    } catch (error) {
        console.error('Error reading user data:', error);
        res.status(500).json({ error: 'Failed to read user data' });
    }
});

// Async error handling
app.get('/async-route', async (req, res, next) => {
    try {
        const data = await someAsyncOperation();
        res.json(data);
    } catch (error) {
        next(error); // Pass error to error middleware
    }
});
```

**Key Points:**
- Always log errors for debugging
- Return appropriate HTTP status codes
- Provide meaningful error messages
- Use error middleware as the final catch-all

---

#### Section D: Postman Testing Results

**Testing completed successfully! All endpoints are working as expected.**

**Test Results:**
1. ✅ **Home Page Route** (`GET /home`) - Returns HTML page with "Welcome to ExpressJs Tutorial"
2. ✅ **Profile Route** (`GET /api/v1/user/profile`) - Returns user data from user.json
3. ✅ **Login Route** (`POST /api/v1/user/login`) - Validates credentials correctly
4. ✅ **Logout Route** (`GET /api/v1/user/logout`) - Returns HTML logout message

**Postman Screenshots:**

**Test 1: Home Page Route**
![Home Page Test](Screenshot%202025-10-06%20215852.png)

**Test 2: Profile Route**
![Profile Test](Screenshot%202025-10-06%20220121.png)

**Test 3: Login Route - Valid Credentials**
![Valid Login Test](Screenshot%202025-10-06%20220435.png)

**Test 4: Login Route - Invalid Username**
![Invalid Username Test](Screenshot%202025-10-06%20220611.png)

**Test 5: Login Route - Invalid Password**
![Invalid Password Test](Screenshot%202025-10-06%20220804.png)

**Test 6: Logout Route**
![Logout Test](Screenshot%202025-10-06%20220918.png)

---

#### Section C: Bonus

**7. Dynamic Port Binding in Express.js**

- Explain how the `app.listen(process.env.port || 8081)` line works and why it's useful in production environments.

---

