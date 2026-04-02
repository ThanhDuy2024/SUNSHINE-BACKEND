import moment from "moment"

export const momentFormat = (dmy: string) => {
    const format = moment(dmy).format("HH:mm DD-MM-YYYY");
    return format
}