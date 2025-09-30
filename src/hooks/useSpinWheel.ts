import { useCallback, useMemo, useState } from 'react';

import { CategoryId, WordCategory, wordCategories } from '@/data/wordBanks';
import { buildPhrase } from '@/utils/phraseBuilder';

type Mode = 'serious' | 'wild';

type CategoryState = WordCategory & {
  active: boolean;
  customWords: string[];
  selection: string | null;
};

export interface ChallengeResult {
  id: string;
  phrase: string;
  mode: Mode;
  selections: Partial<Record<CategoryId, string>>;
  createdAt: number;
}

const createInitialState = (): CategoryState[] =>
  wordCategories.map((category) => ({
    ...category,
    active: true,
    customWords: [],
    selection: null,
  }));

const getUniqueId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useSpinWheel = () => {
  const [categories, setCategories] = useState<CategoryState[]>(createInitialState);
  const [mode, setMode] = useState<Mode>('serious');
  const [spinning, setSpinning] = useState(false);
  const [lastResult, setLastResult] = useState<ChallengeResult | null>(null);
  const [history, setHistory] = useState<ChallengeResult[]>([]);
  const [savedChallenges, setSavedChallenges] = useState<ChallengeResult[]>([]);

  const spin = useCallback(async () => {
    if (spinning) {
      return null;
    }

    setSpinning(true);

    const selections: Partial<Record<CategoryId, string>> = {};

    setCategories((prev) =>
      prev.map((category) => {
        if (!category.active) {
          return { ...category, selection: null };
        }

        const candidates = [...category.defaultWords, ...category.customWords];
        const choice = candidates[Math.floor(Math.random() * candidates.length)];
        selections[category.id] = choice;

        return {
          ...category,
          selection: choice,
        };
      }),
    );

    const phrase = buildPhrase(selections, mode);

    const result: ChallengeResult = {
      id: getUniqueId(),
      phrase,
      mode,
      selections,
      createdAt: Date.now(),
    };

    setLastResult(result);
    setHistory((prev) => [result, ...prev].slice(0, 25));

    await new Promise((resolve) => setTimeout(resolve, 1400));
    setSpinning(false);

    return result;
  }, [mode, spinning]);

  const toggleCategory = useCallback((id: CategoryId) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
              ...category,
              active: !category.active,
              selection: category.active ? null : category.selection,
            }
          : category,
      ),
    );
  }, []);

  const addCustomWord = useCallback((id: CategoryId, value: string) => {
    setCategories((prev) =>
      prev.map((category) => {
        if (category.id !== id) {
          return category;
        }

        const normalized = value.trim();
        if (!normalized) {
          return category;
        }

        if (
          category.customWords.some(
            (word) => word.toLocaleLowerCase() === normalized.toLocaleLowerCase(),
          )
        ) {
          return category;
        }

        return {
          ...category,
          customWords: [...category.customWords, normalized],
        };
      }),
    );
  }, []);

  const removeCustomWord = useCallback((id: CategoryId, word: string) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
              ...category,
              customWords: category.customWords.filter((existing) => existing !== word),
            }
          : category,
      ),
    );
  }, []);

  const resetCustomWords = useCallback((id: CategoryId) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
              ...category,
              customWords: [],
            }
          : category,
      ),
    );
  }, []);

  const saveCurrentResult = useCallback(() => {
    if (!lastResult) {
      return false;
    }

    setSavedChallenges((prev) => {
      if (prev.some((challenge) => challenge.id === lastResult.id)) {
        return prev;
      }

      return [lastResult, ...prev];
    });

    return true;
  }, [lastResult]);

  const deleteSavedChallenge = useCallback((id: string) => {
    setSavedChallenges((prev) => prev.filter((challenge) => challenge.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const value = useMemo(
    () => ({
      categories,
      mode,
      setMode,
      spin,
      spinning,
      lastResult,
      history,
      savedChallenges,
      toggleCategory,
      addCustomWord,
      removeCustomWord,
      resetCustomWords,
      saveCurrentResult,
      deleteSavedChallenge,
      clearHistory,
    }),
    [
      categories,
      mode,
      spin,
      spinning,
      lastResult,
      history,
      savedChallenges,
      toggleCategory,
      addCustomWord,
      removeCustomWord,
      resetCustomWords,
      saveCurrentResult,
      deleteSavedChallenge,
      clearHistory,
    ],
  );

  return value;
};

export type SpinWheelStore = ReturnType<typeof useSpinWheel>;
