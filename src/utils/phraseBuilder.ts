import { CategoryId } from '@/data/wordBanks';

type Mode = 'serious' | 'wild';

type SelectionMap = Partial<Record<CategoryId, string>>;

const seriousTemplates = [
  ({
    object,
    emotion,
    setting,
    action,
    style,
    tone,
  }: SelectionMap) =>
    `Craft a ${style ?? 'polished'} piece where the ${object ?? 'hero'} in the ${setting ?? 'world'} is ${action ?? 'transforming expectations'} to spark ${emotion ?? 'connection'} in a ${tone ?? 'Silverside'} voice.`,
  ({ object, setting, tone, action }: SelectionMap) =>
    `Design a story featuring ${object ?? 'an unexpected hero'} at a ${setting ?? 'memorable location'} who is ${action ?? 'initiating change'}, all told with a ${tone ?? 'distinct'} tone.`,
  ({
    emotion,
    style,
    action,
    wildcard,
  }: SelectionMap) =>
    `Imagine a ${style ?? 'striking'} visual that channels ${emotion ?? 'emotion'} as it ${action ?? 'unfolds'}. Sprinkle in ${wildcard ?? 'a signature twist'} to keep the team guessing.`,
];

const wildTemplates = [
  ({
    object,
    setting,
    action,
    emotion,
    wildcard,
    tone,
  }: SelectionMap) =>
    `Picture ${object ?? 'a mysterious protagonist'} crash-landing into ${setting ?? 'a surreal space'} and ${action ?? 'leading a flashmob'} while radiating ${emotion ?? 'electric joy'}—all narrated by our ${tone ?? 'Silverside spirit'} with ${wildcard ?? 'an absurd flourish'}.`,
  ({
    object,
    wildcard,
    action,
    style,
  }: SelectionMap) =>
    `Spin up ${object ?? 'an unlikely hero'} teaming with ${wildcard ?? 'a sentient brand asset'} to ${action ?? 'rewire reality'} in a ${style ?? 'cinematic fever dream'} aesthetic.`,
  ({
    setting,
    tone,
    emotion,
    wildcard,
  }: SelectionMap) =>
    `Drop the crew into ${setting ?? 'a hyperspeed venue'} where the mood swings from ${emotion ?? 'serious to silly'} as a ${wildcard ?? 'wild plot twist'} takes over, still unmistakably ${tone ?? 'Silverside'}.`,
];

export const buildPhrase = (selections: SelectionMap, mode: Mode): string => {
  const templates = mode === 'serious' ? seriousTemplates : wildTemplates;
  const template = templates[Math.floor(Math.random() * templates.length)];
  return template(selections);
};
