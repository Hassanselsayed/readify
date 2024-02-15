import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
let books = [];
let page = 1;
const getBooks = function (id) {
  // console.log(page);
  const url = id ? `https://gutendex.com/books?ids=${id}` : `https://gutendex.com/books?page=${page}`;
  return axios.get(url);
};

app.use(express.static("public"));

app.get("/khara", (req, res) => {
  page = page + 1;
  getBooks()
    .then(response => {
      res.render("index.ejs", {
        books: [...books, ...response.data.results],
      });
    })
    .catch(function (error) {
      // handle error
      console.error(error);
    });
});

// const test = document.querySelector(".load-more");
// console.log(test);

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

app.get("/", (req, res) => {
  getBooks()
    .then(response => {
      books = response.data.results;
      res.render("index.ejs", {
        books: books,
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
