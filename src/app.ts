import express from 'express';

const app = express();
const port = 3000;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello, TypeScript Node Express!');
});

app.post("/" , (req, res) => {
    const {name , email} = req.body;
    console.log(name, email);
    res.send("POST request to the homepage");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});