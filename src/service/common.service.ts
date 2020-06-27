export class CommonService {

    /**
     * convert date type to string base on format
     * @param date date
     * @param format format ex: yyyyMMdd or yyyyMMdd HHmmmSS ..etc
     */
    convertDateToStringByFormat(date: Date, format: string): string {
        let result: string = '';
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        result = format.replace('yyyy', year.toString())
            .replace('MM', this.fixedFormatTwoDigit(month))
            .replace('dd', this.fixedFormatTwoDigit(day))
            .replace('HH', this.fixedFormatTwoDigit(hour))
            .replace('mmm', this.fixedFormatTwoDigit(minute))
            .replace('SS', this.fixedFormatTwoDigit(second));
        return result;
    }

    /**
     * return the number with two fixed digits
     * @param number source number
     */
    fixedFormatTwoDigit(number: number): string {
        let result: string = '';
        result = number < 10 ? ('0' + number.toString()) : number.toString();
        return result;
    }

    /**
     * A short demo for compare two object. easiest way to compare object is JSON.stringify(obj)
     * @param object1 object 1
     * @param object2 object 2
     */
    compareTwoObject<T>(object1: T, object2: T): boolean {
        let result: boolean = false;
        //step 1: convert two object to {[s: string] : any} object
        let obj1: { [s: string]: any } = {};
        let obj2: { [s: string]: any } = {};
        for (let [key, value] of Object.entries(object1)) {
            obj1[key] = value;
        }
        for (let [key, value] of Object.entries(object2)) {
            obj2[key] = value;
        }
        //step 2: loop through all properties to check out
        for (let p in obj1) {
            if (JSON.stringify(obj1[p]) !== JSON.stringify(obj2[p])) {
                result = true;
                break;
            }
        }
        return result;
    }
}