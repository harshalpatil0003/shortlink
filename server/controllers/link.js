
import Link from "./../model/Link.js";
const postLink = async (req, res) => {
    const { target, title, slug } = req.body;
    const link = new Link({ target, title, slug })

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
    link.views=link.views+1;
    await link.save()

    return res.redirect(link.target)

}
const getAllLinks = async (req, res) => {
    try {
      const links = await Link.find({Link});
  
      res.json({
        success: true,
        data: links,
        message: "All Links Fetched Successfully"
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: "Error fetching links",
        error: error.message
      });
    }
  };
export {
    postLink, getslug,getAllLinks
};