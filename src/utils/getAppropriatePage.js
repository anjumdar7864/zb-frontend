export default function getAppropriatePage(
    currentPage,
    currentlySelectedNumberOfRows,
    newValue
) {
    const item = (currentPage - 1) * currentlySelectedNumberOfRows + 1;
    const newPage = Math.ceil(item / newValue);
    return newPage;
}
