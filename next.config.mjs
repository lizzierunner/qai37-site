/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // GitHub Pages serves the site under /qai37-site — remove this if you add a custom domain.
  basePath: "/qai37-site",
  trailingSlash: true,
  // Required for static export when using next/image (safe to keep even with plain <img>).
  images: { unoptimized: true },
};

export default nextConfig;
