export type User = {
    id: string;
    username: string;
    email: string;
    salt: string;
    password: string;
    sessionToken: string;
    isOnAttendance: boolean;
    schedules: Partial<Schedule>[];
    role: UserRoles;
};

export type UserRoles = "admin" | "user";

export type Schedule = {
    id: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
};

export type Meeting = {
    id: string;
    meetingCode: string;
    date: string;
    attendanceList: AttendanceList[];
};

export type AttendanceList = {
    userId: string;
    endTime: string;
    startTime: string;
}

export type DbModels =
    | User
    | Meeting