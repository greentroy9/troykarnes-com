export default function ImagePlaceholder({
  label = "Photo",
  aspectRatio = "4 / 5",
  className = "",
}) {
  return (
    <div
      className={`bg-surface flex items-center justify-center ${className}`}
      style={{ aspectRatio }}
    >
      <div className="text-center px-6">
        <div className="text-[10px] uppercase tracking-[2px] text-foreground/40 font-medium mb-1">
          Image Placeholder
        </div>
        <div className="text-[13px] text-foreground/60 font-medium">
          {label}
        </div>
      </div>
    </div>
  );
}
