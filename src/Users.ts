import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    message: string;
}

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
        },
        message: {
            type: String,
        }

    },
);



export default mongoose.model<IUser>("users", UserSchema);
