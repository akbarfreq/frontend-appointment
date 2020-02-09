export const convertDateToYearMonthDateFormat = (date) => {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
};

export const convertDateToHourMinuteFormat = date => {
    return date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
};

export const getDateWithTimeSetToGivenTime = (date, hours, minutes, seconds) => {
    return date.setHours(hours, minutes, seconds, 0);
};

export const subtractDate = (date, daysToSubtract) => {
    date = date.setDate(date.getDate() - daysToSubtract);
    return new Date(date);
};

export const addDate = (date, daysToAdd) => {
    date = date.setDate(date.getDate() + daysToAdd);
    return new Date(date);
};
