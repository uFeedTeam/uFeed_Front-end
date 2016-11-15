export class UserCredentials {
    constructor(public Email: string,
                public Name: string,
                public Password: string,
                public ConfirmPassword: string) {
    }
}
let u = new UserCredentials('', '', '', '');