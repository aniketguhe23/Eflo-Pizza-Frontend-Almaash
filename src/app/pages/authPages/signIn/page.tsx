"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile: string;
  birthDate: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen bg-[#ED722E] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl space-y-6">
        {/* Robot Mascot */}
        <div className="flex justify-center items-center">
          <Image
            src={"/elephant.png"}
            alt="Elfo's Pizza Logo"
            width={200}
            height={200}
            className="w-50 h-50"
          />
        </div>

        <h1 className="text-white text-3xl font-bold text-center tracking-wider [font-family:'Barlow_Condensed',Helvetica]">
          CREATE AN ACCOUNT
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <div className="space-y-1">
            <label htmlFor="firstName" className=" text-sm font-bold">
              First Name
            </label>
            <input
              id="firstName"
              {...register("firstName", { required: "First name is required" })}
              placeholder="Enter your Name"
              className="w-full p-2 rounded bg-white text-gray-600 placeholder:text-gray-400"
            />
            {errors.firstName && (
              <p className="text-red-100 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-1">
            <label htmlFor="lastName" className=" text-sm font-bold">
              Last Name
            </label>
            <input
              id="lastName"
              {...register("lastName", { required: "Last name is required" })}
              placeholder="Enter your Last Name"
              className="w-full p-2 rounded bg-white text-gray-600 placeholder:text-gray-400"
            />
            {errors.lastName && (
              <p className="text-red-100 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className=" text-sm font-bold">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              placeholder="Enter your Email"
              className="w-full p-2 rounded bg-white text-gray-600 placeholder:text-gray-400"
            />
            {errors.email && (
              <p className="text-red-100 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="password" className=" text-sm font-bold">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              placeholder="Enter your Password"
              className="w-full p-2 rounded bg-white text-gray-600 placeholder:text-gray-400"
            />
            <p className=" text-xs leading-relaxed">
              Create a password with these
              <br />
              Requirements: 123@#$
              <br />
              ABC: Characters
            </p>
            {errors.password && (
              <p className="text-red-100 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="space-y-1">
            <label htmlFor="mobile" className=" text-sm font-bold">
              Mobile Number
            </label>
            <input
              id="mobile"
              type="tel"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit number",
                },
              })}
              placeholder="Enter your Number"
              className="w-full p-2 rounded bg-white text-gray-600 placeholder:text-gray-400"
            />
            <p className=" text-xs leading-relaxed">
              Enter a valid mobile number that can accept SMS messages.
              <br />
              This will be used for two-step verification for account access,
              and for order-related notifications.
            </p>
            {errors.mobile && (
              <p className="text-red-100 text-sm">{errors.mobile.message}</p>
            )}
          </div>

          {/* Birth Date */}
          <div className="space-y-1">
            <label htmlFor="birthDate" className=" text-sm font-bold">
              Your Birth Date
            </label>
            <input
              id="birthDate"
              type="date"
              {...register("birthDate", { required: "Birth date is required" })}
              className="w-full p-2 rounded bg-white text-gray-600"
            />
            <p className=" text-xs">
              Double check your birth date is entered correctly, you won't be
              able to change later.
            </p>
            {errors.birthDate && (
              <p className="text-red-100 text-sm">{errors.birthDate.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className=" bg-black hover:bg-gray-900  text-white font-bold py-3 px-50 mt-6 rounded cursor-pointer [font-family:'Barlow_Condensed',Helvetica] text-2xl"
            >
              CREATE AN ACCOUNT
            </button>
          </div>
        </form>

        {/* Sign In Link */}
        <div className="text-center pt-4 [font-family:'Barlow_Condensed',Helvetica] flex justify-between px-20">
          <span className=" text-2xl font-bold cursor-pointer hover:underline">
            ALREADY A MEMBER?{" "}
          </span>
          <button className="text-white text-2xl font-bold underline hover:no-underline cursor-pointer">
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
}
