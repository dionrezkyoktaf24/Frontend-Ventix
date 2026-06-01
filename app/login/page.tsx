"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [nextPath, setNextPath] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNextPath(params.get("next") ?? undefined);
  }, []);

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} login belum tersedia. Silakan masuk menggunakan email dan password.`);
  };

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    try { setIsSubmitting(true);
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.access_token;
      localStorage.setItem("token", token);
      setLoginSuccess(true);

      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.role === "ADMIN") {
        router.push("/admin/dashboard");  
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "Email atau password salah");
    } finally {
      setIsSubmitting(false);
    }
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
            Experience the next generation of event ticketing.
          </h1>
          <p className="font-body-lg text-body-lg text-surface-variant/80">
            Join thousands of event-goers discovering exclusive concerts, tech summits, and local experiences every day.
          </p>
          <div className="mt-stack-xl flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-surface/40 border-2 border-inverse-surface flex items-center justify-center"
                >
                  <span className="text-xs text-white font-bold">{i}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="font-label-lg text-label-lg text-white font-bold">Over 50k+ Members</p>
              <p className="font-body-sm text-body-sm text-surface-variant/80">Trusted by organizers worldwide</p>
            </div>
          </div>
        </div>
        {/* Floating decoration */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-secondary/10 rounded-full blur-[100px]"></div>
      </section>

      {/* Right Side: Login Form */}
      <section className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-stack-xl">
        <div className="max-w-md w-full mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-stack-lg flex items-center gap-2">
            <Image src="/ventix-mark.png" alt="Ventix" width={36} height={36} />
          </div>

          <div className="mb-stack-lg">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-xs">
              Welcome back
            </h2>
            <p className="font-body-md text-on-surface-variant">
              Please enter your details to sign in.
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-stack-md" onSubmit={handleSubmit}>
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
                    className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant/50 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 placeholder:text-outline/50"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <div className="flex items-center justify-between mb-2">
                  <label
                    className="block font-label-md text-label-md text-on-surface-variant"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Link href="/support" className="font-label-md text-label-md text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>
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

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

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
                ) : loginSuccess ? (
                  <>
                    <span className="material-symbols-outlined">check_circle</span>
                    Login Success
                  </>
                ) : (
                  <>
                    <span>Login</span>
                  </>
                )}
              </button>
            </form>

            <div className="relative flex items-center my-stack-md">
              <div className="flex-grow border-t border-outline-variant/30"></div>
              <span className="flex-shrink mx-4 font-label-sm text-label-sm text-outline uppercase tracking-widest">
                or continue with
              </span>
              <div className="flex-grow border-t border-outline-variant/30"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-stack-lg">
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-outline-variant hover:shadow-sm transition-shadow duration-200 bg-white"
              >
                <Image
                  src="/google-logo.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span className="font-label-md text-label-md text-on-surface">Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("Apple")}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-outline-variant hover:shadow-sm transition-shadow duration-200 bg-white"
              >
                <span className="material-symbols-outlined text-on-surface">apple</span>
                <span className="font-label-md text-label-md text-on-surface">Apple</span>
              </button>
            </div>

            <p className="mt-stack-lg text-center font-body-sm text-body-sm text-on-surface-variant">
              Don't have an account?
              <a href="/register" className="text-primary font-bold hover:underline ml-1">
                Register for free
              </a>
            </p>

          {/* Footer for Form Section */}
          <footer className="mt-auto pt-stack-xl flex flex-wrap justify-center gap-stack-md">
            <Link href="/privacy" className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/support" className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors">
              Contact Support
            </Link>
          </footer>
        </div>
      </section>
    </main>
  );
}
