export interface ILatestUrlItem {
    shortUrl: string,
    longUrl: string,
    code: String
}

export interface IUrlFormBody {
    longlink: String,
    backhalf: String
}

export interface ICardInfo {
    field: String,
    data_title: String,
    data: String,
    subdata_title: String,
    subdata: String
}

export interface IClickCountItem {
    click_count: String
    code: String
}

export interface ICalenderForm {
    start_date: Date,
    end_date: Date
}

export interface IResponseCode {
    code: String,
    record: any
}

export interface IUserItem {
    ID: string,
    activateStatus: number,
    deleteDate: Date | undefined,
    serviceapiID: string,
    serviceapiName: string,
    serviceapiRole: number,
    serviceapiSecretKey: string | undefined
}

export interface IBrowserData {
    stat_browser: string,
    browserCount: number
}

export interface IOsData {
    stat_os: string,
    osCount: number
}

export interface IClickData {
    count_date: string,
    click_count: number
}

export interface IDateItem {
    todayDate: Date,
    weekBeforeDate: Date,
    todayString: string,
    weekBeforeString: string
}


export interface IGraphPoints {
    dates: string[],
    data: number[]
}

export interface ISitesItem {
    shortUrl: string,
    longUrl: string,
    count: number

}