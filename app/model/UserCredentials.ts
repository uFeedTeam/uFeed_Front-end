export class UserCredentials {
    constructor(public email: string,
                public name: string,
                public password: string,
                public confirmPassword: string) {
    }
}
let u = new UserCredentials('', '', '', '');