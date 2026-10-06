"use client";

import { useState } from "react";
import { Eye, EyeOff, KeyRound, Lock } from "lucide-react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useChangePassword } from "@/hooks/auth/use-change-password";

import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "@/validations/change-password.validator";

export default function ChangePassword() {
  const changePasswordMutation = useChangePassword();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: ChangePasswordFormValues) => {
    changePasswordMutation.mutate(values, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-7">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <KeyRound className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900">
            Change Password
          </h2>

          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
            Update your password to keep your account secure.
          </p>
        </div>
      </div>

      {/* Success Message */}
      {changePasswordMutation.isSuccess && (
        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <p className="text-xs font-semibold text-green-700">
            Password changed successfully.
          </p>
        </div>
      )}

      {/* Error Message */}
      {changePasswordMutation.isError && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-xs font-semibold text-red-600">
            {changePasswordMutation.error instanceof Error
              ? changePasswordMutation.error.message
              : "Unable to change password."}
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        {/* Current Password */}
        <PasswordField
          label="Current Password"
          placeholder="Enter your current password"
          showPassword={showCurrentPassword}
          onToggle={() => setShowCurrentPassword((previous) => !previous)}
          registration={register("currentPassword")}
          error={errors.currentPassword?.message}
        />

        {/* New Password */}
        <PasswordField
          label="New Password"
          placeholder="Enter your new password"
          showPassword={showNewPassword}
          onToggle={() => setShowNewPassword((previous) => !previous)}
          registration={register("newPassword")}
          error={errors.newPassword?.message}
        />

        {/* Confirm Password */}
        <PasswordField
          label="Confirm New Password"
          placeholder="Confirm your new password"
          showPassword={showConfirmPassword}
          onToggle={() => setShowConfirmPassword((previous) => !previous)}
          registration={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        {/* Submit */}
        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={changePasswordMutation.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Lock className="h-4 w-4" />

            {changePasswordMutation.isPending
              ? "Changing..."
              : "Change Password"}
          </button>
        </div>
      </form>
    </section>
  );
}

interface PasswordFieldProps {
  label: string;
  placeholder: string;
  showPassword: boolean;
  onToggle: () => void;
  registration: UseFormRegisterReturn;
  error?: string;
}

function PasswordField({
  label,
  placeholder,
  showPassword,
  onToggle,
  registration,
  error,
}: PasswordFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <input
          {...registration}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          autoComplete="current-password"
          className={[
            "w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm text-slate-900 outline-none transition",
            "placeholder:text-slate-400",
            "focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
              : "border-slate-200",
          ].join(" ")}
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
          aria-label={showPassword ? `Hide ${label}` : `Show ${label}`}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}
