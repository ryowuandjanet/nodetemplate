const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
	res.render('index.html',{message:"Hello Express",appname:"webapp"});
})

module.exports=router;