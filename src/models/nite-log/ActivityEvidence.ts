import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import Activity from "./Activity";

interface ActivityEvidenceAttributes {
    evidenceId: number;
    evidenceUri: string;
}

@Table({
    tableName: 'activityEvidence',
    modelName: 'ActivityEvidence',
    timestamps: false
})
export default class ActivityEvidence extends Model<ActivityEvidenceAttributes>{
    // Attributes
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    declare evidenceId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare evidenceUri: string;

    @ForeignKey(() => Activity)
    @Column
    declare activityId: number;

    // Relationships
    @BelongsTo(() => Activity)
    declare activity: Activity;
}