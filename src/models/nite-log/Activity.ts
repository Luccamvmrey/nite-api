import {BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import User from "./User";
import ActivityEvidence from "./ActivityEvidence";

interface ActivityAttributes {
    activityId: number;
    deadline: Date;
    task: string
    activityStatus: boolean;
    rating: number;
    observation: string;
}

@Table({
    tableName: 'activity',
    modelName: 'Activity',
    timestamps: false
})
export default class Activity extends Model<ActivityAttributes> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    })
    declare activityId: number;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare deadline: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare task: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    declare activityStatus: boolean;

    @Column({
        type: DataType.SMALLINT,
        allowNull: false
    })
    declare rating: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare observation: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
    })
    declare userId: string;

    @BelongsTo(() => User)
    declare user: User;

    @CreatedAt
    declare createdAt: Date;

    @HasMany(() => ActivityEvidence)
    declare evidences: ActivityEvidence[];
}