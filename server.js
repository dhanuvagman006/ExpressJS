const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId, ServerApiVersion
 } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const uri=""

 const path = require('path');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//Till here
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});
let users;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("Dhanush");
    users = db.collection("Users");
    console.log(" MongoDB Connected Successfully");
  } catch (err) {
    console.error(" DB Connection Error:", err);
  }
}
connectDB();



app.post('/users', async (req, res) => {
  try {
    console.log(" Received data:", req.body); // Debugging line
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Empty request body" });
    }
    const result = await users.insertOne(req.body);
    res.status(201).json({ message: "User added", result });
  } catch (err) {
    console.error(" Insert Error:", err);
    res.status(500).json({ error: err.message });
  }
});


app.get('/users', async (req, res) => {
  try {
    const data = await users.find().toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const data = await users.findOne({ _id: new ObjectId(req.params.id) });
    if (!data) return res.status(404).json({ message: "User not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Update
app.put('/users/:id', async (req, res) => {
  try {
    const result = await users.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json({ message: "User updated", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete
app.delete('/users/:id', async (req, res) => {
  try {
    const result = await users.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ message: "User deleted", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//  Start server
app.listen(5000, () => console.log(" Server running on port http://localhost:5000"));