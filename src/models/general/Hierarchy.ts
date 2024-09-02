import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import User from "./User";

interface HierarchyAttributes {
    hierarchyId: number;
    name: string;
    level: number;
}

@Table({
    tableName: "hierarchy",
    modelName: "Hierarchy",
    timestamps: false,
})
export default class Hierarchy extends Model<HierarchyAttributes> {
    // Attributes
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
    })
    declare hierarchyId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare level: number;

    // Relationships
    @HasMany(() => User)
    declare users: User[];
}