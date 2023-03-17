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
      // post.addEventListener("click", function () {
      //   console.log("click");
      //   // fetch not working properly
      //   fetch(
      //     `https://jsonplaceholder.typicode.com/posts/${data[i].id}/comments`
      //   )
      //     .then((response) => response.json())
      //     .then((comments) => {
      //       let commentContainer = document.createElement("div");
      //       commentContainer.id = "comment-container";

      //       for (let i = 0; i < comments.length; i++) {
      //         let comment = document.createElement("div");
      //         comment.id = "comment";
      //         comment.innerHTML = `
      //               <h1>${comments[i].name}</h1>
      //               <h2>${comments[i].email}</h2>
      //               <p>${comments[i].body}</p>
      //             `;

      //         commentContainer.append(comment);
      //         post.append(commentContainer);
      //       }
      //     });
      // });

      // post.addEventListener("dblclick", function () {
      //   console.log("dblclick");
      //   let commentContainer = document.querySelector("#comment-container");
      //   // let comment = document.getElementById("#comment");
      //   // removes post not just comments.
      //   post.remove(commentContainer);
      // });

      function singleClick() {
        fetch(
          `https://jsonplaceholder.typicode.com/posts/${data[i].id}/comments`
        )
          .then((response) => response.json())
          .then((comments) => {
            let commentContainer = document.createElement("div");
            commentContainer.id = "comment-container";

            for (let i = 0; i < comments.length; i++) {
              let comment = document.createElement("div");
              comment.id = "comment";
              comment.innerHTML = `
                    <h1>${comments[i].name}</h1>
                    <h2>${comments[i].email}</h2>
                    <p>${comments[i].body}</p>
                  `;

              commentContainer.append(comment);
              post.append(commentContainer);
            }
          });
      }

      function doubleClick() {
        let commentContainer = document.querySelector("#comment-container");
        // let comment = document.getElementById("#comment");
        // removes post not just comments.
        commentContainer.remove();
      }
      document.querySelector(".post-container").append(post);
    }
  });
