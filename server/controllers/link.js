
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
export {
    postLink, getslug
};