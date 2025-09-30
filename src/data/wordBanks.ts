export type CategoryId =
  | 'object'
  | 'emotion'
  | 'setting'
  | 'action'
  | 'style'
  | 'tone'
  | 'wildcard';

export interface WordCategory {
  id: CategoryId;
  label: string;
  description: string;
  defaultWords: string[];
  placeholder: string;
}

export const wordCategories: WordCategory[] = [
  {
    id: 'object',
    label: 'Hero Object',
    description: 'The starring character, product, or unusual subject of the story.',
    placeholder: 'Add a hero object',
    defaultWords: [
      'time-traveling camera',
      'rescue drone',
      'artisan coffee cart',
      'bioluminescent coral',
      'miniature spacecraft',
      'retro arcade cabinet',
      'sustainable sneaker',
      'glass harp',
      'interactive mural',
      'zero-gravity smoothie',
      'kinetic sculpture',
      'solar-powered food truck'
    ],
  },
  {
    id: 'emotion',
    label: 'Emotion',
    description: 'The core feeling the story should leave the audience with.',
    placeholder: 'Add an emotion',
    defaultWords: [
      'awe',
      'nostalgia',
      'joyful rebellion',
      'quiet confidence',
      'empathetic wonder',
      'hopeful anticipation',
      'cheeky delight',
      'tender pride',
      'restless ambition',
      'playful tension',
      'earnest gratitude'
    ],
  },
  {
    id: 'setting',
    label: 'Setting',
    description: 'Where this idea unfolds – the more vivid the better.',
    placeholder: 'Add a setting',
    defaultWords: [
      'neon-soaked alley',
      'floating greenhouse',
      'midnight boardwalk',
      'cloud-top observatory',
      'underwater co-working pod',
      'desert mirage festival',
      'rooftop apiary',
      'immersive soundstage',
      'forgotten planetarium',
      'augmented reality playground'
    ],
  },
  {
    id: 'action',
    label: 'Action',
    description: 'What actually happens during the moment or story beat.',
    placeholder: 'Add an action',
    defaultWords: [
      'teaching gratitude',
      'flipping expectations',
      'sparking a chain reaction',
      'revealing a secret pathway',
      'hosting a micro-ritual',
      'restoring lost color',
      'crowdsourcing courage',
      'remixing a legacy story',
      'turning silence into sound',
      'rewriting the rulebook'
    ],
  },
  {
    id: 'style',
    label: 'Visual Style',
    description: 'How the final piece should feel aesthetically.',
    placeholder: 'Add a visual style',
    defaultWords: [
      'dreamy documentary',
      'bold typographic motion',
      'handheld intimacy',
      'stop-motion whimsy',
      'celestial noir',
      'glitchy collage',
      'vaporwave minimalism',
      'painterly slow-shutter',
      'graphic novel panels',
      'ASMR macro close-ups'
    ],
  },
  {
    id: 'tone',
    label: 'Brand Tone',
    description: 'The Silverside vibe that should come through.',
    placeholder: 'Add a brand tone',
    defaultWords: [
      'optimistic strategist',
      'playful mentor',
      'bold futurist',
      'candid best friend',
      'curious scientist',
      'empathetic guide',
      'rebellious artisan',
      'visionary archivist'
    ],
  },
  {
    id: 'wildcard',
    label: 'Wildcard',
    description: 'A curveball idea from the team or AI to keep things surprising.',
    placeholder: 'Add a wildcard concept',
    defaultWords: [
      'dancing spreadsheets',
      'gratitude confetti cannon',
      'retro-futurist mascot',
      'silent disco board meeting',
      'kinetic typography storm',
      'crowd-sourced storyline poll'
    ],
  },
];
