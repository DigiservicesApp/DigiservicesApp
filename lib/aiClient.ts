// Client-side OpenAI helper (uses NEXT_PUBLIC_AI_KEY — this will be exposed in the bundle)
// Generic chat helper that can call OpenRouter or OpenAI depending on env
export async function openAiChat(
  prompt: string,
  opts?: { model?: string; temperature?: number }
) {
  // prefer OpenRouter if key is set
  const orKey =
    process.env.NEXT_PUBLIC_OPENROUTER_KEY ||
    process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  const orUrl =
    process.env.NEXT_PUBLIC_OPENROUTER_URL ||
    process.env.NEXT_PUBLIC_OPENROUTER_API_URL;
  const oaikey = process.env.NEXT_PUBLIC_AI_KEY;

  // Allow the OpenRouter key to be provided in NEXT_PUBLIC_AI_KEY (e.g. keys prefixed with "sk-or-")
  const aiKeyLooksLikeOpenRouter =
    typeof oaikey === 'string' && oaikey.startsWith('sk-or-');

  const useOpenRouter = !!orKey || aiKeyLooksLikeOpenRouter;
  const key = orKey || (aiKeyLooksLikeOpenRouter ? oaikey : oaikey);
  if (!key)
    throw new Error(
      'Missing AI key (set NEXT_PUBLIC_OPENROUTER_KEY or NEXT_PUBLIC_AI_KEY)'
    );

  const model =
    opts?.model || process.env.NEXT_PUBLIC_AI_MODEL || 'gpt-3.5-turbo';
  const body: {
    model: string;
    messages: { role: string; content: string }[];
    temperature: number;
    max_tokens: number;
  } = {
    model,
    messages: [{ role: 'user', content: prompt }],
    temperature: opts?.temperature ?? 0.2,
    max_tokens: 600,
  };

  const endpoint = useOpenRouter
    ? orUrl || 'https://openrouter.ai/v1/chat/completions'
    : 'https://api.openai.com/v1/chat/completions';

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`AI provider error: ${res.status} ${txt}`);
  }

  const json = await res.json();
  // OpenAI style: json.choices[0].message.content
  const text =
    json?.choices?.[0]?.message?.content ??
    json?.choices?.[0]?.text ??
    json?.output?.text ??
    '';
  return String(text);
}

export async function prioritizeTasksOpenAI(
  tasks: { id: string; title: string; progress: number; dueInDays?: number }[]
) {
  const taskList = tasks
    .map(
      (t) =>
        `- id:${t.id} title:"${t.title.replace(/"/g, '\\"')}" progress:${
          t.progress
        } dueInDays:${t.dueInDays ?? 'NA'}`
    )
    .join('\n');

  const prompt = `You are a helpful assistant that prioritizes tasks for a product team. Given the following tasks, return a JSON array with the task ids in the recommended priority order (highest priority first). Only return the JSON array, e.g. ["q2","q1","q3"].\n\nTasks:\n${taskList}\n\nConsider due dates (overdue higher), progress (lower progress may be higher priority if due is soon), and clarify that the output must be valid JSON array of ids.`;

  const text = await openAiChat(prompt, { temperature: 0.2 });

  // Try to parse JSON array from the assistant output
  try {
    const parsed = JSON.parse(text.trim());
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    // attempt to extract a JSON array substring
    const m = text.match(/\[\s*(?:"[^"]+"\s*,?\s*)+\]/);
    if (m) {
      try {
        return JSON.parse(m[0]);
      } catch (parseErr) {
        // ignore parse error and continue to fallback heuristics
        // console.debug('parse error extracting JSON array from AI response', parseErr)
      }
    }
  }

  // as a last resort, try to extract ids by lines
  const ids = text
    .split(/\s+/)
    .map((s: string) => s.replace(/[^a-zA-Z0-9-_:./]/g, ''))
    .filter(Boolean)
    .filter((t: string) => tasks.some((tk) => tk.id === t));

  if (ids.length) return ids;

  throw new Error('Could not parse AI response for task ordering');
}
