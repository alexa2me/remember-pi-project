"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addZero(value) {
    if (value <= 9) {
        return "0" + value;
    }
    else {
        return value;
    }
}
function dateWithoutTime(dateTime) {
    let date = new Date(dateTime);
    const formattedDate = `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${date.getFullYear()}`;
    return formattedDate;
}
exports.default = dateWithoutTime;
//# sourceMappingURL=formatData.js.map