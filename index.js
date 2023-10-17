const express = require('express')
require('dotenv').config()
var cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 3000




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASS}@cluster0.sm8afkk.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const database = client.db("coffeestore");
        const coffee = database.collection("coffee");
        const instgramphoto = database.collection("instgramphoto");
        // save
        app.post('/coffee', async (req, res) => {
            const data = req.body;
            const result = await coffee.insertOne(data);
            res.send(result)
        })
        // get all
        app.get('/coffee', async (req, res) => {
            const allData = coffee.find()
            const result = await allData.toArray()
            res.send(result)
        })

        // delet
        app.delete('/coffee/:id', async (req, res) => {
            const result = await coffee.deleteOne({ _id: new ObjectId(req.params.id) });
            res.send(result)
        })

        // single item
        app.get('/coffee/:id', async (req, res) => {
            const result = await coffee.findOne({ _id: new ObjectId(req.params.id) });
            res.send(result)
        })

        // upded
        app.put('/coffee/:id', async (req, res) => {
            const id = req.params.id;
            const { name, chef, supplier, taste, category, details, photo, price } = req.body
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: name,
                    chef: chef,
                    supplier: supplier,
                    taste: taste,
                    category: category,
                    details: details,
                    photo: photo,
                    price: price,
                },
            };
            const result = await coffee.updateOne(filter, updateDoc, options);
            res.send(result)
        })

        // instgram uplode
        app.post('/instgramphoto', async (req, res) => {
            const result = await instgramphoto.insertOne(req.body);
            res.send(result)
        })

        app.get('/instgramphoto', async (req, res) => {
            const allData = instgramphoto.find()
            const result = await allData.toArray()
            res.send(result)
        })

        app.delete('/instgramphoto/:id', async (req, res) => {
            const result = await instgramphoto.deleteOne({ _id: new ObjectId(req.params.id) });
            res.send(result)
        })
        // single 
        app.get('/instgramphoto/:id', async (req, res) => {
            const result = await instgramphoto.findOne({ _id: new ObjectId(req.params.id) });
            res.send(result)
        })

        app.put('/instgramphoto/:id', async (req, res) => {
            const id = req.params.id;
            const { name, chef, supplier, taste, category, details, photo, price } = req.body
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: name,
                    chef: chef,
                    supplier: supplier,
                    taste: taste,
                    category: category,
                    details: details,
                    photo: photo,
                    price: price,
                },
            };
            const result = await instgramphoto.updateOne(filter, updateDoc, options);
            res.send(result)
        })
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})