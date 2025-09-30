import { CategoryId } from '@/data/wordBanks';

type Mode = 'serious' | 'wild';

type SelectionMap = Partial<Record<CategoryId, string>>;

const API_URL = import.meta.env.VITE_OPENAI_API_URL ?? 'https://api.openai.com/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const DEFAULT_MODEL = import.meta.env.VITE_OPENAI_MODEL ?? 'gpt-4o-mini';

export const isChatGPTConfigured = () => Boolean(API_KEY);

interface GenerateChallengePhraseOptions {
  selections: SelectionMap;
  mode: Mode;
  signal?: AbortSignal;
}

const buildPrompt = (selections: SelectionMap, mode: Mode) => {
  const lines = Object.entries(selections)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  return (
    `You are helping a creative agency craft short, vivid challenge statements for brainstorming video concepts.\n` +
    `Blend the provided category picks into a single, energetic sentence that feels like a mini creative brief.\n` +
    `Keep it under 45 words, first-person plural optional, with a clear action or tension.\n` +
    `Lean ${mode === 'wild' ? 'quirky, surprising, and humorous' : 'purposeful, brand-aligned, and pitch-ready'}.\n` +
    `Selections:\n${lines}`
  );
};

export const generateChallengePhrase = async ({
  selections,
  mode,
  signal,
}: GenerateChallengePhraseOptions): Promise<string> => {
  if (!API_KEY) {
    throw new Error('ChatGPT is not configured. Provide VITE_OPENAI_API_KEY.');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      temperature: mode === 'wild' ? 1.05 : 0.7,
      max_tokens: 140,
      messages: [
        {
          role: 'system',
          content:
            'You turn structured brainstorming picks into one vivid creative challenge sentence for social content ideation. Maintain Silverside brand energy.',
        },
        {
          role: 'user',
          content: buildPrompt(selections, mode),
        },
      ],
    }),
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ChatGPT request failed (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const message = data.choices?.[0]?.message?.content?.trim();
  if (!message) {
    throw new Error('ChatGPT returned an empty response.');
  }

  return message.replace(/^"|"$/g, '').trim();
};
