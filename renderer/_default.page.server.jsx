export { render }
export { passToClient }

import ReactDOMServer from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'

// 🔥 Import global CSS for SSR
import '../src/index.css'
import '../src/App.css'

const passToClient = ['pageContext']

function render(pageContext) {
  const { Page, urlPathname } = pageContext

  const pageHtml = ReactDOMServer.renderToString(<Page />)

  const baseUrl = 'https://www.ptdt.taxi'
  const canonicalUrl = urlPathname === '/' 
    ? `${baseUrl}/` 
    : `${baseUrl}${urlPathname.endsWith('/') ? urlPathname : urlPathname + '/'}`

  const seoContent = `
    <div id="seo-content" style="position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;" aria-hidden="true">
      <h1>Peether PTDT Token | Pink Taxi Since 2006 | BSC Blockchain</h1>
      <h2>Turn Your Miles Into Money</h2>
      <p>Empowering women globally through blockchain-powered ride rewards on Binance Smart Chain.</p>
      <h2>About PTDT Token</h2>
      <p>Born in 2006, Pink Taxi pioneered women-only transportation across 18+ countries.</p>
      <h2>Tokenomics</h2>
      <p>100,000 PTDT total supply. BEP-20 token on BSC.</p>
      <h2>Roadmap</h2>
      <p>From private sale to global expansion.</p>
      <h2>Join Private Sale</h2>
      <p>Get PTDT tokens at $1.00 USDT during our private sale.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What is PTDT Token?</h3>
      <p>PTDT powers Pink Taxi's blockchain ecosystem.</p>
    </div>
  `

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta name="ahrefs-site-verification" content="4963d94c6eb47d0bbdee1592fec9cca2b1ad29e18c2fc0b095c28897c75f1523">
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="KDSsMNZo5Fk/1mUF3HDKLA" async></script>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Peether PTDT Token | Pink Taxi Since 2006 | BSC Blockchain</title>
        <meta name="title" content="Peether (PTDT) - Blockchain Women's Safety Token | Pink Taxi Revival">
        <meta name="description" content="Turn miles into money with PTDT token - Pink Taxi's blockchain women's safety platform. 100K supply on BSC. Private sale live. Empowering since 2006.">
        <meta name="keywords" content="PTDT token, Peether, Pink Taxi, women safety, blockchain taxi, BEP-20, BSC token, women empowerment, private sale">
        <meta name="author" content="Pink Taxi Group LTD, UK">
        <meta name="robots" content="index, follow">
        <meta name="language" content="English">
        <meta name="revisit-after" content="7 days">

        <link rel="canonical" href="${canonicalUrl}">

        <meta property="og:type" content="website">
        <meta property="og:url" content="${canonicalUrl}">
        <meta property="og:site_name" content="Peether - PTDT Token">
        <meta property="og:title" content="Peether PTDT Token | Pink Taxi Since 2006">
        <meta property="og:description" content="Turn miles into money. Empowering women globally through blockchain-powered ride rewards.">
        <meta property="og:image" content="https://www.ptdt.taxi/social-preview.png">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:locale" content="en_US">
        <meta property="fb:app_id" content="832842832714156">

        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@PTDT_Token">
        <meta name="twitter:creator" content="@PTDT_Token">
        <meta name="twitter:url" content="${canonicalUrl}">
        <meta name="twitter:title" content="Peether PTDT Token | Pink Taxi Since 2006">
        <meta name="twitter:description" content="Turn miles into money. Empowering women globally through blockchain-powered ride rewards.">
        <meta name="twitter:image" content="https://www.ptdt.taxi/social-preview.png">

        <link rel="icon" type="image/png" href="/ptdtlogo.png">
        <link rel="apple-touch-icon" href="/ptdtlogo.png">
        <link rel="manifest" href="/site.webmanifest">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Montserrat:wght@400;600;700&family=Lexend:wght@200;300;400;500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;700&family=Fira+Code:wght@700&family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">

        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Peether - PTDT Token",
          "url": "https://www.ptdt.taxi",
          "logo": "https://www.ptdt.taxi/ptdtlogo.png",
          "foundingDate": "2006",
          "sameAs": [
            "https://x.com/PTDT_Token",
            "https://www.facebook.com/PTDToken/",
            "https://t.me/PeetherPTDT"
          ]
        }
        </script>

        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is PTDT Token?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "PTDT (Peether) is the utility token powering Pink Taxi's blockchain ecosystem on Binance Smart Chain."
              }
            },
            {
              "@type": "Question",
              "name": "How do I participate in the PTDT private sale?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sign up on ptdt.taxi and purchase PTDT tokens using USDT on Binance Smart Chain at $1.00 per token."
              }
            }
          ]
        }
        </script>

        <meta name="theme-color" content="#ec4899">
        <meta name="geo.region" content="GB">

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-RKMMPXT0T1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RKMMPXT0T1');
        </script>

        <style>
          #root > :first-child { display: block !important; }
          #root > :nth-child(2) { display: none !important; }
        </style>

      </head>
      <body>
        <script>
          (function() {
            try {
              var hash = window.location.hash || '';
              var search = window.location.search || '';
              var isRecovery = hash.indexOf('type=recovery') !== -1 || search.indexOf('type=recovery') !== -1;
              if (isRecovery) {
                window.__PTDT_PASSWORD_RECOVERY__ = true;
                if (hash.indexOf('access_token') !== -1) {
                  window.__PTDT_RECOVERY_HASH__ = hash.substring(1);
                }
              }
            } catch(e) {}
          })();
        </script>
        ${dangerouslySkipEscape(seoContent)}
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {}
  }
}