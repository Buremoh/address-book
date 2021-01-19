const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "address_book",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  const email = req.body.email;
  const address = req.body.address;
  const company = req.body.company;
  const title = req.body.title;

  db.query(
    "INSERT INTO contacts (name, number, email, address, company, title) VALUES (?,?,?,?,?,?)",
    [name, number, email, address, company, title],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/contacts", (req, res) => {
  db.query("SELECT * FROM contacts", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/contact/:id", (req, res) => {
  db.query(
    "SELECT * FROM contacts WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let response = JSON.parse(JSON.stringify(result));
      //  console.log(response[0]);
      //  res.send(response[0]);
      }
    }
  );
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const number = req.body.number;
  const email = req.body.email;
  const address = req.body.address;
  const company = req.body.company;
  const title = req.body.title;

  db.query(
    "UPDATE contacts SET title = ?, name = ?, number = ?, email = ?, address = ?, company = ? WHERE id = ?",
    [title, name, number, email, address, company, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM contacts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
