import { Client, Account, ID, Databases, Query } from "appwrite";
const client = new Client();
client
    .setEndpoint('http://triton.novao.xyz/v1')
    .setProject('xyz.judahbrown.nabby')
;
export const account = new Account(client);

export const db = new Databases(client);

export const query = Query;

export let id = ID;

export let isSignedIn = async function() {
    return account.getSession('current')
    .then(function (response) {
        return true;
    }, function (error) {
        console.log(error)
        return false;
    });
}