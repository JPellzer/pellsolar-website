# Cloudflare Turnstile Setup — Pell Solar Quote Form

## Official implementation requirements

Cloudflare’s documentation states that a Turnstile widget is created in the Cloudflare dashboard by opening **Turnstile**, selecting **Add widget**, choosing a widget name, adding approved hostnames, selecting a widget mode, creating the widget, and securely copying its site key and secret key. [1]

For the quote form, the planned mode is **Invisible**. The client script uses explicit rendering because the quote form is a React single-page application, and the widget returns a token by callback. Cloudflare states that invisible widgets have no visual footprint and that explicit rendering is suited to dynamic single-page applications. [2]

The application validates the token only on the server with `POST https://challenges.cloudflare.com/turnstile/v0/siteverify`, supplying the secret, token response, and the visitor IP. Cloudflare requires server-side validation because client tokens can be forged, expire after five minutes, and are single-use. [3]

## Pell Solar configuration details

Create the widget with approved hostnames `pellsolar.com` and `www.pellsolar.com`. Copy the public site key into `TURNSTILE_SITE_KEY` and the server-only secret into `TURNSTILE_SECRET_KEY` in the project’s Secrets settings. The application leaves Turnstile disabled when either key is absent, so the current quote flow remains functional until both values are configured.

## References

[1]: https://developers.cloudflare.com/turnstile/get-started/widget-management/dashboard/ "Cloudflare — Create and manage widgets using the dashboard"
[2]: https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/ "Cloudflare — Turnstile widget configurations"
[3]: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/ "Cloudflare — Validate the token"
