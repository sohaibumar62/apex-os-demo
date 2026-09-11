import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { mockDispatches } from '../data/mockDispatches';
import type {
  Dispatch,
  DispatchStatus,
} from '../types/dispatch';

interface DemoDataContextValue {
  dispatches: Dispatch[];
  createDispatch: () => void;
  assignDriver: (id: string, driver: string) => void;
  updateStatus: (id: string, status: DispatchStatus) => void;
  getDispatch: (id: string) => Dispatch | undefined;
}

const DemoDataContext =
  createContext<DemoDataContextValue | undefined>(undefined);

export function DemoDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dispatches, setDispatches] =
    useState<Dispatch[]>(mockDispatches);

  const createDispatch = () => {
    setDispatches((current) => {
      const nextNumber =
        Math.max(
          ...current.map((dispatch) =>
            Number(dispatch.id.replace('APX-', '')),
          ),
        ) + 1;

      const newDispatch: Dispatch = {
        id: `APX-${nextNumber}`,
        client: 'Demo Medical Laboratory',
        pickup: 'Mission Viejo',
        destination: 'Irvine',
        driver: null,
        status: 'Pending',
        temperature: null,
      };

      return [newDispatch, ...current];
    });
  };

  const assignDriver = (id: string, driver: string) => {
    setDispatches((current) =>
      current.map((dispatch) =>
        dispatch.id === id
          ? {
              ...dispatch,
              driver,
              status: 'Assigned',
              temperature: 38.4,
            }
          : dispatch,
      ),
    );
  };

  const updateStatus = (
    id: string,
    status: DispatchStatus,
  ) => {
    setDispatches((current) =>
      current.map((dispatch) =>
        dispatch.id === id
          ? {
              ...dispatch,
              status,
            }
          : dispatch,
      ),
    );
  };

  const getDispatch = (id: string) =>
    dispatches.find((dispatch) => dispatch.id === id);

  const value = useMemo(
    () => ({
      dispatches,
      createDispatch,
      assignDriver,
      updateStatus,
      getDispatch,
    }),
    [dispatches],
  );

  return (
    <DemoDataContext.Provider value={value}>
      {children}
    </DemoDataContext.Provider>
  );
}

export function useDemoData() {
  const context = useContext(DemoDataContext);

  if (!context) {
    throw new Error(
      'useDemoData must be used inside DemoDataProvider',
    );
  }

  return context;
}