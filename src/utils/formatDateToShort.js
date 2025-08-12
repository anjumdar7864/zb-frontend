export default function formatDateToShort(date) {
    date = new Date(date);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString().substr(-2);

    return `${month}/${day}/${year}`;
}
