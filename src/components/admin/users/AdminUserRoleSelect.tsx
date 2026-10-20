"use client";

import { useState } from "react";
import { X, AlertTriangle, Loader2 } from "lucide-react";

import { useUpdateAdminUserRole } from "@/hooks/admin/useAdminUsers";
import type { AdminUserRole } from "@/types/admin-user.types";

interface AdminUserRoleSelectProps {
  userId: string;
  userName: string;
  currentRole: AdminUserRole;
}

export default function AdminUserRoleSelect({
  userId,
  userName,
  currentRole,
}: AdminUserRoleSelectProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AdminUserRole>(currentRole);
  const [pendingRole, setPendingRole] = useState<AdminUserRole | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const updateRole = useUpdateAdminUserRole();

  const handleChange = (role: AdminUserRole) => {
    if (role === currentRole) return;

    setSelectedRole(role);
    setPendingRole(role);
    setErrorMessage("");
    updateRole.reset();
    setIsConfirmOpen(true);
  };

  const handleCancel = () => {
    setSelectedRole(currentRole);
    setPendingRole(null);
    setIsConfirmOpen(false);
  };

  const handleConfirm = async () => {
    if (!pendingRole) return;

    setErrorMessage("");

    try {
      await updateRole.mutateAsync({
        userId,
        payload: { role: pendingRole },
      });

      setIsConfirmOpen(false);
      setPendingRole(null);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to update user role.",
      );
      setSelectedRole(currentRole);
      setPendingRole(null);
      setIsConfirmOpen(false);
    }
  };

  return (
    <div className="inline-block">
      <select
        aria-label={`Change role for ${userName}`}
        value={isConfirmOpen ? selectedRole : currentRole}
        onChange={(event) => handleChange(event.target.value as AdminUserRole)}
        disabled={updateRole.isPending}
        className={`rounded-2xl border px-3 py-2 text-xs font-bold outline-none transition focus:ring-1 focus:ring-slate-900 disabled:cursor-not-allowed disabled:opacity-50 ${
          currentRole === "ADMIN"
            ? "border-purple-200 bg-purple-50 text-purple-700"
            : "border-slate-200 bg-slate-50 text-slate-700"
        }`}
      >
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
      </select>

      {updateRole.isPending && (
        <p className="mt-1 text-[11px] font-bold text-blue-600">Updating...</p>
      )}

      {errorMessage && (
        <p
          role="alert"
          className="mt-1 max-w-40 text-[11px] font-bold text-rose-600"
        >
          {errorMessage}
        </p>
      )}

      {isConfirmOpen && pendingRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={handleCancel}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-role-dialog-title"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCancel}
              disabled={updateRole.isPending}
              className="absolute right-4 top-4 rounded-xl p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 shadow-xs">
                <AlertTriangle className="h-7 w-7" />
              </div>

              <h3
                id="user-role-dialog-title"
                className="text-lg font-bold text-slate-900"
              >
                Confirm Role Change
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Change <strong className="text-slate-900">{userName}</strong>
                &apos;s role from{" "}
                <span className="font-bold text-slate-700">
                  {currentRole}
                </span>{" "}
                to{" "}
                <span className="font-extrabold text-purple-600">
                  {pendingRole}
                </span>
                ?
              </p>

              <p className="mt-2 rounded-xl bg-amber-50 border border-amber-200/60 p-2 text-[11px] font-bold text-amber-800 w-full">
                Warning: This change affects the user&apos;s access permissions.
              </p>

              <div className="mt-6 flex w-full flex-col-reverse gap-2.5 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={updateRole.isPending}
                  className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-4 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50 sm:w-1/2"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={updateRole.isPending}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 text-xs font-bold text-white shadow-md shadow-slate-900/20 transition hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-1/2"
                >
                  {updateRole.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Confirm Role</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
