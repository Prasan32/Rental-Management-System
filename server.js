require('dotenv').config()
const express=require('express')
const app=express()

const tenantRoutes=require('./src/api/v1/routes/tenantRoutes')

app.use('/api/v1',tenantRoutes)

const PORT=process.env.PORT
app.listen(PORT,(error,server)=>{
    if(error) throw error
    console.log(`Server is listening at PORT: ${PORT}`);
})