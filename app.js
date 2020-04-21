const express = require("express");

var app = express();
var db = require("./models/index");

var bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//create db
app.get("/createdb", (req, res) => {
	let sql = "CREATE DATABASE dhatriDB";
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("database created...");
	});
});

//create table
app.get("/createtable", (req, res) => {
	let sql = `CREATE TABLE medical(
		id int AUTO_INCREMENT, 
		state VARCHAR(255), 
		female int, 
		male int, 
		total int, 
		PRIMARY KEY (id))
	`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("table created...");
	});
});

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/show", (req, res) => {
	let sql = `SELECT * FROM medical`;
	db.query(sql, (err, results) => {
		if (err) {
			throw err;
		}
		res.render("show", { results: results });
	});
});

app.get("/createrecord", (req, res) => {
	res.render("createrecord");
});

app.post("/createrecord", (req, res) => {
	let post = {
		state: req.body.state,
		female: parseInt(req.body.female),
		male: parseInt(req.body.male),
		total: parseInt(req.body.female) + parseInt(req.body.male),
	};
	let sql = "INSERT INTO medical SET ?";
	db.query(sql, post, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/show");
		}
	});
});

app.get("/query", (req, res) => {
	res.render("query", { result: [] });
});

app.post("/query", (req, res) => {
	let sql = `SELECT * FROM medical WHERE state = '${req.body.query}'`;
	db.query(sql, (err, result) => {
		if (err) {
			throw err;
		} else {
			res.render("query", { result: result });
		}
	});
});

app.listen(3000, (req, res) => {
	console.log("Server started");
});
