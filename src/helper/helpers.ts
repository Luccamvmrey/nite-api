import * as crypto from "node:crypto";

export const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
}
export const formatTime = () => {
    const dateObj = new Date();
    return dateObj.toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo'
    })
}
export const createRandomMeetingCode = () => (Math.floor(Math.random()*1000000000)).toString()
export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac("sha256", [salt, password].join("/")).update("RESTAPI").digest("hex");
}