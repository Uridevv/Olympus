import { useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useAuth } from "@/store/authStore";

export function VerifyEmailLogin() {
  const { verifyOtpLogin, tempToken } = useAuth();
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (tempToken && value) {
       e.preventDefault();
      const res = await verifyOtpLogin({ otp: value, tempToken });
      if (res?.message === "success") {
        navigate("/two-steps-factor/success");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <span className="material-symbols-outlined text-5xl text-[var(--primary-color)]">
                Olympus
              </span>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight">
                Ingresa el código de verificación
              </h2>
              <p className="mt-2 text-[var(--subtle-text-color)]">
                Hemos enviado un código de verificación a tu correo electrónico.
              </p>
            </div>
            <form onSubmit={onHandleSubmit} className="mt-8 space-y-6">
              <div className="space-y-2">
                <InputOTP
                  maxLength={6}
                  value={value}
                  onChange={(value) => setValue(value)}
                >
                  <InputOTPGroup className="w-full justify-center gap-2 sm:gap-4">
                    <InputOTPSlot
                      index={0}
                      className="h-14 w-12 rounded-md border border-[var(--border-color)] bg-[var(--surface-color)] text-center text-2xl font-bold focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                    <InputOTPSlot
                      index={1}
                      className="h-14 w-12 rounded-md border border-[var(--border-color)] bg-[var(--surface-color)] text-center text-2xl font-bold focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                    <InputOTPSlot
                      index={2}
                      className="h-14 w-12 rounded-md border border-[var(--border-color)] bg-[var(--surface-color)] text-center text-2xl font-bold focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                    <InputOTPSlot
                      index={3}
                      className="h-14 w-12 rounded-md border border-[var(--border-color)] bg-[var(--surface-color)] text-center text-2xl font-bold focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                    <InputOTPSlot
                      index={4}
                      className="h-14 w-12 rounded-md border border-[var(--border-color)] bg-[var(--surface-color)] text-center text-2xl font-bold focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                    <InputOTPSlot
                      index={5}
                      className="h-14 w-12 rounded-md border border-[var(--border-color)] bg-[var(--surface-color)] text-center text-2xl font-bold focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                  </InputOTPGroup>
                </InputOTP>
                <div className="text-center text-sm">
                  {value === "" ? (
                    <>Enter your one-time password.</>
                  ) : (
                    <>You entered: {value}</>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 pt-4 text-center">
                <p className="text-[var(--subtle-text-color)]">
                  El código expira en:
                </p>
                <div className="flex items-baseline font-mono text-lg font-bold">
                  <span className="w-6" id="minutes">
                    04
                  </span>
                  <span>:</span>
                  <span className="w-6" id="seconds">
                    59
                  </span>
                </div>
              </div>
              <div>
                <button
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#1919e6] hover:bg-[#1515c4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a23] focus:ring-[#1919e6] transition-colors hover:cursor-pointer"
                  type="submit"
                >
                  Verificar
                </button>
              </div>
              <div className="text-center text-sm">
                <p className="text-[var(--subtle-text-color)]">
                  ¿No recibiste el código?
                  <a className="font-medium text-[var(--primary-color)] hover:text-opacity-80">
                    Reenviar
                  </a>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
