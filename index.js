import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
let books = [];
const getBooks = function (page, id) {
  const url = id ? `https://gutendex.com/books?ids=${id}` : `https://gutendex.com/books?page=${page}`;
  return axios.get(url);
};

app.use(express.static("public"));

app.get("/", (req, res) => {
  getBooks(1)
    .then(response => {
      books = response.data.results;
      // books = [...books, ...response.data.results];
      res.render("index.ejs", {
        books: books,
        getBooks,
      });
    })
    .catch(function (error) {
      // handle error
      console.error(error);
    });
});

app.get("/books/:bookId", (req, res) => {
  getBooks(1, req.params.bookId)
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
