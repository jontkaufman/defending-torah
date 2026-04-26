"use client";

import { useEffect, useState } from "react";
import { Mail, X } from "lucide-react";
import { EmailSignupModal } from "./email-signup-modal";

const LS_SEEN = "signup_seen";
const LS_SUBSCRIBED = "signup_subscribed";
const SS_FAB_CLOSED = "signup_fab_closed";

type View = "hidden" | "modal" | "fab";

export function EmailSignupFab() {
  const [view, setView] = useState<View>("hidden");

  useEffect(() => {
    if (localStorage.getItem(LS_SUBSCRIBED)) {
      setView("hidden");
      return;
    }
    if (localStorage.getItem(LS_SEEN)) {
      if (sessionStorage.getItem(SS_FAB_CLOSED)) {
        setView("hidden");
      } else {
        setView("fab");
      }
      return;
    }
    // First visit
    localStorage.setItem(LS_SEEN, "1");
    setView("modal");
  }, []);

  function handleModalClose() {
    setView("fab");
  }

  function handleSubscribed() {
    localStorage.setItem(LS_SUBSCRIBED, "1");
    setView("hidden");
  }

  function handleFabClose() {
    sessionStorage.setItem(SS_FAB_CLOSED, "1");
    setView("hidden");
  }

  if (view === "hidden") return null;

  return (
    <>
      <EmailSignupModal
        open={view === "modal"}
        onClose={handleModalClose}
        onSubscribed={handleSubscribed}
      />

      {view === "fab" && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
          <button
            onClick={() => setView("modal")}
            className="flex items-center gap-2.5 bg-ink text-parchment px-4 py-3 font-mono text-[10.5px] tracking-[0.18em] uppercase border border-ink shadow-[4px_4px_0_0_var(--ochre)] hover:bg-ochre hover:border-ochre transition-all duration-200"
            aria-label="Sign up for updates"
          >
            <Mail size={14} />
            Updates
          </button>
          <button
            onClick={handleFabClose}
            className="bg-ink text-parchment p-2 border border-ink hover:bg-ochre hover:border-ochre transition-all duration-200"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </>
  );
}
