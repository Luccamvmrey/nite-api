import {db} from "../firebase/firebase";
import {DbModels} from "./types";

export default class CRUDService<T extends DbModels> {
    private modelReference: FirebaseFirestore.CollectionReference;

    constructor(collection: string) {
        this.modelReference = db.collection(collection);
    };

    async create(data: Partial<T>) {
        // Add data to collection
        const newDoc = await this.modelReference.add(data);

        // Update the id field of the data
        data.id = newDoc.id;
        await this.modelReference.doc(newDoc.id).set(data);

        return data;
    };

    async getAll() {
        const snapshot = await this.modelReference.get();
        return snapshot.docs.map(doc => doc.data() as T);
    };

    async getById(id: string) {
        const doc = await this.modelReference.doc(id).get();
        return doc.data() as T;
    };

    async getByField(field: string, value: string) {
        const snapshot = await this.modelReference.where(field, "==", value).get();
        return snapshot.docs.map(doc => doc.data() as T);
    };

    async update(id: string, data: Partial<T>) {
        await this.modelReference.doc(id).update(data);
        return data;
    };

    async delete(id: string) {
        await this.modelReference.doc(id).delete();
    };
}