import API from "../services/api";

export const getImageUrl = (image) => {
  if (!image) {
    return "https://placehold.co/600x600?text=No+Image";
  }

  // If image is already a full URL
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  // If image is stored locally
  if (image.startsWith("/uploads")) {
    return `${API.defaults.baseURL.replace("/api", "")}${image}`;
  }

  return image;
};