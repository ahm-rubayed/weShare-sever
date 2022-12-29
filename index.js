const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5nirzm7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const postsCollection = client.db('weShare').collection('posts')

        app.get('/posts', async (req, res) => {
            let query = {};
            const cursor = postsCollection.find(query);
            const posts = await cursor.toArray();
            res.send(posts);
        });

        app.post('/posts', async(req, res) => {
            const posts = req.body;
            const result = await postsCollection.insertOne(posts)
            res.send(result)
        })
    }
    finally{

    }
}

run().catch(error => console.error(error))

app.get("/", (req, res) => {
    res.send("WeShare server is running")
})

app.listen(port, () => {
    console.log(`WeShare server is running on port ${port}`)
})