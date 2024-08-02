
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
export {
    postLink
};