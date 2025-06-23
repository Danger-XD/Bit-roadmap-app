export const commentPost = async (req, res) => {
  try {
    return res.status(200).json({status:"success",message:"Initiated"})
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
export const deleteCommentPost = async (req, res) => {
  try {
    return res.status(200).json({status:"success",message:"Initiated"})
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};