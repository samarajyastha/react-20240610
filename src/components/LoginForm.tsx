import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../constants/regex";
import { Link } from "react-router-dom";

type LoginFormType = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm<LoginFormType>({
    mode: "all",
  });

  const { errors } = formState;

  const onSubmit = (data: LoginFormType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="py-2">
        <label htmlFor="email" className="ml-2 text-sm font-semibold">
          Email
        </label>
        <input
          className="w-full border rounded-md py-2 px-3 mt-3"
          type="email"
          id="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required.",
            },
            pattern: {
              value: EMAIL_REGEX,
              message: "Invalid email address.",
            },
          })}
        />
        <p className="text-red-600 mt-2 text-sm ml-1">
          {errors.email?.message}
        </p>
      </div>
      <div className="py-2">
        <label htmlFor="password" className="ml-2 text-sm font-semibold">
          Password
        </label>
        <input
          className="w-full border rounded-md py-2 px-3 mt-3"
          type="password"
          id="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required.",
            },
          })}
        />
        <p className="text-red-600 mt-2 text-sm ml-1">
          {errors.password?.message}
        </p>
      </div>
      <div className="mt-5">
        <input
          type="submit"
          value="Login"
          className="bg-blue-500 w-full py-2 rounded-lg hover:bg-blue-600 text-white cursor-pointer"
        />
      </div>
      <div className="mt-8 text-sm text-center">
        <span className="mr-1">Don't have an account?</span>
        <Link to="/register" className="text-blue-500">Register</Link>
      </div>
    </form>
  );
};

export default LoginForm;
