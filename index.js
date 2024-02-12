import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
let books = [];

app.use(express.static("public"));

app.get("/", async (req, res) => {
  // res.render("index.ejs");
  // await fetch("https://jsonplaceholder.typicode.com/posts")
  //   .then(response => response.json())
  //   .then(json => console.log(json));

  // .get("https://jsonplaceholder.typicode.com/posts/10/comments")
  await axios
    .get("https://gutendex.com/books?ids=11")
    .then(response => {
      // handle success
      // books = [...books, response.data];
      // console.log(response.data.results);
      res.render("index.ejs", {
        books: response.data.results,
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
      // console.log("finished");
    });
});

app.listen(port);
