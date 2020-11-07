import firestore from "../firebase";

const db = firestore.collection("/users");

class UserDataService {

    getAll() {
        return db;
    }

    update(id, value) {
        return db.doc(id).update(value);
    }

}

export default new UserDataService();