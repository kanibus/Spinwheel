import { CategoryId } from '@/data/wordBanks';

const descriptorPool = [
  'serendipitous',
  'electric',
  'moonlit',
  'micro-viral',
  'anthology-style',
  'immersive',
  'hyperlocal',
  'slow-burn',
  'spark-loaded',
  'co-created',
  'offbeat',
  'purpose-led',
];

const wildcardPool = [
  'time-loop teaser',
  'crowd-written caption',
  'holographic filter pack',
  'gratitude side-quest',
  'lo-fi sound ritual',
];

const emotionPool = [
  'radical empathy',
  'rebellious joy',
  'magnetic trust',
  'playful defiance',
];

const stylePool = [
  'kinetic scrapbook',
  'analog glitch',
  'immersive POV',
  'holographic pastel',
];

const settingPool = [
  'sunrise rooftop lab',
  'crowded micro-museum',
  'floating pop-up studio',
  'desert light garden',
];

const actionPool = [
  'unlocking an impossible door',
  'teaching the future its history',
  'hosting a zero-gravity jam session',
  'turning feedback into fireworks',
];

const objectPool = [
  'sous-chef robot',
  'augmented reality zine',
  'solar graffiti drone',
  'memory-collecting suitcase',
];

const tonePool = [
  'boldly earnest narrator',
  'mischievous sage voiceover',
  'curious hype squad',
];

const poolByCategory: Record<CategoryId, string[]> = {
  emotion: emotionPool,
  action: actionPool,
  object: objectPool,
  setting: settingPool,
  style: stylePool,
  tone: tonePool,
  wildcard: wildcardPool,
};

const randomFrom = (items: string[], count: number) => {
  const picks = new Set<string>();
  while (picks.size < Math.min(count, items.length)) {
    const base = items[Math.floor(Math.random() * items.length)];
    const descriptor = descriptorPool[Math.floor(Math.random() * descriptorPool.length)];
    picks.add(`${descriptor} ${base}`);
  }
  return Array.from(picks);
};

export const generateIdeaSeeds = (category: CategoryId, count = 3) => {
  const pool = poolByCategory[category];
  if (!pool) {
    return randomFrom(wildcardPool, count);
  }
  return randomFrom(pool, count);
};
