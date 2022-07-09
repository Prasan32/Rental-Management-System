require('dotenv').config()
const express=require('express')
const app=express()



const PORT=process.env.PORT
app.listen(PORT,(error,server)=>{
    if(error) throw error
    console.log(`Server is listening at PORT: ${PORT}`);
})