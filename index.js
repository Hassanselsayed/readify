import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
let books = [];

app.use(express.static("public"));

app.get("/", async (req, res) => {
  await axios
    .get("https://gutendex.com/books?page=1")
    .then(response => {
      res.render("index.ejs", {
        books: response.data.results,
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/test", async (req, res) => {
  res.render("index.ejs", {
    book: true,
  });
});

app.listen(port);
