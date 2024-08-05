
import { Schema, model } from 'mongoose';

const linkSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    target: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true,
        unique: true
    },
    views: {
        type: Number,
        default: 0,
        require: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        require: true

    }

},
    { timestamps: true }
)

const Link = model('Link', linkSchema);

export default Link

