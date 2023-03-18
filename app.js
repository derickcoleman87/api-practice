let users = [];

async function init() {
  try {
    let userResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    let userData = await userResponse.json();
    users = userData;
    console.log(users);
  } catch (err) {}
  try {
    let postsResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    let postsData = await postsResponse.json();
    console.log(postsData);

    for (let i = 0; i < postsData.length; i++) {
      let userWhoCreatedPost = getUserData(postsData[i].userId);

      let post = document.createElement("div");
      post.className = "post";
      post.innerHTML = `
            <span class = "name">${userWhoCreatedPost.name}</span>
            <span>@${userWhoCreatedPost.username}</span>
            <p>${postsData[i].title}</p>
            <p>${postsData[i].body}</p>
        `;

      let clickCount = 0;

      post.addEventListener("click", function () {
        clickCount++;
        if (clickCount === 1) {
          singleClick();
        } else if (clickCount === 2) {
          doubleClick();
          clickCount = 0;
        }
      });
      document.querySelector(".post-container").append(post);

      function singleClick() {
        fetch(
          `https://jsonplaceholder.typicode.com/posts/${postsData[i].id}/comments`
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
    }

    function doubleClick() {
      let commentContainer = document.querySelector("#comment-container");
      let comment = document.getElementById("#comment");
      // removes post not just comments.
      commentContainer.remove();
    }
  } catch (err) {}

  function getUserData(id) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        return users[i];
      }
    }
    return null;
  }
}
init();

// fetch("https://jsonplaceholder.typicode.com/posts")
// .then((response) => response.json())
// .then((data) => {
//   for (let i = 0; i < data.length; i++) {
//     let post = document.createElement("div");
//     post.className = "post";
//     post.innerHTML = `
//       <h1>${data[i].id}</h1>
//       <h2>${data[i].title}</h2>
//       <p>${data[i].body}</p>
//     `;
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

// let clickCount = 0;

//   post.addEventListener("click", function () {
//     clickCount++;
//     if (clickCount === 1) {
//       singleClick();
//     } else if (clickCount === 2) {
//       doubleClick();
//       clickCount = 0;
//     }
//   });

//   function singleClick() {
//     fetch(`https://jsonplaceholder.typicode.com/posts/${data[i].id}/comments`)
//       .then((response) => response.json())
//       .then((comments) => {
//         let commentContainer = document.createElement("div");
//         commentContainer.id = "comment-container";

//         for (let i = 0; i < comments.length; i++) {
//           let comment = document.createElement("div");
//           comment.id = "comment";
//           comment.innerHTML = `
//                     <h1>${comments[i].name}</h1>
//                     <h2>${comments[i].email}</h2>
//                     <p>${comments[i].body}</p>
//                   `;

//           commentContainer.append(comment);
//           post.append(commentContainer);
//         }
//       });
//   }

//   function doubleClick() {
//     let commentContainer = document.querySelector("#comment-container");
//     // let comment = document.getElementById("#comment");
//     // removes post not just comments.
//     commentContainer.remove();
//   }
//   document.querySelector(".post-container").append(post);
// }
