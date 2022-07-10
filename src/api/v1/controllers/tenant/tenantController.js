const con = require("../../../../config/database")
const Tenant = require('../../models/Tenant')
const tenantValidation = require('../../validations/tenantValidation')
const tenantQuery = require('../../helpers/tenantQuery')


/**
 * 
 * @param {request body} req 
 * @param {response body} res
 * creates new tenant in the database 
 */
exports.save = async (req, res) => {

    //validate incoming request body
    const { fullname, email, phone, address, identity_number, identification_document, status } = req.body
    const { STATUS, MESSAGE } = tenantValidation.validate(req.body)

    //check validation status
    if (STATUS == false) {
        res.json({
            status: false,
            message: MESSAGE
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
                    fullname,
                    email,
                    phone,
                    address,
                    identity_number,
                    identification_document,
                    status
                }

                const t = await con.transaction();

                try {
                    //creating new tenant
                    const result = await Tenant.create(tenant, { transaction: t })
                    const prefix = fullname.split(' ')[0] + result.dataValues.tenant_id
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


/**
 * @param {incoming request object} req 
 * @param {response object} res 
 * This controller gives the list of registered tenant
 */
exports.view = async (req, res) => {
    try {
        const tenants = await Tenant.findAll()
        if (tenants) {
            res.status(200).json({
                "message": "Data found successfully",
                "object": tenants,
                "status": true
            })
        }

    } catch (error) {
        res.status(500).json({
            "message": "Internal Server error",
            "status": false
        })
    }
}


/**
 * 
 * @param {request object} req 
 * @param {response object} res 
 * This controller updates the particular tenant's detail
 */
exports.update = async (req, res) => {
    //validate incoming request
    const { fullname, email, phone, address, identity_number, identification_document, status } = req.body
    const id = req.params.id
    const { STATUS, MESSAGE } = tenantValidation.validate(req.body)

    //check validation status
    if (STATUS == false) {
        res.json({
            status: false,
            message: MESSAGE
        })
    } else {
        try {

            const updatedTenant = {
                fullname,
                email,
                phone,
                address,
                identity_number,
                identification_document,
                status
            }
            const result = await Tenant.update(updatedTenant, { where: { tenant_id: id } })

            if (result) {
                res.status(201).json({
                    "message": "Data updated successfully",
                    "status": true
                })
            }

        } catch (error) {
            res.status(500).json({
                "message": "Internal Server error",
                "status": false
            })
        }
    }
}

