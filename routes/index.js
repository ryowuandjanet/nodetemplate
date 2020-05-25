const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
	res.render('index.html',{
		message:"這是Node.js的基本樣版",
		appname:"我是吳小毛"
	});
})

module.exports=router;