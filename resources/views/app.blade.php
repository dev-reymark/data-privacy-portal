<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Kitchen Display System">
        <meta name="author" content="Rey Mark Tapar">

        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Kitchen Display System",
            "author": {
              "@type": "Person",
              "name": "Rey Mark Tapar",
              "url": "https://www.reymarktapar.site",
              "jobTitle": "Web Developer"
            }
          }
          </script>
    @routes
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>