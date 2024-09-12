import * as crypto from "node:crypto";

export const createRandomMeetingCode = () => (Math.random()*1000000000).toString()
export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac("sha256", [salt, password].join("/")).update("RESTAPI").digest("hex");
}