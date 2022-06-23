const express = require("express");
const expressapp = express();

const mysql = require('mysql2');

let dbparameter = {
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'moduleexam',
    port: 3306
}
const connection = mysql.createConnection(dbparameter);
console.log("db working ");
expressapp.use(express.static("abc"));

expressapp.get("/addbook", (req, resp) => {
    let bookid = req.query.bookid;
    let bookname = req.query.bname;
    let price = req.query.price;
    // let bookid = 222;
    // let bookname = "ads";
    // let price = 200;
    console.log("bookid " + bookid + "bname " + bookname + "price " + price);
    let addstatus = { status: false, message: "added " }
    connection.query("insert into book (bookid,bookname,price) values(? ,? ,? )", [bookid, bookname, price]),
        (err, res) => {
            if (err) {
                console.log("got error")

            }
            else {
                addstatus.status = true;
                addstatus.message = "successful"
                console.log(res.affectedRows);
            }
        }
    resp.send(addstatus);
});

expressapp.get("/find", (req, resp) => {
    let bookid = req.query.bookid;
    let findstatus = { status: false, message: "not found " }
    connection.query("select bookid,bookname,price from book where bookid=?", [bookid]),
        (err, rows) => {
            if (err) {
                console.log("got error")

            }
            else {
                if (rows.length > 0) {
                    console.log(rows[0].bookid + " " + rows[0].bookname + " " + rows[0].price);
                    findstatus.status = true;
                    findstatus.message = "found";
                }
                else {
                    console.log("not found")
                }
            }
        }
    resp.send(findstatus);
});

expressapp.listen(555, function () {
    console.log("Server running at port no. 555")
});
