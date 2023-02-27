const postDetails = (post, timeAgo) => {
  try {
    if (!post.id) {
      // If the post wasn't found, just throw an error
      throw new Error("Not Found");
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
                              ${post.upvotes} upvotes | ${timeAgo(
      post.date.getTime()
    )}
                            </small>
                            ${post.content}
                          </div>
                      </div>
                    </body>
                  </html>`;
    return html;
  } catch (error) {
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
            </html>`;
    return html;
  }
};

module.exports = { postDetails: postDetails };
