import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../mode-toggle";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Heart, MessageCircleMore, ListTodo } from "lucide-react";
import { useAuth } from "@/store/authStore";
import { useEffect, useState } from "react";
import {
  getUserSettings,
  updateUserSettings,
  updateUserData,
} from "@/api/userSettings";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  UserSettingsGeneral,
  UserSettingsSecurity,
  UserSettingsPrivacity,
} from "@/types/userSettingsType";
import { TwoFactorModal } from "@/components/profile/TwoFactorModal";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function Settings() {
  const { user } = useAuth();
  const [recoveryEmail, setRecoveryEmail] = useState<boolean>(false);
  const [securityQuestions, setSecurityQuestions] = useState<boolean>(false);
  const [email, setEmail] = useState<boolean>(false);
  const [sms, setSms] = useState<boolean>(false);
  const [push, setPush] = useState<boolean>(false);
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);
  const navigate = useNavigate();

  // General Form
  const {
    handleSubmit: handleSumbitGeneral,
    register: registerGeneral,
    setValue: setValueGeneral,
  } = useForm<UserSettingsGeneral>();

  //Security Form
  const {
    handleSubmit: handleSumbitSecurity,
    register: registerSecurity,
    setValue: setValueSecurity,
  } = useForm<UserSettingsSecurity>();

  // Privacity Form
  const { handleSubmit: handleSumbitPrivacity, control: controlPrivacity } =
    useForm<UserSettingsPrivacity>();

  useEffect(() => {
    try {
      const fetchSettings = async () => {
        if (user) {
          const settings = (await getUserSettings(user._id)).data;
          if (settings) {
            setValueSecurity("recoveryEmail", settings.recoveryEmail);
            setValueSecurity(
              "securityQuestion1",
              settings.securityQuestions[0],
            );
            setValueSecurity(
              "securityQuestion2",
              settings.securityQuestions[1],
            );
            setValueSecurity(
              "securityQuestion3",
              settings.securityQuestions[2],
            );

            if (settings.recoveryEmail !== "") setRecoveryEmail(true);

            if (
              settings.securityQuestions[0] !== "" ||
              settings.securityQuestions[1] !== "" ||
              settings.securityQuestions[2] !== ""
            ) {
              setSecurityQuestions(true);
            }

            // Notifications
            setPush(settings.notificationPreferences.push);
            setEmail(settings.notificationPreferences.email);
            setSms(settings.notificationPreferences.sms);
          }
        }
      };
      fetchSettings();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setValueGeneral("name", user?.name);
      setValueGeneral("lastName", user?.lastName);
      setValueGeneral("email", user?.email);
    }
  }, [user]);

  if (!user) return <>Loading....</>;

  const onSubmitSecurity: SubmitHandler<UserSettingsSecurity> = async (
    data,
  ) => {
    try {
      toast.promise(
        updateUserSettings(user._id, {
          recoveryEmail: data.recoveryEmail,
          securityQuestions: [
            data.securityQuestion1,
            data.securityQuestion2,
            data.securityQuestion3,
          ],
        }),
        {
          loading: "Adding to cart...",
          success: "Settings saved successfully!",
          error: "Failed to add to cart",
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitGeneral: SubmitHandler<UserSettingsGeneral> = async (data) => {
    try {
      toast.promise(
        updateUserData(user._id, {
          name: data.name,
          lastName: data.lastName,
          bornDate: data.bornDate,
        }),
        {
          loading: "Adding to cart...",
          success: "User data updated Successfully!",
          error: "Failed to add to cart",
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitPrivacity: SubmitHandler<UserSettingsPrivacity> = async () => {
    try {
      toast.promise(
        updateUserSettings(user._id, {
          notificationPreferences: {
            push,
            email,
            sms,
          },
        }),
        {
          loading: "Adding to cart...",
          success: "Privacity preferences saved successfully!",
          error: "Failed to add to cart",
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeSecurityQuestionStatus = (checked: boolean) => {
    setSecurityQuestions(checked);
  };

  const onChangeRecoveryEmailStatus = (checked: boolean) => {
    setRecoveryEmail(checked);
  };

  const onChangeEmailStatus = (checked: boolean) => {
    setEmail(checked);
    console.log(checked);
  };

  const onChangeSmsStatus = (checked: boolean) => {
    setSms(checked);
  };

  const onChangePushStatus = (checked: boolean) => {
    setPush(checked);
  };

  return (
    <>
      <div className="p-4 md:h-[180vh] h-[230vh]">
        <h1 className="font-bold text-2xl">Settings Profile</h1>

        <div className="grid grid-cols-[repeat(5,1fr)] grid-rows-[repeat(4,1fr)] gap-2 h-full py-10 max-md:grid-cols-[repeat(2,1fr)] max-md:grid-rows-[repeat(3,1fr)]">
          {/* GENERAL */}
          <Card className="md:col-span-2 md:row-span-2">
            <CardHeader>
              <CardTitle>General</CardTitle>
              <CardDescription>
                Change your general data, like phone number, email, password,
                etc.
              </CardDescription>
              <CardAction>
                <Button variant="link" type="submit" form="generalForm">
                  Save
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <form
                id="generalForm"
                onSubmit={handleSumbitGeneral(onSubmitGeneral)}
              >
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Name - Second name"
                      {...registerGeneral("name", { required: true })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last-Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      {...registerGeneral("lastName", { required: true })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...registerGeneral("email", { required: true })}
                      required
                      readOnly
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="bornDate">Born Date</Label>
                    </div>
                    <Input
                      id="bornDate"
                      type="date"
                      {...registerGeneral("bornDate", { required: false })}
                    />
                  </div>
                </div>
                <Button variant="link">Reset Password</Button>
              </form>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card className="md:row-start-3 md:col-span-1">
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-around h-full">
              <MessageCircleMore
                size={70}
                className="hover:color-blue-500 hover:cursor-pointer"
              />
              <Button
                type="button"
                onClick={()=>{navigate("/profile/reviews")}}
                className="bg-transparent text-foreground border-b-1  hover:bg-secondary-background"
              >
                View All
              </Button>
            </CardContent>
          </Card>

          {/* Pending Reviews */}
          <Card className="md:row-start-3 md:col-start-2 md:col-span-1">
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-around h-full">
              <ListTodo
                size={70}
                className="hover:color-blue-500 hover:cursor-pointer"
              />
              <Button
                type="button"
                onClick={()=>{navigate("/profile/pending-reviews")}}
                className="bg-transparent text-foreground border-b-1  hover:bg-secondary-background"
              >
                View All
              </Button>
            </CardContent>
          </Card>

          {/* SECURITY */}
          <Card className="md:col-start-3 md:row-span-2 md:col-span-3 ">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Change the security options of the profile.
              </CardDescription>
              <CardAction>
                <Button variant="link" type="submit" form="securityForm">
                  Save
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 h-full">
              <form
                id="securityForm"
                onSubmit={handleSumbitSecurity(onSubmitSecurity)}
                className="flex flex-col justify-around h-full"
              >
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="airplane-mode">Two Factor Verification</Label>
                  <Button
                    variant="link"
                    type="button"
                    onClick={() => setIsTwoFactorModalOpen(true)}
                  >
                    Config
                  </Button>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="airplane-mode">Recovery email</Label>
                    <Switch
                      id="airplane-mode"
                      checked={recoveryEmail}
                      onCheckedChange={onChangeRecoveryEmailStatus}
                    />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="example@gmail.com"
                    {...registerSecurity("recoveryEmail", { required: true })}
                    disabled={!recoveryEmail}
                    required={recoveryEmail}
                  />
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="airplane-mode">Security Question</Label>
                    <Switch
                      id="airplane-mode"
                      checked={securityQuestions}
                      onCheckedChange={onChangeSecurityQuestionStatus}
                    />
                  </div>
                  <div className="h-full flex flex-col gap-5">
                    <Input
                      id="firstPet"
                      type="text"
                      placeholder="Your first pet name"
                      disabled={!securityQuestions}
                      {...registerSecurity("securityQuestion1", {
                        required: securityQuestions,
                      })}
                      required={securityQuestions}
                    />
                    <Input
                      id="motherMaiden"
                      type="text"
                      placeholder="Your mother's maiden name"
                      {...registerSecurity("securityQuestion2", {
                        required: securityQuestions,
                      })}
                      disabled={!securityQuestions}
                      required={securityQuestions}
                    />
                    <Input
                      id="birthCity"
                      type="text"
                      placeholder="Your birht city"
                      {...registerSecurity("securityQuestion3", {
                        required: securityQuestions,
                      })}
                      disabled={!securityQuestions}
                      required={securityQuestions}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* PRIVACITY */}
          <Card className="md:col-span-3 md:row-span-1 md:row-start-4">
            <CardHeader>
              <CardTitle>Privacity</CardTitle>
              <CardDescription>
                Change the privacity settings, like notifications.
              </CardDescription>
              <CardAction>
                <Button variant="link" type="submit" form="privacityForm">
                  Save
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <form
                id="privacityForm"
                className="flex flex-col gap-4"
                onSubmit={handleSumbitPrivacity(onSubmitPrivacity)}
              >
                <div className="w-full flex items-center justify-between ">
                  <Label>Push</Label>
                  <Controller
                    name="push"
                    control={controlPrivacity}
                    render={() => (
                      <Switch
                        checked={push}
                        onCheckedChange={onChangePushStatus}
                      />
                    )}
                  />
                </div>
                <div className="w-full flex items-center justify-between ">
                  <Label>Email</Label>
                  <Controller
                    name="email"
                    control={controlPrivacity}
                    render={() => (
                      <Switch
                        checked={email}
                        onCheckedChange={onChangeEmailStatus}
                      />
                    )}
                  />
                </div>
                <div className="w-full flex items-center justify-between ">
                  <Label>SMS</Label>
                  <Controller
                    name="sms"
                    control={controlPrivacity}
                    render={() => (
                      <Switch
                        checked={sms}
                        onCheckedChange={onChangeSmsStatus}
                      />
                    )}
                  />
                </div>
              </form>
            </CardContent>
          </Card>

          {/* LENGUAJE */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Lenguage</CardTitle>
              <CardDescription>Select the lenguage.</CardDescription>
              <CardAction>
                <Button variant="link">Learn more.</Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <h1>Country</h1>
            </CardContent>
            <CardFooter className="flex-col gap-2"></CardFooter>
          </Card>

          {/* THEME */}
          <Card className="">
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Change the website theme.</CardDescription>
              <CardAction>
                <Button variant="link">Learn more.</Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ModeToggle />
            </CardContent>
          </Card>

          {/* WISH PRODUCTS */}
          <Card className="md:col-span-3 md:col-start-4 md:row-span-1">
            <CardHeader>
              <CardTitle>Wish Products</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <Heart
                size={50}
                className="hover:color-red-500 hover:cursor-pointer"
              />
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Modal para configurar 2FA */}
      <TwoFactorModal
        isOpen={isTwoFactorModalOpen}
        onClose={() => setIsTwoFactorModalOpen(false)}
      />
    </>
  );
}
