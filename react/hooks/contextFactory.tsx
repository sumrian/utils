import { useSetState } from 'ahooks';
import React, { ReactNode, useContext } from 'react';

type Updater<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null),
) => void;

export function contextFactory<Value extends object>(initialValue: Value) {
  const Context = React.createContext<Value>(null!);
  const UpdaterContext = React.createContext<Updater<Value>>(null!);

  const Provider = ({
    children,
    defaultValue,
  }: {
    children: ReactNode;
    defaultValue?: Partial<Value>;
  }) => {
    const [state, stateUpdater] = useSetState<Value>({
      ...initialValue,
      ...defaultValue,
    });

    return (
      <Context.Provider value={state}>
        <UpdaterContext.Provider value={stateUpdater}>{children}</UpdaterContext.Provider>
      </Context.Provider>
    );
  };

  const useValue = () => useContext(Context);

  const useValueUpdater = () => useContext(UpdaterContext);

  const useReset = () => {
    const updater = useValueUpdater();
    return () => updater(initialValue);
  };

  return [Provider, useValue, useValueUpdater, useReset] as const;
}
