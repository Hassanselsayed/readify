import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const getBooks = function (id) {
  const uri = `https://gutendex.com/books?ids=${id}`;
  return axios.get(uri);
};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    books: true,
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
