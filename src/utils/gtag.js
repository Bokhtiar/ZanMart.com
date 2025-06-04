export const GA_TRACKING_ID = 'G-JY1P989DB3'; // আপনার Google Analytics ID

// pageview ট্র্যাক করার ফাংশন
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// কাস্টম ইভেন্ট ট্র্যাক করার ফাংশন (প্রয়োজনে)
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
