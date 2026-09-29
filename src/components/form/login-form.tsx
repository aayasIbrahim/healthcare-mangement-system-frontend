"use client";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { Input } from "../ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Button } from "../ui/button";
import { loginSchema } from "@/validation";
import { useLogin } from "@/hooks";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import GoogleLoginComponent from "../modules/google-login/google-login";
import Link from "next/link";
function LoginForm() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { mutate: login, isPending } = useLogin();
  const form = useForm({
    defaultValues: {
      email: "testeradmin@gmail.com",
      password: "Tester@admin12345",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };
      login(loginData, {
        onSuccess: (res) => {
          toast.add({
            title: "Login Success",
            description: "Welcome back",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Authorization failure",
            description:
              err.message || "Something went wrong. Please try again",
            type: "error",
          });
        },
      });
    },
  });
  return (
    <div className="w-full">
      <div className="mb-9 space-y-3">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#176b5b]">
          <span className="size-1.5 rounded-full bg-[#3d9a77]" />
          Welcome back
        </p>
        <h1 className="text-[34px] font-semibold leading-tight tracking-tight text-[#172a25]">
          Sign in to your account
        </h1>
        <p className="text-[15px] leading-6 text-muted-foreground">
          Your care journey is right where you left it.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-5">
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel className="text-[13px] font-semibold text-[#263b35]" htmlFor={field.name}>
                    Email address
                  </FieldLabel>
                  <div className="relative">
                    <Mail aria-hidden="true" className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#7c8c85]" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="you@example.com"
                      onChange={(e) => field.handleChange(e.target.value)}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      autoComplete="email"
                      className="h-12 rounded-xl border-[#dce5df] bg-white pl-10 pr-3.5 shadow-sm shadow-[#153b2f]/[0.03] placeholder:text-[#a0ada6] focus-visible:border-[#38836d] focus-visible:ring-[#38836d]/15"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel className="text-[13px] font-semibold text-[#263b35]" htmlFor={field.name}>
                      Password
                    </FieldLabel>
                    <span className="text-xs text-muted-foreground">Keep it private</span>
                  </div>
                  <div className="relative">
                    <LockKeyhole aria-hidden="true" className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#7c8c85]" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      autoComplete="current-password"
                      className="h-12 rounded-xl border-[#dce5df] bg-white pl-10 pr-12 shadow-sm shadow-[#153b2f]/[0.03] placeholder:text-[#a0ada6] focus-visible:border-[#38836d] focus-visible:ring-[#38836d]/15"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setIsPasswordVisible((visible) => !visible)
                      }
                      aria-label={
                        isPasswordVisible ? "Hide password" : "Show password"
                      }
                      aria-pressed={isPasswordVisible}
                      title={
                        isPasswordVisible ? "Hide password" : "Show password"
                      }
                      className="absolute inset-y-0 right-1 flex size-10 items-center justify-center self-center rounded-lg text-muted-foreground transition-colors hover:bg-[#eef4ef] hover:text-[#176b5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38836d]"
                    >
                      {isPasswordVisible ? (
                        <EyeOff aria-hidden="true" className="size-4" />
                      ) : (
                        <Eye aria-hidden="true" className="size-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button
            disabled={isPending}
            type="submit"
            className="mt-1 h-12 w-full justify-between rounded-xl bg-[#176b5b] px-5 text-sm font-semibold text-white shadow-md shadow-[#176b5b]/15 hover:bg-[#12594c]"
          >
            {isPending ? (
              <>
                <span className="flex items-center gap-2">
                  <Spinner />
                  Signing in
                </span>
              </>
            ) : (
              "Sign in"
            )}
            {!isPending && <ArrowRight aria-hidden="true" className="size-4" />}
          </Button>
        </FieldGroup>
        <FieldSeparator className="my-1 text-xs">or continue with</FieldSeparator>
        <div className="flex justify-center [&>div]:max-w-full">
          <GoogleLoginComponent />
        </div>
      </form>
      <div className="mt-7 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-[#176b5b] underline decoration-[#9fc5b2] underline-offset-4 transition-colors hover:text-[#104c40]"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
