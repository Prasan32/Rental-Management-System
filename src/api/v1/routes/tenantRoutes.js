const express=require('express')
const router=express.Router()

const tenantController=require('../controllers/tenant/tenantController')

// tenant routes here
router.post('/saveTenant',tenantController.save)

router.get('/viewTenant',tenantController.view)

router.put('/saveTenant/:id',tenantController.update)

module.exports=router