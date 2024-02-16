import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const getBooks = function (id) {
  const uri = id ? `https://gutendex.com/books?ids=${id}` : `https://gutendex.com/books?page=1`;
  return axios.get(uri);
};

app.use(express.static("public"));

app.get("/", (req, res) => {
  getBooks()
    .then(response => {
      res.render("index.ejs", {
        books: response.data.results,
      });
    })
    .catch(function (error) {
      res.redirect(301, "/404");
    });
});

app.get("/license", (req, res) => {
  res.render("index.ejs", {
    license: true,
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
      res.redirect(301, "/404");
    });
});

app.get("*", function (req, res) {
  res.render("index.ejs", {
    error: true,
  });
});

app.listen(port);
