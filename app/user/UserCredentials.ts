export class UserCredentials {
    constructor(public Name: string,
                public Email: string,
                public Password: string,
                public Id?: number,
                public Categories?: number[],
                public Photo?: string) {
        if (Id == null) {
            Id = 0;
        }

        if (Categories == null) {
            Categories = []
        }

        if (Photo == null) {
            Photo = "";
        }
    }
}