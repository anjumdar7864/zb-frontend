function remToPixels(remValue) {
    const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
    );

    const pixels = remValue * rootFontSize;

    return pixels;
}

export default remToPixels;
