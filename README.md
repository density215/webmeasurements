# Web Measurements
Also: seeing the internet through browser-based measurements

<script src="/webmeasurements.js"></script>

<!-- Global site tag (gtag.js) - Google Analytics 
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-128157472-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-128157472-1');
</script>-->

## Collaborate

All it takes is placing the following script on your site. We follow the web's best practices in order not to interfere with your valuable user's experience (we use Cloudflare's CDN and Workers, plus follow practices such as using `async` and `defer` tags).

```html
<script src="https://webmeasurements.net/webmeasurements.js"></script>
```

## Data Collection

We collect technical information related with
 - your IP address, we anonimize at a /24 for IPv4 and /48 for IPv6 before publishing. We currently store the full address in DB, but will stop doing that in the near future.
 - the ISP you're connected to
 - the browser you're using

We *do not* collect
 - your browsing activity, including which pages you've been visiting
 - personal related information
 - We honour [Do Not Track header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/DNT). If present, then we'll run no tests at all.
 
Also, we make use of cookies 🍪, for you not to run the same experiment repeatedly over time, only when needed.

## For collaborators

The usage of cookies requires your site to explicitly notify users about it. You've been warned!

## Contact
agustin@webmeasurements.net

![Build status](https://travis-ci.org/aguformoso/webmeasurements.svg?branch=master)

[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=S2VYNXp4QzlOdjJPdm8yLzhnaUhCQT09LS1zanNnSHR6c3JRYkRhYUVDYUNoeSt3PT0=--5c10619dec1d8fc64723dc4cb007c48c63ac0ba5)](https://www.browserstack.com/automate/public-build/S2VYNXp4QzlOdjJPdm8yLzhnaUhCQT09LS1zanNnSHR6c3JRYkRhYUVDYUNoeSt3PT0=--5c10619dec1d8fc64723dc4cb007c48c63ac0ba5)
