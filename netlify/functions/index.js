import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import serverless from "serverless-http";

const app = express();
const router = express.Router();

const getBooks = function (id) {
  const uri = `https://gutendex.com/books?ids=${id}`;
  return axios.get(uri);
};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.render("index.ejs", {
    books: true,
  });
});

router.get("/license", (req, res) => {
  res.render("index.ejs", {
    license: true,
  });
});

router.get("/books/:bookId", (req, res) => {
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

router.get("*", function (req, res) {
  res.render("index.ejs", {
    error: true,
  });
});

app.use("/index/", router);

app.listen(3000, () => console.log("Local app listening on port 3000!"));

export const handler = serverless(app);
