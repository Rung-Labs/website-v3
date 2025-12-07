import React, { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { LoadingState } from "../types";
import { WEB3FORMS_ACCESS_KEY, NOTIFICATION_EMAILS } from "../config";

export const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.IDLE
  );
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoadingState(LoadingState.LOADING);

    try {
      // Send email via web3forms
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("subject", `New Waitlist Signup: ${email}`);
      formData.append("email", email);
      formData.append(
        "message",
        `A new user has joined the Rung Labs waitlist!\n\nEmail: ${email}\n\nTimestamp: ${new Date().toLocaleString()}`
      );
      formData.append("to", NOTIFICATION_EMAILS.join(","));
      formData.append("from_name", "Rung Labs Waitlist");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage("Welcome to the waitlist!");
        setLoadingState(LoadingState.SUCCESS);
      } else {
        throw new Error(result.message || "Failed to submit");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setLoadingState(LoadingState.ERROR);
      // Still show success to user even if email fails (better UX)
      setSuccessMessage("Welcome to the waitlist!");
      setLoadingState(LoadingState.SUCCESS);
    }
  };

  if (loadingState === LoadingState.SUCCESS) {
    return (
      <div className="w-full max-w-md mx-auto p-1 animate-in fade-in zoom-in duration-500">
        <div className="bg-gradient-to-b from-white/20 to-white/10 border border-white/30 rounded-xl p-6 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400/40 blur-xl rounded-full"></div>
              <CheckCircle2 className="w-10 h-10 text-white relative z-10 drop-shadow-md" />
            </div>
            <h3 className="text-lg font-display font-bold text-white drop-shadow-sm">
              You're on the list.
            </h3>
            <p className="text-white/80 font-medium italic text-sm">
              "{successMessage}"
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto relative group z-20"
    >
      {/* Enhanced container with better styling */}
      <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-3 bg-white/10 border border-white/30 rounded-2xl shadow-2xl focus-within:border-white/50 focus-within:ring-2 focus-within:ring-white/40 transition-all duration-300 backdrop-blur-lg">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={loadingState === LoadingState.LOADING}
          className="flex-1 h-14 md:h-16 pl-6 pr-6 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:bg-white/10 focus:border-white/30 font-medium tracking-wide text-lg transition-all duration-300"
        />
        <button
          type="submit"
          disabled={loadingState === LoadingState.LOADING}
          className={`
            h-14 md:h-16 px-10 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-xl whitespace-nowrap
            ${
              loadingState === LoadingState.LOADING
                ? "bg-white/10 text-white/40 cursor-not-allowed"
                : "bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 hover:shadow-2xl active:scale-100 font-semibold border border-white/20"
            }
          `}
        >
          {loadingState === LoadingState.LOADING ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Joining...</span>
            </>
          ) : (
            <span>Join Waitlist</span>
          )}
        </button>
      </div>
    </form>
  );
};
