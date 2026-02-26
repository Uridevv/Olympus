import { RegisterForm } from "@/components/register-admin-form";

// import { useForm } from "react-hook-form";
// import { useAuth } from "../../store/authStore.ts";

// interface AdminAddUserFormValues {
//   email: string;
//   phoneNumber: number; // O number, según cómo lo manejes
//   name: string;
//   lastName: string;
//   password: string;
//   confirmPassword?: string;
//   role: "admin" | "manager";
// }

// export function AdminAddUser() {
  // const { signUpNewAdmin } = useAuth();
  

  // const {
  //   register,
  //   handleSubmit,
  // } = useForm<AdminAddUserFormValues>();

  // const onSubmit = handleSubmit(async (values) => {
  //   const { password, confirmPassword, phoneNumber } = values;
  //   if (password == confirmPassword) {
  //     delete values.confirmPassword;
  //     values.phoneNumber = parseInt(phoneNumber.toString());
  //     signUpNewAdmin(values);
  //     console.log(values);
  //   }
  // });

//   return (
//     <div className="h-full p-6">
//       <h1 className="text-2xl text-foreground font-bold mb-4">Add Admin User</h1>
//       <form
//         className="flex flex-col rounded-lg p-4 bg-transparent backdrop-blur-[200px] border-1 border-gray-700 gap-7"
//         onSubmit={onSubmit}
//       >
//         <input
//           type="email"
//           className="border-b-1 border-gray-600 outline-0"
//           placeholder="Ingresa tu correo electronico"
//           {...register("email", { required: true })}
//         />
//         <input
//           type="tel"
//           placeholder="Ingresa tu numero de telefono"
//           className="border-b-1 border-gray-600 outline-0"
//           {...register("phoneNumber", { required: true })}
//         />
//         <input
//           type="text"
//           className="border-b-1 border-gray-600 outline-0"
//           placeholder="Ingresa tu nombre"
//           {...register("name", { required: true })}
//         />
//         <input
//           type="text"
//           className="border-b-1 border-gray-600 outline-0"
//           placeholder="Ingresa tus apelidos"
//           {...register("lastName", { required: true })}
//         />
//         <input
//           type="password"
//           className="border-b-1 border-gray-600 outline-0"
//           placeholder="Contraseña"
//           {...register("password", { required: true })}
//         />
//         <input
//           type="password"
//           className="border-b-1 border-gray-600 outline-0"
//           placeholder="Confirma tu contraseña"
//           {...register("confirmPassword", { required: true })}
//         />
//         <select
//           className="border-b-1 border-gray-600 outline-0 backdrop-blur-[400px] bg-transparent"
//           {...register("role", { required: true })}
//         >
//           <option value="admin" className="bg-background text-foreground">Admin</option>
//           <option value="manager" className="bg-background text-foreground">Manager</option>
//         </select>
//         <button className="principal-btn" type="submit">
//           Confirmar
//         </button>
//       </form>
//     </div>
//   );
// }

export function AdminAddUser() {
  return <div className="p-6">
    <RegisterForm/>
  </div>;
}
