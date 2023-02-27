const express = require("express");
const app = express();
const morgan = require('morgan')
const postBank = require('./postBank')


app.use(morgan('dev'));
app.use(express.static('public'))


app.get("/", (req, res) => {
  const posts = postBank.list();
console.log('hello')
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            <a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>

        </div>`
      ).join('')}
    </div>
  </body>
</html>`
  res.send(html)
})

app.get("/posts/:id",(req,res)=>{

  index = req.params.id
  const post = postBank.find(index)
  try{
    if (!post.id) {
      // If the post wasn't found, just throw an error
      throw new Error('Not Found')
    }
    const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
          <div class='news-item'>
            <p>
              <span class="news-position">${post.id}. ▲</span>
              ${post.title}
              <small>(by ${post.name})</small>
            </p>
            <small class="news-info">
              ${post.upvotes} upvotes | ${post.date}
            </small>
            ${post.content}
          </div>
      </div>
    </body>
  </html>`
    
    
    
  
    res.send(html)
  }catch(error){
    res.status(404)
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>404: Page Not Found</p>
      </div>
    </body>
    </html>`
    res.send(html)
  }
  

})


const {PORT = 1337} = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
