import {Sequelize} from "sequelize-typescript";
import config from "./config";
import * as path from "node:path";

const sequelize = new Sequelize({
    ...config.getDatabaseConfig(),
    dialect: "mysql",
    models: [path.join(__dirname, "../models/**/*.ts")],
});

const startDatabase = () => {
    console.log("Loaded models: ", sequelize.models);
    sequelize.sync()
        .then(() => {
            console.log("Database is connected");
        });
}

export {
    sequelize,
    startDatabase,
}