"use client";
import { usePathname, useRouter } from "next/navigation";

import { Logo } from "@/components/shared/Logo";

function scrollToTop() {
  const lenis = (window as unknown as { lenis?: { scrollTo: (v: number, o?: unknown) => void } })
    .lenis;
  if (lenis?.scrollTo) lenis.scrollTo(0, { lerp: 0.07, duration: 1.1 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

function getLorongHome(pathname: string): string {
  if (pathname.startsWith("/umkm")) return "/umkm";
  if (pathname.startsWith("/karir")) return "/karir";
  if (pathname.startsWith("/dev")) return "/dev";
  return "/";
}

export function ScrollLogo({
  variant,
  size = "sm",
  label,
  children,
}: {
  variant?: "light" | "dark" | "umkm" | "karir" | "dev";
  size?: "sm" | "md" | "lg";
  label: string;
  children?: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    const home = getLorongHome(pathname || "/");
    if (pathname !== home) {
      router.push(home);
    } else {
      scrollToTop();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/20 rounded-md"
    >
      <Logo variant={variant} size={size} />
      {children}
    </button>
  );
}
