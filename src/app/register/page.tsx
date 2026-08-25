"use client";

import { useRegister } from "@/hooks/use-register";
import { RegisterFormValues, registerSchema } from "@/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const router = useRouter();
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
      // Error handled by useRegister
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">Create Account</h1>

        <p className="mt-2 text-gray-500">Create your TechNova account</p>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Name
            </label>

            <input
              id="name"
              type="text"
              {...register("name")}
              className="w-full rounded-lg border px-4 py-3 outline-none"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full rounded-lg border px-4 py-3 outline-none"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full rounded-lg border px-4 py-3 outline-none"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {registerMutation.isPending
              ? "Creating account..."
              : "Create Account"}
          </button>
        </form>
      </div>
    </main>
  );
}
