export class RequestResult {
    status: number;
    message: string;
    data?: any;
}


export class User {
    _id: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    state?: number;
};

