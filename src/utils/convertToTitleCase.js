export default function convertToTitleCase(inputString) {
    const words = inputString.split(" ");

    const titleCaseWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    if (!titleCaseWords[titleCaseWords.length - 1].endsWith("s"))
        titleCaseWords[titleCaseWords.length - 1] += "s";

    const titleCaseString = titleCaseWords.join(" ");

    return titleCaseString;
}
