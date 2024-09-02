import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import Hierarchy from "./Hierarchy";
import Meeting from "../nite-log/Meeting";
import AttendanceList from "../nite-log/AttendanceList";
import Schedule from "../nite-log/Schedule";
import Activity from "../nite-log/Activity";
import {Optional} from "sequelize";

export interface UserAttributes {
    userId: number;
    hierarchyId: number
    username: string;
    email: string;
    hashedPassword: string;
    salt: string;
    sessionToken: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "userId"> {
}

@Table({
    tableName: "user",
    modelName: "User",
    timestamps: false,
})
export default class User extends Model<UserAttributes, UserCreationAttributes> {
    // Attributes
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

    // Relationships
    @BelongsTo(() => Hierarchy)
    declare hierarchy: Hierarchy;

    @BelongsToMany(() => Meeting, () => AttendanceList)
    declare meetings: Meeting[];

    @HasMany(() => Schedule)
    declare schedules: Schedule[];

    @HasMany(() => Activity)
    declare activities: Activity[];
}