const express=require("express");
const path=require("path");
const logger=require("morgan");
const cookieParser=require("cookie-parser");
const createError=require("http-errors");

const app=express();
const port=3000;
const indexRouter=require('./routes/index');

app.use(express.static(path.join(__dirname,'public')));
app.use('/',indexRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.get('/',(req,res)=>{
	res.send("hello World");
});

app.use((req,res,next)=>{
	next(new createError.NotFound());
});

app.use((err,req,res,next)=>{
	res.status(err.status || 500);
	res.render("error.html",{err});
});

app.listen(port,()=>{
	console.log(`webapp listening on port ${port}`);
});
