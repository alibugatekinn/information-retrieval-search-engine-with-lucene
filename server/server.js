const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3001;
app.use(cors());

// MongoDB Atlas bağlantı URI'si
const uri = "mongodb+srv://alibugatekin:1581@usercluster.ahugrk4.mongodb.net/";
const client = new MongoClient(uri, { 
  serverApi: ServerApiVersion.v1 // MongoDB 5+ için gerekli
});

app.use(express.json());

// Full-Text Search sorgusu için GET endpoint
app.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.term;
        await client.connect();
        const database = client.db('bilgi-erisim');
        const collection = database.collection('films2');

        // Full-Text Search sorgusu yapın
        const pipeline = [
            {
                $search: {
                    index: 'default2', // Oluşturduğunuz Atlas Search indeksinin adı
                    compound: {
                        should: [
                            {
                                text: {
                                    query: searchTerm,
                                    path: 'movie_name', // 'movie_name' alanında arama yap
                                    score: { boost: { value: 2 } } // 'movie_name' alanına daha fazla ağırlık ver
                                }
                            },
                            {
                                text: {
                                    query: searchTerm,
                                    path: 'description', // 'description' alanında arama yap
                                    score: { boost: { value: 1 } } // 'description' alanına varsayılan ağırlık ver
                                }
                            }
                        ]
                    }
                }
            },
            {
                $project: {
                    movie_name: 1,
                    description: 1,
                    score: { $meta: "searchScore" } // Skor bilgisini almak için
                }
            }
        ];

        const cursor = collection.aggregate(pipeline);
        const results = await cursor.toArray();

        res.json(results);
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
