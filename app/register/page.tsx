"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} login sedang tidak tersedia. Silakan daftar dengan email terlebih dahulu.`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    setIsSubmitting(true);
    // Simulasi proses registrasi
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Di sini Anda bisa melakukan fetch ke API endpoint /api/register
      console.log({ fullName, email, password });
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  return (
    <main className="min-h-screen flex items-stretch bg-surface text-on-surface font-body-md overflow-x-hidden">
      {/* Left Side: Branding - hanya tampil di layar besar */}
      <section className="hidden lg:flex w-1/2 relative bg-inverse-surface items-center justify-center p-margin-desktop overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9hlKjIGuKLrOOCaIYx7Ews3Bh3OTbJgpoqc2u9FONTL1AiHoUig5nB1ZaZpjn4_9SXlgxvYbuZSaOGIxVTa_KSOxWxkK6s1EPIXWylGWRMKyZmcIxDF6K_8_XdFl5f2FQ9Ll0Q6V1tiPRkDcYXoHhRm76biXAGlD99Evbxa4ZSfpcHZ0H6v7ZDByDv6gBjSGYRebAiCD5ea2Gt06b2To9V9ywBOC1iq1uRnmdzz3gtO-CRKPMNqS4A_Qect0BYJwBxsYt6O4k0MQ2"
            alt="Concert crowd"
            fill
            sizes="50vw"
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
        </div>
        <div className="relative z-10 max-w-lg">
          <div className="mb-stack-lg">
            <span className="font-display-lg text-display-lg font-extrabold text-on-primary-container tracking-tighter block mb-stack-sm">
              Ventix
            </span>
            <div className="h-1.5 w-24 bg-primary rounded-full"></div>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-primary-container mb-stack-md leading-tight">
            Experience events like never before.
          </h1>
          <p className="font-body-lg text-body-lg text-surface-variant/80">
            Join thousands of event enthusiasts and get exclusive access to
            premium tickets, backstage passes, and cultural moments.
          </p>
          <div className="mt-stack-xl grid grid-cols-2 gap-stack-md">
            <div className="p-stack-md rounded-lg bg-surface/5 backdrop-blur-md border border-white/10">
              <span className="material-symbols-outlined text-primary-fixed-dim block mb-2">
                confirmation_number
              </span>
              <p className="font-label-md text-label-md text-white">Verified Tickets</p>
            </div>
            <div className="p-stack-md rounded-lg bg-surface/5 backdrop-blur-md border border-white/10">
              <span className="material-symbols-outlined text-primary-fixed-dim block mb-2">
                verified_user
              </span>
              <p className="font-label-md text-label-md text-white">Secure Checkout</p>
            </div>
          </div>
        </div>
        {/* Floating decoration */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-secondary/10 rounded-full blur-[100px]"></div>
      </section>

      {/* Right Side: Registration Form */}
      <section className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-stack-xl">
        <div className="max-w-md w-full mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-stack-lg flex items-center gap-2">
            <Image src="/ventix-mark.png" alt="Ventix" width={36} height={36} />
          </div>

          <div className="mb-stack-lg">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-xs">
              Create Account
            </h2>
            <p className="font-body-md text-on-surface-variant">
              Sign up to start your journey with Ventix.
            </p>
          </div>

          {/* Social Sign Up */}
          <div className="grid grid-cols-2 gap-4 mb-stack-lg">
            <button
              type="button"
              onClick={() => handleSocialLogin("Google")}
              className="flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-outline-variant hover:shadow-sm transition-shadow duration-200 bg-white"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden bg-white flex items-center justify-center">
                <Image
                  src="/google-logo.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </div>
              <span className="font-label-md text-label-md text-on-surface">Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("Facebook")}
              className="flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-outline-variant hover:shadow-sm transition-shadow duration-200 bg-white"
            >
              <div className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center text-white">f</div>
              <span className="font-label-md text-label-md text-on-surface">Facebook</span>
            </button>
          </div>

          <div className="relative flex items-center mb-stack-lg">
            <div className="flex-grow border-t border-outline-variant/30"></div>
            <span className="flex-shrink mx-4 font-label-sm text-label-sm text-outline uppercase tracking-widest">
              or email
            </span>
            <div className="flex-grow border-t border-outline-variant/30"></div>
          </div>

          {/* Registration Form */}
          <form className="space-y-stack-md" onSubmit={handleSubmit}>
            <div className="group">
              <label
                className="block font-label-md text-label-md text-on-surface-variant mb-2"
                htmlFor="fullname"
              >
                Full Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                  person
                </span>
                <input
                  id="fullname"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-surface border-outline-variant/50 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 placeholder:text-outline/50"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label
                className="block font-label-md text-label-md text-on-surface-variant mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-surface border-outline-variant/50 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 placeholder:text-outline/50"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label
                className="block font-label-md text-label-md text-on-surface-variant mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white border border-outline-variant/50 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 placeholder:text-outline/50"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3 py-2">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary/20"
                />
              </div>
              <label
                htmlFor="terms"
                className="font-body-sm text-body-sm text-on-surface-variant"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-primary font-bold hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary font-bold hover:underline">
                  Privacy Policy
                </Link>.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-label-md text-label-md rounded-full shadow-lg hover:brightness-105 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Processing...
                </>
              ) : submitSuccess ? (
                <>
                  <span className="material-symbols-outlined">check_circle</span>
                  Account Created
                </>
              ) : (
                <>
                  <span>Sign Up</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <p className="mt-stack-lg text-center font-body-sm text-body-sm text-on-surface-variant">
            Already have an account?
            <a href="/login" className="text-primary font-bold hover:underline ml-1">
              Log In
            </a>
          </p>
        </div>

        {/* Footer for Form Section */}
        <footer className="mt-auto pt-stack-xl flex flex-wrap justify-center gap-stack-md">
          <Link href="/privacy" className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="/cookies" className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors">
            Cookie Policy
          </Link>
          <Link href="/support" className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors">
            Support
          </Link>
        </footer>
      </section>
    </main>
  );
}