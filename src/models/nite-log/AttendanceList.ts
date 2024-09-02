import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import Meeting from "./Meeting";
import User from "./User";

interface AttendanceListAttributes {
    meetingId: string;
    userId: number;
}

@Table({
    tableName: "attendance_list",
    modelName: "AttendanceList",
    timestamps: false,
})
export default class AttendanceList extends Model<AttendanceListAttributes> {
    @ForeignKey(() => Meeting)
    @Column
    declare meetingId: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
    })
    declare userId: number;
}