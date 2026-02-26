import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";

export function VerifySmsLogin() {
  const [value, setValue] = useState("");

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <main className="flex flex-1 items-center justify-center p-4">
          <div className="w-full max-w-md mx-auto">
            <div className="bg-secondary-background p-8 rounded-xl shadow-lg">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Ingresa el código de verificación
                </h2>
                <p className="mt-3 text-[#9d9db8]">
                  Hemos enviado un código de 6 dígitos a tu número de teléfono.
                </p>
              </div>
              <form className="mt-8">
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
                </div>{" "}
                <div className="mt-6 text-center">
                  <p className="text-sm text-[#9d9db8]">
                    ¿No recibiste el código?
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-400">Reenviar en </span>
                    <span className="font-semibold text-white">00:59</span>
                  </div>
                </div>
                <div className="mt-8">
                  <button
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#1919e6] hover:bg-[#1515c4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a23] focus:ring-[#1919e6] transition-colors hover:cursor-pointer"
                    type="button"
                  >
                    Verificar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
