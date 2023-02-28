const html = require("html-template-tag");

const postList = (posts, timeAgo) => {
  const htmlText = html`<!DOCTYPE html>
    <html>
      <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div class="news-list">
          <header><img src="/logo.png" />Wizard News</header>
          ${posts.map(
            (post) => html`<div class="news-item">
              <p>
                <span class="news-position">${post.id}. ▲</span>
                <a href="/posts/${post.id}">${post.title}</a>
                <small>(by ${post.name})</small>
              </p>
              <small class="news-info">
                ${post.upvotes} upvotes | ${timeAgo(post.date.getTime())}
              </small>
            </div>`
          )}
        </div>
      </body>
    </html>`;

  return htmlText;
};

module.exports = postList;
