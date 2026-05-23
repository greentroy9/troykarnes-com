"use client";

export default function ApplicationForm({ formspreeUrl, nextUrl }) {
  function handleSubmit() {
    // Form still submits natively to Formspree in a new tab (target="_blank").
    // After native validation passes, scroll the current tab to the booking section.
    const target = document.getElementById("book");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <form
      action={formspreeUrl}
      method="POST"
      target="_blank"
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      <input type="hidden" name="_next" value={nextUrl} />

      <Field label="Your name" name="name" required>
        <input
          id="name"
          type="text"
          name="name"
          required
          className={inputClass}
        />
      </Field>

      <Field label="Your email" name="email" required>
        <input
          id="email"
          type="email"
          name="email"
          required
          className={inputClass}
        />
      </Field>

      <Field
        label="Which service speaks to you?"
        name="service"
        required
      >
        <div className="flex flex-col gap-3">
          <RadioOption
            name="service"
            value="herosdraft"
            title="The Hero's Draft"
            description="Written with you. You author the book with my coaching."
          />
          <RadioOption
            name="service"
            value="ghostwriting"
            title="Ghostwriting"
            description="Written for you. I write in your voice."
          />
          <RadioOption
            name="service"
            value="unsure"
            title="Not sure yet"
            description="I want to discuss both."
          />
        </div>
      </Field>

      <Field
        label="Genre"
        name="genre"
        required
        hint="Memoir, business, personal development, industry, etc."
      >
        <input
          id="genre"
          type="text"
          name="genre"
          required
          className={inputClass}
        />
      </Field>

      <Field
        label="Topic"
        name="topic"
        required
        hint="What is your book about?"
      >
        <textarea
          id="topic"
          name="topic"
          required
          rows={4}
          className={textareaClass}
        />
      </Field>

      <Field
        label="Timeline"
        name="timeline"
        required
        hint="When do you want the book out?"
      >
        <input
          id="timeline"
          type="text"
          name="timeline"
          required
          className={inputClass}
        />
      </Field>

      <Field
        label="Other notes"
        name="notes"
        hint="Anything else I should know before our call. Optional."
      >
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className={textareaClass}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-6 mt-4">
        <button
          type="submit"
          className="bg-accent text-background font-medium text-[15px] px-10 py-[18px] hover:bg-brand transition-colors"
        >
          Submit application →
        </button>
        <a
          href="#book"
          className="inline-flex items-center gap-3 border-2 border-accent px-6 py-[16px] font-[var(--font-ui)] text-[15px] font-semibold text-foreground hover:bg-accent/10 transition-colors"
        >
          Pick a convenient date/time below
          <span className="text-accent text-[22px] leading-none">↴</span>
        </a>
      </div>
    </form>
  );
}

const inputClass =
  "w-full px-4 py-3 bg-background text-foreground border border-foreground/15 text-[15px] placeholder:text-foreground/40 focus:outline-none focus:border-accent";

const textareaClass =
  "w-full px-4 py-3 bg-background text-foreground border border-foreground/15 text-[15px] placeholder:text-foreground/40 focus:outline-none focus:border-accent resize-y";

function Field({ label, name, required, hint, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-[13px] uppercase tracking-[1.5px] text-foreground/70 font-medium font-[var(--font-ui)]"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      {hint && (
        <p className="text-[13px] text-foreground/60 font-[var(--font-body)] -mt-1">
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}

function RadioOption({ name, value, title, description }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer p-3 border border-foreground/10 hover:border-accent transition-colors">
      <input
        type="radio"
        name={name}
        value={value}
        required
        className="mt-1 accent-[#dc602e]"
      />
      <span className="font-[var(--font-body)]">
        <span className="font-semibold text-[15px] block">{title}</span>
        <span className="text-[14px] text-foreground/70">{description}</span>
      </span>
    </label>
  );
}
