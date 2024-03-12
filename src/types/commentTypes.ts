import { Types, Schema } from "mongoose"
interface IComment{
    _id: any;
    name: string,
    email: string,
    blogId: Schema.Types.ObjectId,
    comment: string,
    date: Date
}
export default IComment;