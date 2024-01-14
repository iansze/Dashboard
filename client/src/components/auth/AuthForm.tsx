import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setCurrentMember } from "../../redux/feature/memberSlice";
import { instance, requests } from "../../utils/axios";
import { Mode, FormValues, SignInResponseData } from "../../types/type";

const AuthForm = ({ mode }: Mode) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutationOptions = {
    signUp: {
      mutationFn: (data: FormValues) =>
        instance.post<SignInResponseData>(requests.signup, data).then((response) => response.data),
      onSuccess: () => navigate("/login"),
      onError: (error: typeof errors) => {
        console.error("Error during sign-up:", error);
        navigate("/sign-up");
      },
    },
    login: {
      mutationFn: (data: FormValues) =>
        instance.post<SignInResponseData>(requests.login, data).then((response) => response.data),
      onSuccess: (data: SignInResponseData) => {
        dispatch(setCurrentMember(data.member));
        navigate("/");
      },
      onError: () => navigate("/login"),
    },
  };

  const { mutate, isPending } = useMutation(mutationOptions[mode]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    mutate(data);
  };

  return (
    <form className="authForm" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username")}
        id="username"
        placeholder="Username"
        type="text"
        className="authForm__username"
        required
        minLength={3}
        aria-invalid={errors.username ? "true" : "false"}
      />
      {errors.username?.type === "required" && <p role="alert">username is required</p>}
      <input
        {...register("email")}
        id="email"
        placeholder="Email"
        type="email"
        className="authForm__email"
        required
        minLength={3}
        aria-invalid={errors.email ? "true" : "false"}
      />
      {errors.email?.type === "required" && <p role="alert">username is required</p>}
      <input
        {...register("password")}
        id="password"
        placeholder="Password"
        type="password"
        className="authForm__password"
        required
        minLength={3}
        aria-invalid={errors.password ? "true" : "false"}
      />
      {errors.password?.type === "required" && <p role="alert">username is required</p>}
      <button
        type="submit"
        disabled={isPending}
        className={`authForm__submit ${isPending ? "authForm__submit-disabled" : ""}`}
      >
        {isPending ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default AuthForm;
