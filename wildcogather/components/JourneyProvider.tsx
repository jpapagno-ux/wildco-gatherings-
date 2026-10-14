"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { deviceStore, newFolio, now, type Folio, type FolioItem, type FolioState, type FolioStore } from "@/lib/folios";
import IggiPanel, { type IggiContext } from "@/components/IggiPanel";

type Ctx = {
  ready: boolean;
  mode: FolioStore["mode"];
  folios: Folio[];
  active?: Folio;
  setActive: (id: string) => void;
  create: (name: string) => Folio;
  update: (id: string, patch: Partial<Omit<Folio, "id" | "items" | "createdAt">>) => void;
  remove: (id: string) => void;
  addItem: (item: Omit<FolioItem, "addedAt" | "key">, folioId?: string) => { folio: Folio; added: boolean };
  removeItem: (folioId: string, key: string) => void;
  updateItem: (folioId: string, key: string, patch: Partial<Pick<FolioItem, "note">>, change?: string) => void;
  replaceAll: (state: FolioState) => void;
  openIggi: (ctx?: IggiContext) => void;
};

const JourneyCtx = createContext<Ctx | null>(null);

export function useJourney() {
  const c = useContext(JourneyCtx);
  if (!c) throw new Error("useJourney must be used inside <JourneyProvider>");
  return c;
}

export default function JourneyProvider({ children, store = deviceStore }: { children: React.ReactNode; store?: FolioStore }) {
  const [state, setState] = useState<FolioState>({ folios: [] });
  const [ready, setReady] = useState(false);
  const [iggi, setIggi] = useState<{ open: boolean; ctx?: IggiContext }>({ open: false });

  useEffect(() => {
    setState(store.load());
    setReady(true);
    return store.subscribe?.(() => setState(store.load()));
  }, [store]);

  const commit = useCallback((next: FolioState) => { setState(next); store.save(next); }, [store]);
  const touch = (f: Folio): Folio => ({ ...f, updatedAt: now() });

  const api = useMemo<Ctx>(() => {
    const active = state.folios.find((f) => f.id === state.activeId) || state.folios[0];
    return {
      ready, mode: store.mode, folios: state.folios, active,
      setActive: (id) => commit({ ...state, activeId: id }),
      create: (name) => { const f = newFolio(name); commit({ folios: [f, ...state.folios], activeId: f.id }); return f; },
      update: (id, patch) => commit({ ...state, folios: state.folios.map((f) => (f.id === id ? touch({ ...f, ...patch }) : f)) }),
      remove: (id) => { const folios = state.folios.filter((f) => f.id !== id); commit({ folios, activeId: state.activeId === id ? folios[0]?.id : state.activeId }); },
      addItem: (item, folioId) => {
        let folios = state.folios;
        let target = folios.find((f) => f.id === (folioId || state.activeId)) || folios[0];
        if (!target) { target = newFolio("Our next gathering"); folios = [target, ...folios]; }
        const key = `${item.kind}:${item.slug}`;
        if (target.items.some((i) => i.key === key)) { commit({ folios, activeId: target.id }); return { folio: target, added: false }; }
        const next = touch({ ...target, items: [...target.items, { ...item, key, addedAt: now() }] });
        commit({ folios: folios.map((f) => (f.id === next.id ? next : f)), activeId: next.id });
        return { folio: next, added: true };
      },
      removeItem: (folioId, key) => commit({ ...state, folios: state.folios.map((f) => (f.id === folioId ? touch({ ...f, items: f.items.filter((i) => i.key !== key) }) : f)) }),
      updateItem: (folioId, key, patch, change) => commit({
        ...state,
        folios: state.folios.map((f) => f.id !== folioId ? f : touch({
          ...f,
          items: f.items.map((i) => i.key !== key ? i : { ...i, ...patch, ...(change && i.kind === "itinerary" ? { changes: [...(i.changes || []), { at: now(), note: change }] } : {}) }),
        })),
      }),
      replaceAll: (next) => commit(next),
      openIggi: (ctx) => setIggi({ open: true, ctx }),
    };
  }, [state, ready, store, commit]);

  return (
    <JourneyCtx.Provider value={api}>
      {children}
      <IggiPanel open={iggi.open} ctx={iggi.ctx} onClose={() => setIggi({ open: false })} />
    </JourneyCtx.Provider>
  );
}
