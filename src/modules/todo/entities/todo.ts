import { prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

export class Todo {
    readonly _id!: ObjectId;

    @prop({ default: new Date() })
    createdAt!: Date;

    @prop({ default: new Date() })
    updatedAt!: Date;

    @prop()
    content!: string;

    @prop({ default: false })
    isDone!: boolean;
}
