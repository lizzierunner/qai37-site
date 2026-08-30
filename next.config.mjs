/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  output: "export",
  // GitHub Pages serves the site under /qai37-site — only apply this prefix for that deployment target.
  basePath: isGithubPages ? "/qai37-site" : "",
  env: { NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/qai37-site" : "" },
  trailingSlash: true,
  // Required for static export when using next/image (safe to keep even with plain <img>).
  images: { unoptimized: true },
};

export default nextConfig;
