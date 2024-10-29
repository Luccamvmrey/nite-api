import CRUDService from "../CRUDService";
import {Schedule, User} from "../types";
import {authentication, createRandomMeetingCode, random} from "../../helper/helpers";

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
        const [user] = await this.getByField("sessionToken", sessionToken);
        return user;
    }

    async createSessionToken(id: string, password: string) {
        const salt = random();
        const sessionToken = authentication(salt, password);
        return this.update(id, {sessionToken});
    }

    async addSchedule(id: string, schedule: Partial<Schedule>) {
        const user = await this.getById(id);
        schedule.id = createRandomMeetingCode();
        if (!user.schedules) {
            user.schedules = [];
        }
        user.schedules.push(schedule);
        return this.update(id, {schedules: user.schedules});
    }

    async updateSchedule(userId: string, scheduleId: string, schedule: Partial<Schedule>) {
        const user = await this.getById(userId);
        user.schedules.forEach((s, index) => {
            if (s.id === scheduleId) {
                user.schedules[index] = {...s, ...schedule};
            }
        })
        return this.update(userId, {schedules: user.schedules});
    }

    async deleteSchedule(userId: string, scheduleId: string) {
        const user = await this.getById(userId);
        user.schedules = user.schedules.filter(s => s.id !== scheduleId);
        return this.update(userId, {schedules: user.schedules});
    }
}