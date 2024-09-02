import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import User from "./User";
import AttendanceList from "./AttendanceList";


interface MeetingAttributes {
    meetingId: string;
    meetingCode: string;
    date: Date;
}

@Table({
    tableName: "meeting",
    modelName: "Meeting",
    timestamps: false,
})
export default class Meeting extends Model<MeetingAttributes> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    declare meetingId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare meetingCode: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare date: Date;

    @BelongsToMany(() => User, () => AttendanceList)
    declare users: User[];
}