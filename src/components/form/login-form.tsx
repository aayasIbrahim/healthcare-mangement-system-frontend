"use client";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { loginSchema } from "@/validation";
function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });
  return (
    <div className="w-full">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-medium text-primary">Welcome back</p>
        <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-sm leading-6 text-muted-foreground">
          Enter your details to access your account.
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
                  <FieldLabel
                    className="text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Email address
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="you@example.com"
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    autoComplete="email"
                    className="h-11 rounded-lg bg-background px-3.5 shadow-sm"
                  />
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
                  <FieldLabel
                    className="text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Password
                  </FieldLabel>
                  <div className="relative">
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
                      className="h-11 rounded-lg bg-background px-3.5 pr-12 shadow-sm"
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
                      className="absolute inset-y-0 right-1 flex size-9 items-center justify-center self-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            type="submit"
            size="lg"
            className="mt-1 h-11 w-full rounded-lg"
          >
            Continue
            <ArrowRight aria-hidden="true" className="ml-auto size-4" />
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

export default LoginForm;
