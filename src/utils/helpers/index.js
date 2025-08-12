export const getInitials = (name = "", single = false) => {
    if (!name) {
        return "N/A";
    }
    const nameParts = name.split(/[\s_]+/);
    const firstInitial = nameParts[0][0];
    if (single || nameParts.length === 1) {
        return firstInitial.toUpperCase();
    }
    const lastInitial = nameParts[nameParts.length - 1][0];
    return (firstInitial + lastInitial).toUpperCase();
}
export const capitalizeFirstLetter = (string = "") => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export const nextBillingDate = (date, type) => {
    
    const currentDate = new Date(date);
    let nextDate;
    if (type === 'monthly') {
        nextDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    } else if (type === 'yearly') {
        nextDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
    } else {
        throw new Error("Invalid type. Please use 'monthly' or 'yearly'.");
    }

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return nextDate.toLocaleDateString('en-US', options);
}
