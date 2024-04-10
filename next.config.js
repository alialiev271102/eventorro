/** @type {import('next').NextConfig} */

const withLess = require('next-with-less');

module.exports = withLess({
    reactStrictMode: true,
      serverRuntimeConfig: {
         target: "server",
         poweredByHeader: false,
         compress: true,
         brotliCompress: true,
         generateEtags: true,
    },
    lessLoaderOptions: {},
    images: {
        domains: ['ticket.kg'],
    },
});
