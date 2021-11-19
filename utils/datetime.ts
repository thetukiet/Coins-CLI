
export {}

if (!String.prototype.hasOwnProperty('toTimestamp')) {
    String.prototype.toTimestamp = function (): number {
        try {
            let parts = this.split("-");
            if(parts.length < 3)
                return 0;

            let newDate = new Date(
                parseInt(parts[2]),         // year
                parseInt(parts[1]) - 1,     // month
                parseInt(parts[0]));        // day

            return (newDate.getTime()/1000);
        } catch (e: any){
            console.debug(e);
            return 0;
        }
    }
}


if (!Number.prototype.hasOwnProperty('getMinTimestamp')) {
    Number.prototype.getMinTimestamp = function (): number {
        try {
            if (this == null)
                return 0;

            let fullTimeStamp: number = Number(this) * 1000;
            let dateTime = new Date(fullTimeStamp);
            let baseDate = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

            return (baseDate.getTime() / 1000);
        } catch (e: any) {
            console.debug(e);
            return 0;
        }
    }
}

if (!Number.prototype.hasOwnProperty('getMaxTimestamp')) {
    Number.prototype.getMaxTimestamp = function (): number {
        try {
            if (this == null)
                return 0;

            let fullTimeStamp: number = Number(this) * 1000;
            let dateTime = new Date(fullTimeStamp);
            let maxDateTime = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), 23, 59, 59);

            return (maxDateTime.getTime() / 1000);
        } catch (e: any) {
            console.debug(e);
            return 0;
        }
    }
}


if (!Number.prototype.hasOwnProperty('toDateTimeString')) {
    Number.prototype.toDateTimeString = function (): any {
        try {
            if (this == null)
                return 'NAN';

            let fullTimeStamp: number = Number(this) * 1000;
            let dateTime = new Date(fullTimeStamp);

            return formatDate(dateTime);
        } catch (e: any) {
            console.debug(e);
            return 0;
        }
    }
}



function formatDate(date: Date): string {
    let hour = (date.getHours()).toString();
    let minute = (date.getMinutes()).toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let year = date.getFullYear().toString();

    if (hour.length < 2)
        hour = '0' + hour;
    if (minute.length < 2)
        minute = '0' + minute;
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return `${day}-${month}-${year} ${hour}:${minute}`;
}
