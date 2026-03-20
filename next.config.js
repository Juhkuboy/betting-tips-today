'use strict';

const { withEnvironment } = require('next-env');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Add your environment variables here
  },
};

module.exports = withEnvironment(nextConfig);
