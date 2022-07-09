const express=require('express')
const router=express.Router()

const tenantController=require('../controllers/tenant/tenantController')

// tenant routes here
router.get('/saveTenant',tenantController.save)

module.exports=router