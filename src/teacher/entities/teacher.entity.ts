import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Teacher {

    @Prop({
        unique: true,
        index: true,
    })
    teacher_id: string;

    @Prop({
        index: true,
    })
    name: string;

    @Prop({
        index: true,
    })
    teacher_email: string;

    @Prop({
        index: true,
    })
    active: boolean;
}

export const TeacherSchema = SchemaFactory.createForClass( Teacher );