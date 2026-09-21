import { usePortal } from "@/lib/portal/use-portal";
import type { PortalData } from "@/lib/portal/types";
import type { ReactNode } from "react";

type Loaded = Omit<ReturnType<typeof usePortal>, "data"> & { data: PortalData };

export function PortalPage({ children }: { children: (args: Loaded) => ReactNode }) {
  const portal = usePortal();
  if (portal.loading && !portal.data) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-40 animate-pulse rounded-xl bg-white" />
        <div className="h-40 animate-pulse rounded-xl bg-white" />
        <div className="h-40 animate-pulse rounded-xl bg-white" />
      </div>
    );
  }
  if (portal.error || !portal.data) {
    return (
      <div className="rounded-xl border border-line bg-white p-6">
        <p className="font-semibold text-ink">We couldn’t load your benefits.</p>
        <p className="mt-1 text-sm text-muted">{portal.error ?? "Try again in a moment."}</p>
        <button
          type="button"
          className="mt-4 h-11 rounded-[10px] bg-red px-4 text-sm font-semibold text-white"
          onClick={() => void portal.reload()}
        >
          Retry
        </button>
      </div>
    );
  }
  return <>{children({ ...portal, data: portal.data })}</>;
}
