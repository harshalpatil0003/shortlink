
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
        require: true,
        dafault:0
    }
}
)

const Link = model('Link', linkSchema);

export default Link

