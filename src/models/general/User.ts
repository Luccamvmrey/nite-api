import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import Hierarchy from "./Hierarchy";
import Meeting from "./Meeting";
import AttendanceList from "./AttendanceList";
import Schedule from "./Schedule";
import Activity from "./Activity";

interface UserAttributes {
    userId: string;
    hierarchy: Hierarchy
    username: string;
    email: string;
    hashedPassword: string;
    salt: string;
    sessionToken: string;
}

@Table({
    tableName: "user",
    modelName: "User",
    timestamps: false,
})
export default class User extends Model<UserAttributes> {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare userId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare hashedPassword: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare salt: string;

    @Column({
        type: DataType.STRING,
    })
    declare sessionToken: string;

    @ForeignKey(() => Hierarchy)
    declare hierarchyId: number;

    @BelongsTo(() => Hierarchy)
    declare hierarchy: Hierarchy;

    @BelongsToMany(() => Meeting, () => AttendanceList)
    declare meetings: Meeting[];

    @HasMany(() => Schedule)
    declare schedules: Schedule[];

    @HasMany(() => Activity)
    declare activities: Activity[];
}