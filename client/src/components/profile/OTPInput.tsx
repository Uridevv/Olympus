import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dispatch, SetStateAction } from "react";
import { verifyOTP } from "@/api/2FV";
import { sendOTP } from "@/api/2FV";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function InputOTPForm({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<"intro" | "otp" | "end">>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await verifyOTP("calogerou1406@gmail.com", data.pin);
    console.log(res);
    setStep("end");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 h-full flex flex-col justify-around"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription className="mt-5">
                Please enter the one-time password sent to your email. If you
                didn´t receive an email, please click on{" "}
                <span className="text-sky-800 hover:cursor-pointer" onClick={()=>{
                  sendOTP("calogerou1406@gmail.com")
                }}>
                  Resend Email
                </span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex justify-around">
          <Button variant="outline" onClick={() => setStep("intro")}>
            ⬅ Regresar
          </Button>

          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
