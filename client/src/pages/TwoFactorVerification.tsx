import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "@/api/2FV";

export function TwoFactorVerification() {
  const [verifyOption, setVerifyOption] = useState<"sms" | "email">("sms");
  const navigate = useNavigate();

  const handleVerifyOptionChange = (option: "sms" | "email") => {
    setVerifyOption(option);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex flex-1 items-center justify-center py-12 px-4">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Two-Step Verification
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Choose how you'd like to receive your verification code.
              </p>
            </div>
            <div className="space-y-4">
              <label
                className="flex cursor-pointer items-center gap-4 rounded-md border-2 border-[#292938] bg-[#1a1a24] p-4 transition-all hover:border-[var(--primary-color)]  has-[:checked]:bg-blue-900/20"
                onClick={() => handleVerifyOptionChange("sms")}
              >
                <span className="material-symbols-outlined text-3xl text-gray-400">
                  sms
                </span>
                <div className="flex-grow">
                  <p className="font-semibold text-white">Text message</p>
                  <p className="text-sm text-gray-400">+1 (555) ••••-4567</p>
                </div>
                <input
                  checked={verifyOption === "sms"}
                  className="h-5 w-5 border-2 border-[#3c3c53] bg-transparent text-transparent checked:border-[var(--primary-color)] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[var(--primary-color)]"
                  name="verificationMethod"
                  type="radio"
                />
              </label>
              <label
                className="flex cursor-pointer items-center gap-4 rounded-md border-2 border-[#292938] bg-[#1a1a24] p-4 transition-all hover:border-[var(--primary-color)]  has-[:checked]:bg-blue-900/20"
                onClick={() => handleVerifyOptionChange("email")}
              >
                <span className="material-symbols-outlined text-3xl text-gray-400">
                  Email
                </span>
                <div className="flex-grow">
                  <p className="font-semibold text-white">Email</p>
                  <p className="text-sm text-gray-400">some••••@gmail.com</p>
                </div>
                <input
                  checked={verifyOption === "email"}
                  className="h-5 w-5 border-2 border-[#3c3c53] bg-transparent text-transparent checked:border-[var(--primary-color)] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[var(--primary-color)]"
                  name="verificationMethod"
                  type="radio"
                />
              </label>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <button
                className="w-full rounded-md py-3 px-4 text-sm font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 focus:ring-offset-[#111118] bg-secondary-background hover:cursor-pointer"
                onClick={() => {
                    if (verifyOption === "sms") {
                      return navigate(
                        `/two-steps-factor/verify-code-sms`
                      );
                    } else if (verifyOption === "email") {
                      sendOTP("calogerou1406@gmail.com");
                      return navigate(
                        `/two-steps-factor/verify-code-email`
                      );
                    }
                }}
              >
                Continue
              </button>
              <a
                className="text-sm font-medium text-gray-400 hover:text-white hover:underline"
              >
                Learn more about two-step verification
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
