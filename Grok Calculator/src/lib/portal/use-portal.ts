import { useCallback, useEffect, useState } from "react";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { getPortalData, type PortalData } from "./api";

export function usePortal() {
  const user = useCurrentUser();
  const [data, setData] = useState<PortalData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const next = await getPortalData({
        data: {
          displayName: user?.displayName ?? null,
          email: user?.primaryEmail ?? null,
        },
      });
      setData(next);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not load portal";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [user?.displayName, user?.primaryEmail]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { data, error, loading, reload, setData };
}
