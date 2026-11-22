export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="flex min-h-[75svh] items-center justify-center bg-[#F2F0EC] text-[#17191B] dark:bg-[#17191B] dark:text-[#F2F0EC]"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="h-px w-16 bg-[#17191B]/35 dark:bg-[#F2F0EC]/45 animate-pulse" />
        <span className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
          BLACKSTEEL
        </span>
      </div>
    </div>
  );
}
