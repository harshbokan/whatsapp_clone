// importing
//   ---------------- add type: module in package.json  --------------------------------------->
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'    


// app config

const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1415102",
    key: "6f67abcc6ba650065302",
    secret: "faf5fb2df25b8cd55c41",
    cluster: "ap2",
    useTLS: true
  });


// middleware
app.use(express.json());    // to receive the json file coming from api

// app.use((req,res,next)=> {                                  // allowing the request to come from any ... and no errors will occur
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();                 // run the next operation / ahead ones
// });

app.use(cors());   // now we dont have to use the upper one


//Db config
const connection_url = 'mongodb+srv://harshbokan:24DOKxZKxUhdsgk5@cluster0.fanru7t.mongodb.net/?retryWrites=true&w=majority' ;
mongoose.connect(connection_url, {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});


const db = mongoose.connection

db.once('open' , ()=>{                 // once db is open/connected
    console.log("db is connected");   

    const msgCollection = db.collection("messagecontents");  // connecting our required schema/ collection
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change)=> {
        console.log(change);

        if(change.operationType == 'insert'){    // this is the data "change" our created in parameters above
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted' ,
            {
                name: messageDetails.name,
                message : messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            });
        } else{
            console.log("Error triggering pusher");
        }
    });
});

// ???
// api routes
app.get('/',(req,res)=>res.status(200).send('hello world'))

app.get('/messages/sync', (req,res)=>{
    Messages.find((err,data)=> {         // this will find all the results (all messages of all)
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req,res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(`we are in body !!!! ${data}`)
        }
    })
})

// listen
app.listen(port,()=> console.log(`listening to localhost: ${port}`));