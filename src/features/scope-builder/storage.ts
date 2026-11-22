"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  clampSqFtForDiscipline,
  SCOPE_STORAGE_KEY,
} from "@/features/scope-builder/engine";
import {
  scopeModelInputSchema,
  type ScopeModelInput,
} from "@/features/scope-builder/schema";

const STORAGE_EVENT = "blacksteel:scope-spec-change";

function subscribe(callback: () => void): () => void {
  const handleChange = () => callback();
  window.addEventListener("storage", handleChange);
  window.addEventListener(STORAGE_EVENT, handleChange);
  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(STORAGE_EVENT, handleChange);
  };
}

function getRawSnapshot(): string | null {
  try {
    return window.sessionStorage.getItem(SCOPE_STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot(): string | null {
  return null;
}

export function writeSavedScopeSpec(input: ScopeModelInput): void {
  try {
    window.sessionStorage.setItem(SCOPE_STORAGE_KEY, JSON.stringify(input));
    window.dispatchEvent(new Event(STORAGE_EVENT));
  } catch {
    // Ignore storage quota / private browsing errors
  }
}

export function clearSavedScopeSpec(): void {
  try {
    window.sessionStorage.removeItem(SCOPE_STORAGE_KEY);
    window.dispatchEvent(new Event(STORAGE_EVENT));
  } catch {
    // Ignore storage errors
  }
}

export function useSavedScopeSpec(): ScopeModelInput | null {
  const raw = useSyncExternalStore(
    subscribe,
    getRawSnapshot,
    getServerSnapshot
  );

  return useMemo(() => {
    if (!raw) return null;
    try {
      const parsed = scopeModelInputSchema.safeParse(JSON.parse(raw));
      if (!parsed.success) return null;
      return {
        ...parsed.data,
        squareFeet: clampSqFtForDiscipline(
          parsed.data.discipline,
          parsed.data.squareFeet
        ),
      };
    } catch {
      return null;
    }
  }, [raw]);
}
