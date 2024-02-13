import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
let books = [];

app.use(express.static("public"));

const getBooks = function (id) {
  const url = id ? `https://gutendex.com/books?ids=${id}` : `https://gutendex.com/books?page=1`;
  return axios.get(url);
};

app.get("/", (req, res) => {
  getBooks()
    .then(response => {
      res.render("index.ejs", {
        books: response.data.results,
      });
    })
    .catch(function (error) {
      // handle error
      console.error(error);
    });
});

app.get("/books/:bookId", (req, res) => {
  getBooks(req.params.bookId)
    .then(response => {
      if (response.data.count !== 1) {
        res.redirect(301, "/404");
        return;
      }
      const bookUrl = response.data.results[0].formats["text/html"];
      res.render("index.ejs", {
        bookUrl: bookUrl,
      });
    })
    .catch(function (error) {
      // handle error
      console.error(error);
    });
});

app.get("*", function (req, res) {
  res.render("index.ejs", {
    error: true,
  });
});

// app.get("*", function (req, res) {
//   res.redirect(301, "/404");
// });

app.listen(port);
