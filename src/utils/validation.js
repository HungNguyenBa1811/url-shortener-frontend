export const isValidShortcode = (shortcode) => {
    if (!shortcode || typeof shortcode !== 'string') {
        return false;
    }

    // Check length
    if (shortcode.length < 6 || shortcode.length > 8) {
        return false;
    }

    // Check for valid base64url characters
    const base64urlRegex = /^[A-Za-z0-9\-_]+$/;
    if (!base64urlRegex.test(shortcode)) {
        return false;
    }

    return true;
};

export const isValidHttpUrl = (string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};