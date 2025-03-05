"use client"; // Ensures it runs only on the client

import { useEffect } from "react";
import Script from "next/script";

export default function JQueryLoader() {
  useEffect(() => {
    // Load jQuery globally
    window.$ = window.jQuery = require("jquery");
  }, []);

  return (
    <>
      {/* Load jQuery */}
      <Script src="https://code.jquery.com/jquery-3.7.1.min.js" strategy="beforeInteractive" />

      {/* Load external scripts after jQuery */}
      <Script src="/js/kaiadmin.min.js" strategy="lazyOnload" />
    </>
  );
}
