export type PhoneClickEventParams = {
  phone_number: string;
  link_url: string;
  link_location: string;
};

export const GOOGLE_ADS_PHONE_CONVERSION = "AW-17865947343/oC4xCJL7x-UcEM_xksdC";

export function getPhoneConversionEventParams() {
  return {
    send_to: GOOGLE_ADS_PHONE_CONVERSION,
    value: 1.0,
    currency: "USD",
  };
}

export function getPhoneClickEventParams(href: string, pathname: string): PhoneClickEventParams {
  const phoneNumber = href.replace(/^tel:/i, "").replace(/[^0-9+]/g, "");
  return {
    phone_number: phoneNumber,
    link_url: href,
    link_location: pathname || "/",
  };
}

export function trackPhoneLinkClick(href: string, pathname = window.location.pathname) {
  const params = getPhoneClickEventParams(href, pathname);
  const analyticsWindow = window as Window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  };

  if (typeof analyticsWindow.gtag === "function") {
    analyticsWindow.gtag("event", "phone_click", params);
    analyticsWindow.gtag("event", "conversion", getPhoneConversionEventParams());
  } else {
    (analyticsWindow.dataLayer ??= []).push({ event: "phone_click", ...params });
    analyticsWindow.dataLayer.push({ event: "conversion", ...getPhoneConversionEventParams() });
  }
}

export function installPhoneLinkTracking() {
  const trackingWindow = window as Window & { __pellSolarPhoneTrackingInstalled?: boolean };
  if (trackingWindow.__pellSolarPhoneTrackingInstalled) return;
  trackingWindow.__pellSolarPhoneTrackingInstalled = true;

  document.addEventListener("click", (event) => {
    const clickedElement = event.target instanceof Element ? event.target : null;
    const link = clickedElement?.closest<HTMLAnchorElement>('a[href^="tel:"]');
    if (link?.href) trackPhoneLinkClick(link.getAttribute("href") || link.href);
  }, { capture: true });
}

export function getPhoneTrackingInlineScript(nonce = "") {
  const nonceAttribute = nonce ? ` nonce="${nonce}"` : "";
  return `<script${nonceAttribute}>(function(){if(window.__pellSolarPhoneTrackingInstalled)return;window.__pellSolarPhoneTrackingInstalled=true;document.addEventListener('click',function(event){var node=event.target instanceof Element?event.target:null;var link=node&&node.closest('a[href^="tel:"]');if(!link)return;var href=link.getAttribute('href')||link.href;var params={phone_number:href.replace(/^tel:/i,'').replace(/[^0-9+]/g,''),link_url:href,link_location:window.location.pathname||'/'};var conversion={send_to:'${GOOGLE_ADS_PHONE_CONVERSION}',value:1.0,currency:'USD'};if(typeof window.gtag==='function'){window.gtag('event','phone_click',params);window.gtag('event','conversion',conversion)}else{window.dataLayer=window.dataLayer||[];window.dataLayer.push(Object.assign({event:'phone_click'},params));window.dataLayer.push(Object.assign({event:'conversion'},conversion))}},true)})();</script>`;
}
