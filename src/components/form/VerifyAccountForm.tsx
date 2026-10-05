"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVerifyAccount, useVerifyDoctorAccount } from "@/hooks";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";

const RESEND_COOLDOWN = 120;

export default function VerifyAccountForm({
  mode = "patient",
}: {
  mode: "doctor" | "patient";
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const { mutate: verifyPatient, isPending: isPatientVerifyPending } =
    useVerifyAccount();
  const { mutate: verifyDoctor, isPending: isDoctorVerifyPending } =
    useVerifyDoctorAccount();
  const verify = mode === "doctor" ? verifyDoctor : verifyPatient;
  const verifyPending =
    mode === "doctor" ? isDoctorVerifyPending : isPatientVerifyPending;
  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = {
      email,
      otp,
    };

    verify(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description: "Something went wrong. Please try again",
            type: "error",
          });
        }

        if (mode === "doctor") {
          toast.add({
            title: "Verification Successful",
            description:
              "An admin will approve your account. This may take time. Please check your email in few days",
            type: "success",
          });
          router.push("/");

          return;
        }

        toast.add({
          title: "Verification Successful",
          description: "Welcome onboard",
          type: "success",
        });
        router.push("/");
      },
      onError: (err) => {
        toast.add({
          title: "Verification failure",
          description: err.message || "Something went wrong. Please try again",
          type: "error",
        });
      },
    });
  };

  if (!email) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="mb-9 space-y-3">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#176b5b]">
          <span className="size-1.5 rounded-full bg-[#3d9a77]" />
          Almost there
        </p>
        <h1 className="text-[34px] font-semibold leading-tight tracking-tight text-[#172a25]">
          Verify your email
        </h1>
        <p className="text-[15px] leading-6 text-muted-foreground">
          Enter the 6-digit code we sent to {email}.
        </p>
      </div>

      <form
        id="otp-form"
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleOTP();
        }}
      >
        <Field className="gap-3" data-invalid={isInvalid}>
          <FieldLabel
            className="text-[13px] font-semibold text-[#263b35]"
            htmlFor="otp"
          >
            Verification code
          </FieldLabel>
          <InputOTP
            maxLength={6}
            onChange={(value) => {
              setOtp(value);
              if (isInvalid) {
                setIsInvalid(false);
              }
            }}
            value={otp}
            autoComplete="one-time-code"
            name="otp"
            id="otp"
            pattern={REGEXP_ONLY_DIGITS}
            aria-invalid={isInvalid}
            containerClassName="w-full"
          >
            <InputOTPGroup className="gap-2 rounded-none border-0">
              {Array.from({ length: 6 }, (_, slotIndex) => (
                <InputOTPSlot
                  key={slotIndex}
                  index={slotIndex}
                  className="size-12 rounded-xl border border-[#dce5df] bg-white text-base font-semibold text-[#172a25] shadow-sm first:rounded-xl last:rounded-xl"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {isInvalid && (
            <FieldError
              errors={[{ message: "Invalid code. Please try again" }]}
            />
          )}
          <FieldDescription className="text-sm text-muted-foreground">
            Resend code in {resendTimer}s
          </FieldDescription>
        </Field>

        <Button
          disabled={verifyPending}
          type="submit"
          form="otp-form"
          className="mt-1 h-12 w-full justify-between rounded-xl bg-[#176b5b] px-5 text-sm font-semibold text-white shadow-md shadow-[#176b5b]/15 hover:bg-[#12594c]"
        >
          {verifyPending ? (
            <span className="flex items-center gap-2">
              <Spinner />
              Verifying
            </span>
          ) : (
            "Verify email"
          )}
          {!verifyPending && (
            <ArrowRight aria-hidden="true" className="size-4" />
          )}
        </Button>
      </form>
    </div>
  );
}
