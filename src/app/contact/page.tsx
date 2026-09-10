"use client";

import BaseLayout from "../components/base-layout";
import DottedGridBackground from "../components/dotted-grid-background";
import { inter } from "../components/fonts";

const contactLinks = [
  {
    label: "LinkedIn",
    value: "Mobin Hosseini",
    href: "https://linkedin.com/in/mobin-hosseini-a266122bb/",
  },
  {
    label: "Instagram",
    value: "@mobiouos",
    href: "https://instagram.com/mobiouos",
  },
];

export default function ContactPage() {
  return (
    <BaseLayout>
      <DottedGridBackground fixed={true}/>

      <div className="relative min-h-screen overflow-hidden px-4 pb-20 pt-36 sm:px-6 sm:pt-44 lg:px-8">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-10">
          <section className="w-full">
            <h1 className="text-3xl font-light uppercase tracking-[0.2em] text-secondary text-center"
                style={{ animation: "fade-in 1s ease-in-out" }}>Contact</h1>
            
            <p className={`mx-auto mb-6 mt-6 max-w-xl text-center text-sm font-light text-primary ${inter.className}`} style={{ animation: "fade-in 1s ease-in-out" }}>
              Reach me at mobinhdev@gmail.com or use the links/form below
            </p>

            <div className="mt-8 w-full space-y-6">
              {contactLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex w-full items-center justify-between rounded-2xl slight-accent px-5 py-4 text-primary shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
                  style={{ animation: "fade-in 1s ease-in-out", animationDelay: `${index * 150}ms`,  animationFillMode: "both", }}
                >
                  <span>
                    <span className={`block text-xs uppercase tracking-[0.22em] text-secondary ${inter.className}`}>
                      {link.label}
                    </span>
                    <span className={`mt-1 block text-base font-medium ${inter.className}`}>
                      {link.value}
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-xl text-secondary">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </section>

          <section
            className="w-full max-w-2xl"
            style={{
              animation: "fade-in 1s ease-in-out",
              animationDelay: "300ms",
              animationFillMode: "both",
            }}
          >
            <div className="rounded-[2rem] slight-accent p-5 shadow-[0_18px_60px_rgba(0,0,0,0.06)] backdrop-blur-md sm:p-7">
              <div className="mb-6">
                <p className={`text-sm uppercase tracking-[0.22em] text-secondary ${inter.className}`}>
                  Send a message
                </p>
              </div>

              <form
                className="space-y-6"
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className={`block ${inter.className}`}>
                    <span className="mb-2 block text-sm font-medium text-primary">
                      Name
                    </span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="w-full bg-primary rounded-2xl px-4 py-3 text-primary outline-none transition-colors"
                    />
                  </label>

                  <label className={`block ${inter.className}`}>
                    <span className="mb-2 block text-sm font-medium text-primary">
                      E-mail
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="email@example.com"
                      className="w-full bg-primary rounded-2xl px-4 py-3 text-primary outline-none transition-colors"
                    />
                  </label>
                </div>

                <label className={`block ${inter.className}`}>
                  <span className="mb-2 block text-sm font-medium text-primary">
                    Message
                  </span>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Message"
                    className="w-full bg-primary rounded-2xl px-4 py-3 text-primary outline-none transition-colors"
                  />
                </label>

                <button
                  type="submit"
                  className={`cta-gradient cursor-pointer inline-flex items-center justify-center rounded-full px-6 py-2 mt-6 text-md font-semibold text-white shadow-[0_14px_30px_rgba(201,86,66,0.28)] transition-all duration-150 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_18px_36px_rgba(201,86,66,0.38)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb347]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${inter.className}`}
                >
                  Send
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
}