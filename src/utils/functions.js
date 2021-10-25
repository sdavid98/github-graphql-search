export const getSearchValueFromUrl = (url) => {
    const matchesForSearchString = /\/search\/([^/]+)/.exec(url);

    if (matchesForSearchString) {
        return matchesForSearchString[1];
    }

    return '';
}