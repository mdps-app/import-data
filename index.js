const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./firebase/firebase-adminsdk.json");

const data = require("./csv/csvjson.json");
const collectionKey = "storage"; //Change!! name of the collection

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://console.firebase.google.com/u/2/project/mdps-app/firestore/data/~2Fstorage" //Change!! your database URL
});

const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

if (data && (typeof data === "object")) {
    Object.keys(data).forEach(docKeys => {
        const docKey = Math.random().toString(36).substring(2, 18);
        firestore
        .collection(collectionKey)
        .doc(docKey)
        .set(data[docKeys])
        .then((res) => {
            console.log("Document " + docKey + " successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    });
}