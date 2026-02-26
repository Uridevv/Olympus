import { useEffect, useState } from "react";
import { Modal } from "@/components/profile/Modal";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { InputOTPForm } from "@/components/profile/OTPInput";
import { sendOTP } from "@/api/2FV";
import introSvg from "@/assets/svg/undraw_authentication_tbfc.svg";
import otpSvg from "@/assets/svg/undraw_message-sent_785q.svg";
import endSvg from "@/assets/svg/undraw_switches_atb7.svg";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { getUserSettings, updateUserSettings } from "@/api/userSettings";
import { useAuth } from "@/store/authStore";
import { toast } from "sonner";

export function TwoFactorModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"intro" | "otp" | "end">("intro");
  const [twoFA, setTwoFA] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchUserSettings() {
      try {
        if (user) {
          const settings = (await getUserSettings(user._id)).data;
          setTwoFA(settings.twoFactorAuth);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserSettings();
  }, []);

  const variants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  const handleCheckedChange = (checked: boolean) => {
    setTwoFA(checked);
  };

  if (!user) {
    return <>loading...</>;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Two Factor Verification">
      <div className="relative overflow-hidden h-full">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className="h-full space-y-4 flex justify-around"
            >
              <div className="h-full w-2/5">
                <img
                  src={introSvg}
                  alt=""
                  className="object-cover w-full rounded-lg h-full"
                />
              </div>
              <div className="h-full w-2/5 flex flex-col justify-between">
                <div>
                  <p className="mb-5">
                    Protege tus datos en todo momento activando la verificación
                    en dos pasos. Cada vez que quieras ingresar a tu cuenta se
                    enviará un correo con un código que necesitarás para poder
                    ingresar.
                  </p>
                  <p className="font-bold">
                    Presiona continuar para enviar un correo a tu cuenta y
                    activar la verificación en dos pasos.
                  </p>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => {
                      sendOTP("calogerou1406@gmail.com");
                      setStep("otp");
                    }}
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div
              key="otp"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className="space-y-4 flex justify-between h-full"
            >
              <div className="h-full w-7/15">
                <img src={otpSvg} alt="h-full w-full object-cover rounded-lg" />
              </div>
              <div className="h-full w-7/15">
                <InputOTPForm setStep={setStep} />
              </div>
            </motion.div>
          )}

          {step === "end" && (
            <motion.div
              key="otp"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className="space-y-4 h-full w-full flex justify-between"
            >
              <div className="h-full w-7/15">
                <img
                  src={endSvg}
                  alt=""
                  className="h-full w-full object-contain rounded-lg"
                />
              </div>

              <div className="h-full w-1/2 flex flex-col justify-between">
                <div className="flex justify-around mb-5">
                  <Label>Two Factor Auth</Label>
                  <Switch
                    checked={twoFA}
                    onCheckedChange={handleCheckedChange}
                  />
                </div>

                <div className="w-full flex justify-around mt-5">
                  <Button
                    variant="outline"
                    onClick={() => {
                      onClose();
                      setStep("intro");
                    }}
                  >
                    CLose
                  </Button>
                  <Button
                    variant="outline"
                    onClick={async () => {
                      toast.promise(updateUserSettings(user?._id, {
                        twoFactorAuth: twoFA,
                      }),{
                        loading:"Turning on two factor auth.",
                        success:"Two factor auth updated successfully.",
                        error:"Sorry, something went wrong."
                      });
                    }}
                  >
                    Done
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}
