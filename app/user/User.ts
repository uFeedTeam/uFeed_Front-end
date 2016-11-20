import {UserCredentials} from "./UserCredentials";
export class User {
    constructor(public id: Number,
                public credentials: UserCredentials,
                public categories: string[]) {
    }
}