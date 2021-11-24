import { DateTime } from '../libs/luxon.js';

export default (dateFrom, dateTo) => {
    if (dateFrom < dateTo) {
        [dateFrom, dateTo] = [dateTo, dateFrom];
    }

    const dateFromObj = DateTime.fromISO(dateFrom);
    const dateToObj = DateTime.fromISO(dateTo);

    const diff = dateFromObj.diff(dateToObj, ['years', 'months', 'days']).toObject()

    return diff
}