"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [preferences, setPreferences] = useState(true);
  const [statistics, setStatistics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = document.cookie.split(';').some(c => c.trim().startsWith('cookie_consent=true'));
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Notifications Enabled!", {
            body: "You will now receive updates when I post new blogs.",
            icon: "/Letter B Logo (1) Cropped.png"
          });
        }
      });
    }
  };

  const handleAllowAll = () => {
    document.cookie = `cookie_consent=true; path=/; max-age=31536000`;
    setShow(false);
    requestNotificationPermission();
  };

  const handleAllowSelection = () => {
    document.cookie = `cookie_consent=true; path=/; max-age=31536000`;
    // We could save the specific toggles to a cookie as well if needed.
    setShow(false);
    if (preferences) {
      requestNotificationPermission();
    }
  };

  const handleRejectAll = () => {
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 inset-x-0 z-[60]"
        >
          <div className="p-4 sm:p-6 bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:bg-[#0c0c0c] dark:border-zinc-800">
            <div className="max-w-[85rem] mx-auto">
              <div className="grid lg:grid-cols-4 xl:grid-cols-5 gap-5 items-center">
                
                {/* Image Col */}
                <div className="col-span-1 hidden sm:block">
                  <div className="flex-none inline-block">
                    <img 
                      src="https://i.postimg.cc/BQzN5GB3/cookie.png" 
                      alt="Cookie" 
                      className="w-24 md:w-32 h-auto drop-shadow-xl"
                    />
                  </div>
                </div>

                {/* Content Col */}
                <div className="lg:col-span-3">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                    We use cookies
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
                    We utilize cookies to tailor your experience on this portfolio. This includes saving your interactions (like allowing you to ❤️ blogs), offering notification updates when new technical articles are published, and analyzing site traffic. You can adjust your preferences below.
                  </p>
                  
                  <div className="mt-5 grid md:flex md:items-center gap-4">
                    {/* Necessary (Always Checked/Disabled) */}
                    <div className="flex items-center justify-between md:justify-start w-full">
                      <label htmlFor="hs-cookies-necessary" className="md:order-2 text-sm text-gray-500 md:ml-3 dark:text-zinc-400">Necessary</label>
                      <input 
                        type="checkbox" 
                        id="hs-cookies-necessary" 
                        checked 
                        disabled
                        className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-orange-500 border-2 border-transparent rounded-full cursor-not-allowed transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:outline-none appearance-none dark:bg-zinc-800 dark:checked:bg-orange-500 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-orange-100 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-zinc-400 dark:checked:before:bg-white" 
                      />
                    </div>

                    {/* Preferences */}
                    <div className="flex items-center justify-between md:justify-start w-full">
                      <label htmlFor="hs-cookies-preferences" className="md:order-2 text-sm text-gray-500 md:ml-3 dark:text-zinc-400">Preferences (Likes & Alerts)</label>
                      <input 
                        type="checkbox" 
                        id="hs-cookies-preferences" 
                        checked={preferences}
                        onChange={(e) => setPreferences(e.target.checked)}
                        className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-orange-500 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:ring-orange-500 ring-offset-white focus:outline-none appearance-none dark:bg-zinc-800 dark:checked:bg-orange-500 dark:focus:ring-offset-zinc-900 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-orange-100 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-zinc-400 dark:checked:before:bg-white" 
                      />
                    </div>

                    {/* Statistics */}
                    <div className="flex items-center justify-between md:justify-start w-full">
                      <label htmlFor="hs-cookies-statistics" className="md:order-2 text-sm text-gray-500 md:ml-3 dark:text-zinc-400">Statistics</label>
                      <input 
                        type="checkbox" 
                        id="hs-cookies-statistics" 
                        checked={statistics}
                        onChange={(e) => setStatistics(e.target.checked)}
                        className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-orange-500 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:ring-orange-500 ring-offset-white focus:outline-none appearance-none dark:bg-zinc-800 dark:checked:bg-orange-500 dark:focus:ring-offset-zinc-900 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-orange-100 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-zinc-400 dark:checked:before:bg-white" 
                      />
                    </div>
                  </div>
                </div>

                {/* Buttons Col */}
                <div className="col-span-full xl:col-start-5 xl:col-span-1">
                  <div className="grid sm:grid-cols-3 xl:grid-cols-1 gap-y-2 sm:gap-y-0 sm:gap-x-4 xl:gap-y-3 xl:gap-x-0">
                    <button 
                      onClick={handleAllowAll}
                      type="button" 
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-xl border border-transparent font-bold bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-zinc-900 shadow-md shadow-orange-500/20"
                    >
                      Allow all
                    </button>
                    <button 
                      onClick={handleAllowSelection}
                      type="button" 
                      className="py-[.688rem] px-4 inline-flex justify-center items-center gap-2 rounded-xl border-2 border-orange-500 font-bold text-orange-500 hover:text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-zinc-900"
                    >
                      Allow selection
                    </button>
                    <button 
                      onClick={handleRejectAll}
                      type="button" 
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-xl border border-zinc-200 font-semibold bg-white text-zinc-700 shadow-sm hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-zinc-600 transition-all text-sm dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-white dark:focus:ring-offset-zinc-900"
                    >
                      Reject all
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
