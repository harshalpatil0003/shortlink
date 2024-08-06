
import Link from "./../model/Link.js";
import User from "../model/User.js";
const postLink = async (req, res) => {
  const { target, title, slug, user } = req.body;
  const link = new Link({ target, title, slug, user })

  const savedLink = await link.save();
  res.json({
    success: true,
    data: savedLink,
    message: "Link saved successfully"
  })
}
const getslug = async (req, res) => {
  const { slug } = req.params
  const link = await Link.findOne({ slug })

  if (!link) {
    return res.json({
      success: false,
      message: "Link not found"
    })
  }
  link.views = link.views + 1;
  await link.save()

  return res.redirect(link.target)

}
// const getAllLinks = async (req, res) => {
//   try {
//     const links = await Link.find();

//     res.json({
//       success: true,
//       data: links,
//       message: "All Links Fetched Successfully"
//     });
//   } catch (error) {
//     res.status(404).json({
//       success: false,
//       message: "Error fetching links",
//       error: error.message
//     });
//   }
//   const {userId}=req.query
//   const user=await User.findById(userId)
//   if(!user){
//     return res.status(404).json({
//       success: false,
//       message: "User not found",
//       data:null
//       })
//   }
//   const getuserlinks=await Link.find({user:userId})
//   return res.json({
//     success: true,
//     data:getuserlinks,
//     message: "All Links Fetched Successfully"
//   })
// }
const signup = async (req, res) => {
  const { name, email, password, role } = req.body
  const user = new User({ name, email, password, role })

  try {
    const saveduser = await user.save()
    res.json({
      success: true,
      message: "User created",
      data: saveduser
    })
  }
  catch (error) {
    res.json({
      success: false,
      message: "User not created",
      data: null
    })

  }
}
const signin = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({
    email: email,
    password: password
  })
  if (user) {
    return res.json({
      success: true,
      message: "login Successful",
      data: user
    })
  }
  else {
    return res.json({
      success: false,
      message: "Invalid Credentials",
      data: null
    })
  }
}
const getuserlinks = async (req, res) => {
  const { userId } = req.query
  console.log(userId)

  const user = await User.findById(userId)
  console.log(user);
  

  if (!user) {
    return res.json({
      success: false,
      message: "User not found",
      data: null
    })
  }
  const links = await Link.find({ user: userId })
  res.json({
    success: true,
    message: "All Links Fetched Successfully",
    data: links
  })
}
export {
  postLink, getslug, signup, signin, getuserlinks
};