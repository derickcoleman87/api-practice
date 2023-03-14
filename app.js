fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      let post = document.createElement("div");
      post.className = "post";
      post.innerHTML = `
        <h1>${data[i].id}</h1>
        <h2>${data[i].title}</h2>
        <p>${data[i].body}</p>

    `;

      document.querySelector(".post-container").append(post);
    }

    let postTile = document.querySelectorAll(".post");
    // let baseUrl = "https://jsonplaceholder.typicode.com/posts/";
    // let commentUrl = "";
    let id = data.id;

    for (let i = 0; i < postTile.length; i++) {
      postTile[i].addEventListener("click", function () {
        console.log("click");
        fetch(`"https://jsonplaceholder.typicode.com/posts/${id}/comments"`)
          // fetch(baseUrl.concat(commentUrl))
          .then((response) => response.json())
          .then((comments) => {
            let commentContainer = document.createElement("div");
            commentContainer.className = ".comment-container";

            for (let i = 0; i < comments.length; i++) {
              let comment = document.createElement("div");
              comment.className = "comment";
              comment.innerHTML = `
                <h1>${comments[i].name}</h1>
                <h2>${comments[i].email}</h2>
                <p>${comments[i].body}</p>
              `;

              commentContainer.append(comment);
              document.querySelector(".post").append(commentContainer);
            }
          });
      });
    }
  });
