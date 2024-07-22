import { compareAsc, format } from "date-fns";

export function myDate(value) {
    
    var selectedDate = value.split("-");;
    
    const year = selectedDate[0];
    const month = selectedDate[1];
    const day = selectedDate[2];

    const getYear = () => {
        return year;
    }

    const getMonth = () => {
        return month;
    }

    const getDay = () => {
        return day;
    }

    const toString = () => {
        return `${getMonth()}/${getDay()}/${getYear()}`;
    }
    

    return {
        getYear,
        getMonth,
        getDay,
        toString,
    }
}