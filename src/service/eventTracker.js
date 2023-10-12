// Create a new IntersectionObserver object

async function trackEvent(eventName, currentUrl, data) {
  const timestamp = new Date().getTime();
  const eventData = {
    eventName: eventName,
    timestamp: timestamp,
    currentUrl: currentUrl,
    data: data,
  };

  console.log("eventData", eventData);

  await fetch("http://localhost:5000/api/trackEvent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
}

export function trackOnPageLoad(currentUrl) {
  trackEvent("Page Loaded", currentUrl);
}

export function trackAdClicked(adPosition) {
  const currentUrl = window.location.href;
  trackEvent("Ad Clicked", currentUrl, {
    adPosition: adPosition,
  });
}

export function trackOnViewportEnter(element, adPosition) {
  let observer = new IntersectionObserver(function (entries, observer) {
    if (entries && entries.length > 0 && entries[0].isIntersecting) {
      const currentUrl = window.location.href;
      trackEvent("Viewport entered", currentUrl, {
        adPosition: adPosition,
      });
    }
  });
  observer.observe(element);
}

export function trackTimeSpendOnPage(startTime, currentUrl) {
  const endTime = performance.now();
  const timeSpentInSeconds = (endTime - startTime) / 1000;
  trackEvent("Time on Page", currentUrl, {
    duration: timeSpentInSeconds.toFixed(2),
  });
}

let exitIntentDetected = false;
const mouseEvent = (e) => {
  const currentUrl = window.location.href;
  if (!e.toElement && !e.relatedTarget && !exitIntentDetected) {
    document.removeEventListener("mouseout", mouseEvent);
    exitIntentDetected = true;
    trackEvent("Page Exit", currentUrl);
  }
};
export function trackPageExit() {
  document.removeEventListener("mouseout", mouseEvent);
  document.addEventListener("mouseout", mouseEvent);
}
