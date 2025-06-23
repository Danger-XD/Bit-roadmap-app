export const replyComment = async(req, res)=>{
    try {
        return res.status(200).json({status:"success",message:error.message})
        
    } catch (error) {
        return res.status(500).json({status:"failed",message:error.message})
    }
}