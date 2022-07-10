const con = require("../../../../config/database")
const Tenant = require('../../models/Tenant')
const tenantValidation = require('../../validations/tenantValidation')
const tenantQuery = require('../../helpers/tenantQuery')

/**
 * creates new tenant in the database
*/
exports.save = async (req, res) => {

    //validate incoming request body
    const { fullname, email, phone, address, identity_number, identification_document } = req.body
    const { status, message } = tenantValidation.validate(req.body)

    //check validation status
    if (status == false) {
        res.json({
            status: false,
            message: message
        })
    } else {

        try {

            const checkTenant = await Tenant.findAll({ where: { email } })

            //check if email is already registered
            if (checkTenant.length > 0) {

                res.status(400).json({
                    "message": "This email is already registered",
                    "status": false
                })

            } else {

                const tenant = {
                    fullname, email, phone, address, identity_number, identification_document
                }

                const t = await con.transaction();

                try {
                    //creating new tenant
                    const result = await Tenant.create(tenant, { transaction: t })
                    const prefix=fullname.split(' ')[0]+result.dataValues.tenant_id
                    const Query = tenantQuery.query(prefix)

                    await con.query(Query, {
                        raw: true,
                        transaction: t
                    })
                    await t.commit();


                    res.status(201).json({
                        "message": "New Tenant Created Successfully",
                        "status": true
                    })

                } catch (error) {
                    console.log(error);
                    if (error) {
                        await t.rollback()
                        res.status(500).json({
                            "message": "Something Went Wrong",
                            "status": false
                        })
                    }

                }
            }
        }
        catch (error) {
            res.status(500).json({
                "message": "Internal Server error",
                "status": false
            })

        }
    }
}

exports.view=async(req,res)=>{
   try {
    const tenants=await Tenant.findAll()
    if(tenants){
        res.status(200).json({
            "message":"Data found successfully",
            "object":tenants,
            "status":true
        })
    }
    
   } catch (error) {
    res.status(500).json({
        "message": "Internal Server error",
        "status": false 
    })
   }
}

