import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Phone,
  Search,
  ShieldCheck,
  UserPlus,
  Wrench,
  User,
  LayoutDashboard,
  AlertCircle,
  Package,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import workshopImage from "@/assets/workshop.jpg";

const API_BASE_URL = "http://localhost:8000/api";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Account - Fixora Repair" },
      {
        name: "description",
        content: "Track your repairs and manage your account.",
      },
    ],
  }),
  component: ProfilePage,
});

const fieldClass =
  "mt-2 h-12 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/50 px-4 shadow-none focus-visible:ring-[#0095ff] focus-visible:border-[#0095ff] dark:text-white";

function ProfilePage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showSignupPw, setShowSignupPw] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    const adminToken = localStorage.getItem("admin_token");

    if (adminToken) {
      setLoggedIn(true);
      setUser({ name: "Admin" });
    } else if (token) {
      setLoggedIn(true);
      // Ideally fetch user profile here. For now just set state.
      setUser({ name: "Customer" });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setLoggedIn(false);
    setUser(null);
      // notify the rest of the app that the user signed out
      window.dispatchEvent(new CustomEvent("auth-change", { detail: { type: "logout" } }));
  };

  return (
    <Layout>
      <div className="relative min-h-screen bg-[#F5F1ED] dark:bg-transparent section-frost dark:section-frost">
        <div className="pointer-events-none absolute inset-0 z-0 dark:opacity-0" style={{ backgroundColor: "#F5F1ED" }}></div>
        <div className="relative z-10">
          <div className="min-h-[90vh] bg-[#f8fafc] dark:bg-transparent pt-24 pb-16">
            <div className="mx-auto max-w-7xl px-4">
          {loggedIn ? (
            <SignedInDashboard onSignOut={handleSignOut} user={user} />
          ) : (
            <AuthPanel
              mode={mode}
              setMode={setMode}
              showPw={showPw}
              setShowPw={setShowPw}
              showSignupPw={showSignupPw}
              setShowSignupPw={setShowSignupPw}
              onLoginSuccess={() => setLoggedIn(true)}
              router={router}
            />
          )}
        </div>
      </div>
    </div>
    </div>
    </Layout>
  );
}

function AuthPanel({
  mode,
  setMode,
  showPw,
  setShowPw,
  showSignupPw,
  setShowSignupPw,
  onLoginSuccess,
  router,
}: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);

  const handleGoogleSignIn = async () => {
    // Load Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // @ts-ignore
      if (window.google) {
        // @ts-ignore
        window.google.accounts.id.initialize({
          client_id: "188732714901-pehr1igg8nhldbkrevi0fd0683n1ihkd.apps.googleusercontent.com",
          callback: handleGoogleCredentialResponse,
          auto_select: false,
        });
        // @ts-ignore
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed()) {
            console.error('Google Sign-In not displayed');
          }
        });
      }
    };
    document.head.appendChild(script);
  };

  const handleGoogleCredentialResponse = async (response: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/profile";
      } else {
        setError(data.message || "Google Sign-In failed");
      }
    } catch {
      setError("Could not connect to backend for Google Sign-In");
    }
  };

  const getErrorMessage = (data: any, defaultMsg: string) => {
    if (data.message) return data.message;
    if (data.detail) {
      if (typeof data.detail === "string") return data.detail;
      if (Array.isArray(data.detail) && data.detail.length > 0) {
        return data.detail[0].msg || defaultMsg;
      }
    }
    return defaultMsg;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.user.role === "admin" || data.user.role === "technician") {
          localStorage.setItem("admin_token", data.token);
          localStorage.setItem("admin_user", JSON.stringify(data.user));
          router.navigate({ to: "/admin" });
            // notify header and other components about auth change
            window.dispatchEvent(new CustomEvent("auth-change", { detail: { type: "login", role: data.user.role } }));
        } else {
          localStorage.setItem("user_token", data.token);
          onLoginSuccess();
            window.dispatchEvent(new CustomEvent("auth-change", { detail: { type: "login", role: "user" } }));
        }
      } else {
        setError(getErrorMessage(data, "Invalid credentials."));
      }
    } catch {
      setError("Could not reach backend.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp_code: otp }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("user_token", data.token);
        onLoginSuccess();
        window.dispatchEvent(new CustomEvent("auth-change", { detail: { type: "login", role: "user" } }));
      } else {
        setError(getErrorMessage(data, "Invalid OTP."));
      }
    } catch {
      setError("Could not reach backend.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Phone validation
    const phoneRegex = /^(\+44|0)[1-9]\d{8,9}$/;
    if (phone && !phoneRegex.test(phone.replace(/\s/g, ""))) {
      setError("Please enter a valid UK phone number (e.g., 07415 278767 or +447415278767)");
      return;
    }
    
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          phone: phone || undefined,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage("OTP sent! Please check your email.");
        setError("");
        setShowOtp(true);
      } else {
        setError(getErrorMessage(data, "Failed to create account."));
      }
    } catch {
      setError("Could not reach backend.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage("Password reset OTP sent! Please check your email.");
        setIsResetMode(true);
      } else {
        setError(getErrorMessage(data, "Failed to send reset email."));
      }
    } catch {
      setError("Could not reach backend.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp_code: otp, new_password: password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage("Password reset successfully. You can now log in.");
        setMode("login");
        setIsResetMode(false);
        setOtp("");
        setPassword("");
      } else {
        setError(getErrorMessage(data, "Failed to reset password."));
      }
    } catch {
      setError("Could not reach backend.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setError("Please enter your email address first.");
      return;
    }
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(data.message);
        setShowOtp(true);
        setMode("login");
      } else {
        setError(getErrorMessage(data, "Failed to resend verification."));
      }
    } catch {
      setError("Could not reach backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-2xl shadow-slate-200/50 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 p-8 md:p-12">
        <div className="mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#e0f2fe] dark:bg-slate-800 text-[#0056b3] dark:text-sky-400 mb-6">
            <User className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            {mode === "login" ? "Welcome back" : mode === "signup" ? "Create an account" : "Reset Password"}
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {mode === "login"
              ? "Sign in to track repairs and manage your devices."
              : mode === "signup"
              ? "Register to keep all your repair history in one place."
              : "Enter your email to receive a password reset OTP."}
          </p>
        </div>

        <div className="mb-8 flex rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-1">
          <button
            onClick={() => {
              setMode("login");
              setSuccessMessage("");
              setError("");
            }}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
              mode === "login"
                ? "bg-white dark:bg-slate-800 text-[#0056b3] dark:text-sky-300 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setMode("signup");
              setSuccessMessage("");
              setError("");
            }}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
              mode === "signup"
                ? "bg-white dark:bg-slate-800 text-[#059669] dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {successMessage && (
          <div className="mb-6 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-700">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg bg-rose-50 p-3 text-sm font-medium text-rose-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {mode === "forgot" ? (
          isResetMode ? (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Enter OTP</Label>
                <Input
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="6-digit code"
                  className={fieldClass}
                />
                <p className="mt-2 text-sm text-slate-500">We've sent a verification code to {email}.</p>
              </div>
              <div>
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-[22px] h-4 w-4 text-slate-400" />
                  <Input
                    type={showPw ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className={`${fieldClass} pl-11 pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-4 top-[22px] text-slate-400 hover:text-slate-600"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full rounded-lg bg-[#0095ff] text-white shadow-md shadow-[#0095ff]/20 hover:bg-[#0078d4]"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
              <button
                type="button"
                onClick={() => setMode("login")}
                className="mt-4 w-full text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Back to sign in
              </button>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-5">
              <div>
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-[22px] h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`${fieldClass} pl-11`}
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full rounded-lg bg-[#0095ff] text-white shadow-md shadow-[#0095ff]/20 hover:bg-[#0078d4]"
              >
                {isLoading ? "Sending..." : "Send Reset OTP"}
              </Button>
              <button
                type="button"
                onClick={() => setMode("login")}
                className="mt-4 w-full text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Back to sign in
              </button>
            </form>
          )
        ) : showOtp ? (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Enter OTP</Label>
              <Input
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                className={fieldClass}
              />
              <p className="mt-2 text-sm text-slate-500">We've sent a verification code to {email}.</p>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-lg bg-[#0095ff] text-white shadow-md shadow-[#0095ff]/20 hover:bg-[#0078d4]"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
            <button
              type="button"
              onClick={() => setShowOtp(false)}
              className="mt-4 w-full text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Back to sign up
            </button>
          </form>
        ) : mode === "login" ? (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-[22px] h-4 w-4 text-slate-400" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`${fieldClass} pl-11`}
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-[22px] h-4 w-4 text-slate-400" />
                <Input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`${fieldClass} pl-11 pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-[22px] text-slate-400 hover:text-slate-600"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#0095ff] focus:ring-[#0095ff]" />
                Remember me
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-sm font-medium text-[#0095ff] hover:underline"
                >
                  Forgot password?
                </button>
                {error && error.includes("not verified") && (
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    className="text-sm font-medium text-[#0095ff] hover:underline"
                  >
                    Resend verification
                  </button>
                )}
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-lg bg-[#0095ff] text-white shadow-md shadow-[#0095ff]/20 hover:bg-[#0078d4]"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">Or continue with</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="h-12 w-full rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
              onClick={handleGoogleSignIn}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</Label>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className={fieldClass}
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone</Label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+447415278767"
                  pattern="^\+[1-9]\d{6,14}$"
                  className={fieldClass}
                />
                <p className="mt-2 text-sm text-slate-500">International format required (e.g. +44...). Optional.</p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-[22px] h-4 w-4 text-slate-400" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`${fieldClass} pl-11`}
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-[22px] h-4 w-4 text-slate-400" />
                <Input
                  type={showSignupPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className={`${fieldClass} pl-11 pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPw(!showSignupPw)}
                  className="absolute right-4 top-[22px] text-slate-400 hover:text-slate-600"
                >
                  {showSignupPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-lg bg-[#10b981] text-white shadow-md shadow-[#10b981]/20 hover:bg-[#059669]"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">Or continue with</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="h-12 w-full rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
              onClick={handleGoogleSignIn}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
          </form>
        )}
      </div>
      <div className="hidden lg:block lg:w-1/2 relative bg-slate-900">
        <img
          src={workshopImage}
          alt="Workshop"
          className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#059669]/80 to-[#064e3b]/90" />
        <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
          <ShieldCheck className="h-12 w-12 text-[#86efac] mb-6" />
          <h3 className="text-3xl font-bold mb-4">Secure & Transparent</h3>
          <p className="text-slate-100 text-lg mb-8 leading-relaxed">
            Access live updates on your repairs, view your history, and manage your warranties easily.
          </p>
          <ul className="space-y-4">
            {["Real-time status tracking", "Digital receipts & warranties", "Priority support"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#86efac]/30">
                  <CheckCircle2 className="h-4 w-4 text-[#dcfce7]" />
                </div>
                <span className="font-medium text-slate-100">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SignedInDashboard({ onSignOut, user }: { onSignOut: () => void, user: any }) {
  const [trackingIdInput, setTrackingIdInput] = useState("");
  const [repairData, setRepairData] = useState<any>(null);
  const [myRepairs, setMyRepairs] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchMyRepairs = async () => {
      const token = localStorage.getItem("user_token") || localStorage.getItem("admin_token");
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE_URL}/repairs/my`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && data.repairs) {
          setMyRepairs(data.repairs);
          if (data.repairs.length > 0) {
            // Check if backend returned full data or just summary. We might need to map progress_percentage.
            // But we can just use the first one as current focus.
            setRepairData(data.repairs[0]);
          }
        }
      } catch (err) {}
    };
    fetchMyRepairs();
  }, []);

  const fetchTracking = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!trackingIdInput) return;
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:8000/api/repairs/track/${trackingIdInput}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setRepairData(data.data);
      } else {
        setError(data.message || "Invalid tracking ID");
      }
    } catch (err) {
      setError("Failed to connect to server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("user_token") || localStorage.getItem("admin_token");
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "DELETE",
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      if (res.ok) {
        localStorage.removeItem("user_token");
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
        window.dispatchEvent(new CustomEvent("auth-change", { detail: { type: "logout" } }));
        await router.navigate({ to: "/" });
      } else {
        alert("Failed to delete account. Please try again.");
      }
    } catch (err) {
      alert("Error deleting account. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };




  const timeline = [
    { step: "Received", text: "Device checked in.", active: true },
    { step: "Diagnosed", text: "Fault confirmed.", active: false },
    { step: "Repairing", text: "Work in progress.", active: false },
    { step: "Testing", text: "Final quality checks.", active: false },
    { step: "Collection", text: "Ready for pickup.", active: false },
  ];

  const currentTimeline = timeline.map((t) => {
    const backendStatusIdx = [
      "received",
      "diagnosed",
      "repairing",
      "testing",
      "collection",
    ].indexOf(repairData?.status || "received");
    const timelineIdx = timeline.findIndex((x) => x.step === t.step);
    return { ...t, active: timelineIdx <= backendStatusIdx };
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white dark:bg-slate-900/80 p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-[#e0f2fe] dark:bg-slate-800 flex items-center justify-center text-[#0095ff] dark:text-sky-400 text-2xl font-bold">
            {user?.name?.charAt(0) || "C"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hello, {user?.name || "Customer"}</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your devices and track repairs.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={onSignOut} variant="outline" className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 gap-2">
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
          <Button onClick={() => setShowDeleteConfirm(true)} variant="outline" className="border-rose-300 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 bg-white dark:bg-slate-900 gap-2">
            Delete Account
          </Button>
        </div>

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-6 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-950/40 flex items-center justify-center text-rose-600 dark:text-rose-400">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete Account?</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">This action cannot be undone. All your data will be permanently deleted.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowDeleteConfirm(false)} 
                  variant="outline"
                  className="flex-1"
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleDeleteAccount} 
                  disabled={isDeleting}
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-[#0095ff] dark:text-sky-400">
              <Search className="h-5 w-5" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Track Repair</h2>
            </div>
            <form onSubmit={fetchTracking} className="space-y-4">
              <Input
                placeholder="Enter Tracking ID (e.g. REP-...)"
                value={trackingIdInput}
                onChange={(e) => setTrackingIdInput(e.target.value)}
                className="h-12 border-[#0095ff]/60 dark:border-slate-700 bg-[#f0f9ff]/30 dark:bg-slate-900/50 px-4 shadow-none focus-visible:ring-[#0095ff] dark:text-white"
              />
              <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl bg-[#0095ff] hover:bg-[#0078d4] text-white font-semibold">
                {isLoading ? "Searching..." : "Track Now"}
              </Button>
              {error && <p className="text-sm text-rose-600 font-medium">{error}</p>}
            </form>
          </Card>

          <Card className="p-6 rounded-2xl border-slate-200 dark:border-slate-800 shadow-sm bg-gradient-to-br from-[#f0f9ff] via-[#dbeafe] to-[#f8fbff] dark:from-slate-900/80 dark:via-slate-900/70 dark:to-slate-950/85 text-slate-950 dark:text-white max-h-[300px] overflow-y-auto">
            <Package className="h-8 w-8 mb-4 text-[#0095ff] dark:text-sky-400" />
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Your Repairs</h3>
            {myRepairs.length > 0 ? (
              <div className="space-y-3">
                {myRepairs.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => setRepairData(r)}
                    className={`w-full text-left p-3 rounded-xl border transition-colors ${
                      repairData?.tracking_id === r.tracking_id
                        ? "border-[#0095ff] bg-white dark:bg-slate-800"
                        : "border-transparent bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{r.device_model}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex justify-between">
                      <span>{r.tracking_id}</span>
                      <span className="capitalize">{r.status}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">No past repairs found.</p>
            )}
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Current Status</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {repairData ? `Tracking ID: ${repairData.tracking_id} (${repairData.device_model})` : "Enter a tracking ID to see live updates."}
              </p>
            </div>
            <div className="p-6">
              {repairData ? (
                <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-4 space-y-8 pb-4">
                  {currentTimeline.map((item, idx) => (
                    <div key={item.step} className="relative pl-8">
                      <div className={`absolute -left-[11px] top-1 h-5 w-5 rounded-full border-4 border-white dark:border-slate-900 ${item.active ? "bg-[#0095ff]" : "bg-slate-200 dark:bg-slate-700"}`} />
                      <h4 className={`font-bold ${item.active ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"}`}>{item.step}</h4>
                      <p className={`text-sm mt-1 ${item.active ? "text-slate-600 dark:text-slate-300" : "text-slate-400 dark:text-slate-500"}`}>
                        {item.active && item.step.toLowerCase() === repairData.status.toLowerCase() && repairData.status_notes ? repairData.status_notes : item.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4">
                    <Activity className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">No active repair selected</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-2">Use the tracking form to check the status of your device.</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Simple icon for placeholder
function Activity(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
