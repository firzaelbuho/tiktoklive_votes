const { WebcastPushConnection } = require('tiktok-live-connector');

let candidateNums = 3

votes = []

for (let i = 0; i < candidateNums; i++) {
    votes.push(0);
}

voters = []

gifters = []

// Username of someone who is currently live
let tiktokUsername = "dukuntech";

// Create a new wrapper object and pass the username
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

// Connect to the chat (await can be used as well)
tiktokLiveConnection.connect().then(state => {
    console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
    console.error('Failed to connect', err);
})

// Define the events that you want to handle
// In this case we listen to chat messages (comments)

// tiktokLiveConnection.on('chat', data => {
//     console.log(`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
// })

tiktokLiveConnection.on('chat', data => {
    console.log(`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
    if(voters.every((str) => !str.includes(data.uniqueId))){
        for (let i = 0; i < candidateNums; i++) {
            if(parseInt(data.comment) === i+1){
                votes[i] += 1
            }
        }
        voters.push(data.uniqueId)
    }
  
   
    console.table(votes)
})

// And here we receive gifts sent to the streamer
tiktokLiveConnection.on('gift', data => {
    console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);

    if(gifters.every((str) => !str.includes(data.uniqueId))){
        gifters.push(data.uniqueId)
    }
})

// ...and more events described in the documentation below

// API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const corsOptions = {
    origin: "http://127.0.0.1:5173",
  };

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.get('/votes', (req, res) => {
  res.json(votes);
});
app.get('/voters', (req, res) => {
  res.json(voters);
});
app.get('/gifters', (req, res) => {
  res.json(gifters);
});

app.get('/combo', (req, res) => {
  res.json({
    votes     : votes,
    voters    : voters,
    gifters   : gifters

  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});