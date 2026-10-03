import { RegisterForm } from "@/components/form/register-form";

import Image from "next/image";
import { HeartPulse, Sparkles } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="grid min-h-svh bg-[#f7f8f5] lg:grid-cols-[minmax(440px,0.92fr)_minmax(0,1.08fr)]">
      <section className="flex min-h-svh flex-col px-6 py-7 sm:px-10 sm:py-9 lg:px-14 xl:px-20">
        <header>
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-foreground"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#176b5b] text-white shadow-sm shadow-[#176b5b]/20">
              <HeartPulse
                aria-hidden="true"
                className="size-5"
                strokeWidth={2.2}
              />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              HealthCare{" "}
              <span className="font-normal text-muted-foreground">Ltd.</span>
            </span>
          </Link>
        </header>

        <div className="flex flex-1 items-center justify-center py-12 sm:py-16 lg:py-10">
          <div className="w-full max-w-[390px]">
            <RegisterForm />
          </div>
        </div>

        <footer className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2026 HealthCare Ltd.</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-[#3d9a77]" />
            Care, connected
          </span>
        </footer>
      </section>

      <aside className="relative hidden min-h-svh overflow-hidden bg-[#173c35] lg:block">
        <Image
          src="/register.jpg"
          alt="Healthcare professional welcoming a new patient"
          fill
          priority
          sizes="54vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#102c27]/10 via-[#102c27]/15 to-[#102c27]/85" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-10 xl:p-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-sm">
            <Sparkles aria-hidden="true" className="size-3.5" />A healthier way
            forward
          </span>
          <span className="text-xs font-medium text-white/80">02 / 02</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 max-w-2xl p-10 text-white xl:p-14">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-[#b6dfcb]">
            Your health, in good hands
          </p>
          <h2 className="max-w-xl text-4xl font-medium leading-[1.12] tracking-tight xl:text-5xl">
            Begin a healthier chapter.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-white/75">
            Create your account and keep the care you need close at hand.
          </p>
          <div className="mt-10 flex items-center gap-2">
            <span className="size-1 rounded-full bg-white/45" />
            <span className="h-1 w-8 rounded-full bg-white" />
            <span className="size-1 rounded-full bg-white/45" />
          </div>
        </div>
      </aside>
    </main>
  );
}
