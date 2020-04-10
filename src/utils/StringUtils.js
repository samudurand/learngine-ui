export function trimAndLowerCaseString(str) {
    if (str) {
        return str.trim().toLowerCase();
    } else {
        return "";
    }
}