export class UserCredentials {
    constructor(public Name: string,
                public Email: string,
                public Password: string,
                public UserId?: number,
                public Categories?: any[],
                public Logins?: number[],
                public Photo?: string) {
        if (UserId == null) {
            UserId = 0;
        }

        if (Categories == null) {
            Categories = []
        }
        if (Logins == null) {
            Logins = []
        }

        if (Photo == null) {
            Photo = "";
        }
    }
}