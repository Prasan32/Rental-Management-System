const joi=require('joi')

 exports.validate=(body)=>{
    const tenantSchema=joi.object({
        fullname:joi.string().min(3).max(50).required(),
        email:joi.string().email().required(),
        phone:joi.string().max(15).required(),
        address:joi.string().required(),
        identity_number:joi.string().required(),
        identification_document:joi.string().required(),
        status:joi.boolean()
    })
    
    const {error}=tenantSchema.validate(body)

    if(error){
        return {
            STATUS:false,
            MESSAGE:error.message
        }
    }else{
        return {
            STATUS:true
        }
    }
}


