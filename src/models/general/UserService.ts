import CRUDService from "../CRUDService";
import {Schedule, User} from "../types";
import {authentication, random} from "../../helper/helpers";

export default class UserService extends CRUDService<User> {
    constructor() {
        super("users");
    }

    async createUser(username: string, email: string, password: string) {
        const salt = random();
        const hashedPassword = authentication(salt, password);
        return this.create({username, email, password: hashedPassword, salt, role: "user"});
    }

    async getUserByEmail(email: string) {
        const [user] = await this.getByField("email", email);
        return user;
    }

    async getUserBySessionToken(sessionToken: string) {
        return this.getByField("sessionToken", sessionToken);
    }

    async createSessionToken(id: string, password: string) {
        const salt = random();
        const sessionToken = authentication(salt, password);
        return this.update(id, {sessionToken});
    }

    async addSchedule(id: string, schedule: Schedule) {
        const user = await this.getById(id);
        user.schedules.push(schedule);
        return this.update(id, {schedules: user.schedules});
    }
}