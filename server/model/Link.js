
import { Schema, model } from 'mongoose';

const linkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    views: {
        type: Number,
        default: 0,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",

    }

},
    { timestamps: true }
)

const Link = model('Link', linkSchema);

export default Link

