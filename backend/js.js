const cors = require("cors");
const express = require("express");
const mysql = require("mysql");
const app = express();


app.use(cors())

const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"9411045Murad!",
    database:"sikkas"
})

app.get("/", (req,res)=>{
    const q= 'SELECT * FROM sikka';
    db.query(q,(err,data)=>{
     if(err) return res.json(err)
     return res.json(data)
    })
 })

app.get("/Bullion", (req,res)=>{
   const q= 'SELECT * FROM sikka LIMIT 8';
   db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
   })
})

app.get("/Exclusive", (req,res)=>{
    const q= 'SELECT * FROM sikka LIMIT 8 OFFSET 12';
    db.query(q,(err,data)=>{
     if(err) return res.json(err)
     return res.json(data)
    })
 })

 app.get("/Commemorative", (req,res)=>{
    const q= 'SELECT * FROM sikka LIMIT 20 OFFSET 10';
    db.query(q,(err,data)=>{
     if(err) return res.json(err)
     return res.json(data)
    })
 })

app.listen(3002, ()=>{
    console.log("Connected to backend!")
})