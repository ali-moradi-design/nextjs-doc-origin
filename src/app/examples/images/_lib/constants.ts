export const REMOTE_BASE =
  "https://raw.githubusercontent.com/vercel/next.js/canary/examples/image-component/public";

// mountains.jpg resized to 8 × 5 px, JPEG quality 70, base64 (296 bytes).
// Generated once with sharp; a remote image needs it written by hand.
export const MOUNTAINS_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAdEAACAgEFAAAAAAAAAAAAAAAAAQIDBAUGEkGR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAWEQEBAQAAAAAAAAAAAAAAAAABAAL/2gAMAwEAAhEDEQA/AJrA3RGitKemUWQXXJp+gAVWlMl//9k=";

// A placeholder can also be any data:image/ URL, here a flat SVG gradient.
export const GRADIENT_PLACEHOLDER: `data:image/${string}` = `data:image/svg+xml;utf8,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='8' height='5'><linearGradient id='g' x2='0' y2='1'><stop stop-color='#93c5fd'/><stop offset='1' stop-color='#475569'/></linearGradient><rect width='8' height='5' fill='url(#g)'/></svg>",
)}`;
