export class RequestResult {
    status: number;
    message: string;
    data?: any;
}

export class mlModel {
    index?: any;
    sales?: any;
    forecast?: any;
};

export class User {
    _id: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    state?: number;
};


export class ladActionModel {
    userId: string;
    ladUserId: string;
    ladId: string;
    ladCaption: string;
    ladItemId: string;
    ladItemCaption: string;
    ladItemRate: Number;

    startDate: Date;
    endDate: Date;
    ladValue: number;
    oneLadMin: number;
    oneLadMax: number;

    actionDate: Date;
    actionValue: number;
};


export class ladItemModel {
    _id: string;
    masterId: string;
    name: string;
    caption: string;
    rate: number;
    selected: boolean;
    state: number;
};


/*
olmal� -> Kullan�c� kredisi => oneLadMax * max(ladItemModel.rate) 
*/

export class ladModel {
    _id?: string;
    userId?: string;
    name?: string;
    caption?: string;
    startDate?: Date;
    endDate?: Date;
    ladValue?: number;
    oneLadMin?: number;
    oneLadMax?: number;
    state?: number;
};

export class ladAllModel {
    lad: ladModel;
    ladItems: ladItemModel[];
}

