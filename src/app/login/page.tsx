"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";

import { loginSchema, type LoginFormValues } from "@/validations/auth.schema";
import { useLogin } from "@/hooks/use-login";
import Button from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await loginMutation.mutateAsync(data);
      router.push("/");
    } catch {
      // Error handling is managed by React Query mutation / toast notifications
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-slate-200/50 sm:p-10">
        {/* Header / Brand */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block text-3xl font-black tracking-tight text-slate-900"
          >
            Tech<span className="text-blue-600">Nova</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to access your saved cart, orders & wishlist.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 ${
                  errors.email
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-blue-600 focus:ring-blue-100"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="••••••••"
                className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-11 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 ${
                  errors.password
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-blue-600 focus:ring-blue-100"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Logging in...
              </>
            ) : (
              <>
                Sign In <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Footer Link */}
        <div className="border-t border-gray-100 pt-6 text-center text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            href={ROUTES.REGISTER}
            className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}
