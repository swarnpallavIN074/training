// Create 3 Apis with following functionality
// Api 1 will be responsible for login purpose
// Api 2 will send Hello if user is logged in otherwise 403
// Api 3 will be responsible for logout purpose

const express = require("express");
const session = require("express-session");

const port = 3000;
const app = express();


app.use(
    session({
        secret: 'some secret',
        resave: true,
        saveUninitialized: true,
    })
);

const users = [
    {
        username: "swarnpallav",
        firstName: "Swarn Pallav",
        lastName: "Bhaskar",
        email: "spb@gmail.com",
    },
    {
        username: "suryansht",
        firstName: "Suryansh",
        lastName: "Tiwari",
        email: "st@gmail.com",
    },
];

// login
app.get("/login/:username", (req, res) => {
    const user = users.find((user) => user.username === req.params.username);

    if (user) {
        req.session.user = user;
        req.session.save();
        res.send(`${(user.username)}: logged in successfully`);
    } else {
        res.status(401).send("User Not Found"); // 401 is for client request has not been completed
    } console.log(req.session);
    console.log(req.sessionID);
});

// hello
app.get("/hello", (req, res) => {
    console.log(req.session);
    console.log(req.sessionID);

    if (req.session.user) {
        res.send(`Hello ${(req.session.user.firstName)}`);
    } else {
        res.status(403).send('No one has loggen in yet');
    }
});

// logout
app.get("/logout", (req, res) => {
    console.log(req.session);
    console.log(req.sessionID);
    req.session.destroy();
    res.send("user logged out successfully");
});

app.get('*', (req, res) => {
    res.send('Page Not Found');
})

app.listen(port, (req, res) => {
    console.log(`API listening on port http://localhost:${port}`);
});