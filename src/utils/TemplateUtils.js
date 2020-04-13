export default function getCoverUrlOrDefaultCover(imageUrl) {
    if (imageUrl && imageUrl.length > 0) {
        return imageUrl;
    }
    return "/no-cover.jpg";
}