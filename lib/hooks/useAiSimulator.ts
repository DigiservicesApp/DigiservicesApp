'use client';

import { useCallback, useState } from 'react';

export function useAiSimulator() {
  // Read a public env var as a signal (no network calls performed)
  const apiKey =
    (process?.env?.NEXT_PUBLIC_GORQ_API_KEY ||
      process?.env?.NEXT_PUBLIC_AI_KEY) ??
    '';
  const enabled = Boolean(apiKey);
  const [loading, setLoading] = useState(false);

  const simulate = useCallback(
    async (prompt: string) => {
      setLoading(true);
      try {
        // simulate latency
        await new Promise((r) => setTimeout(r, 500 + Math.random() * 600));
        // produce a deterministic-ish dummy response based on prompt
        const shortened =
          prompt.length > 120 ? prompt.slice(0, 117) + '...' : prompt;
        const suggestion = `AI suggestion for: "${shortened}" — Prioritize: ${
          Math.random() > 0.6 ? 'High' : 'Medium'
        }; Estimated effort: ${1 + Math.round(Math.random() * 5)} days.`;
        return { ok: true, text: suggestion, providerEnabled: enabled };
      } catch (err: any) {
        return {
          ok: false,
          text: String(err?.message ?? err ?? 'Unknown error'),
          providerEnabled: enabled,
        };
      } finally {
        setLoading(false);
      }
    },
    [enabled]
  );

  return { simulate, loading, enabled };
}
