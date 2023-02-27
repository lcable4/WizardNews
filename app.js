const express = require("express");
const app = express();
const morgan = require('morgan')
const postBank = require('./postBank')
const timeAgo = require('node-time-ago');
const postDetails = require("./views/postDetails");


app.use(morgan('dev'));
app.use(express.static('public'))


app.get("/", (req, res) => {
  const posts = postBank.list();
 
  res.send(postLists(posts))
})

app.get("/posts/:id",(req,res)=>{
  const posts = postBank.find(req.params.id);
 
    res.send(postDetails(posts))
  }
  

})


const {PORT = 1337} = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
