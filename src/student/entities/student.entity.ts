import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Student {

    @Prop({
        unique: true,
        index: true,
    })
    student_id: string;

    @Prop({
        index: true,
    })
    name: string;

    @Prop({
        index: true,
    })
    email: string;

    @Prop({
        index: true,
    })
    active: boolean;

}

export const StudentSchema = SchemaFactory.createForClass( Student );