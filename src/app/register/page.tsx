"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock, Eye, EyeOff, Loader2, UserPlus } from "lucide-react";

import {
  registerSchema,
  type RegisterFormValues,
} from "@/validations/auth.schema";
import { useRegister } from "@/hooks/use-register";
import Button from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerMutation.mutateAsync(data);
      router.push("/login");
    } catch {
      // Error handled by useRegister mutation / toast notification
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-slate-200/50 sm:p-10">
        {/* Header / Brand Logo */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block text-3xl font-black tracking-tight text-slate-900"
          >
            Tech<span className="text-blue-600">Nova</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
            Create an Account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Join TechNova to start shopping the latest tech & accessories.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <User className="h-5 w-5" />
              </div>
              <input
                id="name"
                type="text"
                {...register("name")}
                placeholder="John Doe"
                className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 ${
                  errors.name
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-blue-600 focus:ring-blue-100"
                }`}
              />
            </div>
            {errors.name && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
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

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Password
            </label>
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

          {/* Submit Action */}
          <Button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {registerMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Creating account...
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" /> Create Account
              </>
            )}
          </Button>
        </form>

        {/* Footer Redirect */}
        <div className="border-t border-gray-100 pt-6 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
