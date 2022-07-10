require('dotenv').config()
const express=require('express')
const app=express()
const bodyParser=require('body-parser')

//using body parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

//importing routes
const tenantRoutes=require('./src/api/v1/routes/tenantRoutes')

//importing database configuration
require('./src/config/database')

//using routes
app.use('/api/v1',tenantRoutes)

const PORT=process.env.PORT
app.listen(PORT,(error,server)=>{
    if(error) throw error
    console.log(`Server is listening at PORT: ${PORT}`);
})