export function trimAndLowerCaseString(str) {
    if (str) {
        return str.trim().toLowerCase();
    }
    return "";
}