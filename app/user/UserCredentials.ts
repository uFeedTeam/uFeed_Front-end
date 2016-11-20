export class UserCredentials {
    constructor(public name: string,
                public email: string,
                public password: string,
                public id?: number,
                public categories?: number[],
                public photo?: string) {
        if (id == null) {
            id = 0;
        }

        if (categories == null) {
            categories = []
        }

        if (photo == null) {
            photo = "";
        }
    }
}