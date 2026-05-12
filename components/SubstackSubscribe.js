export default function SubstackSubscribe({ className = "" }) {
  return (
    <form
      action="https://haltblog.substack.com/api/v1/free?nojs=true"
      method="post"
      target="_blank"
      className={`flex flex-col sm:flex-row gap-2 ${className}`}
    >
      <input
        type="email"
        name="email"
        placeholder="your@email.com"
        required
        aria-label="Email address"
        className="flex-1 px-3 py-2 bg-background text-foreground border border-foreground/10 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-accent"
      />
      <button
        type="submit"
        className="bg-accent text-background font-medium text-sm px-4 py-2 hover:bg-brand transition-colors"
      >
        Subscribe →
      </button>
    </form>
  );
}
