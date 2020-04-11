
export default function getCoverUrlOrDefaultCover(imageUrl) {
    if (imageUrl && imageUrl.length > 0) {
        return imageUrl;
    } else {
        return "/no-cover.jpg";
    }
}