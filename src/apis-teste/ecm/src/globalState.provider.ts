import { GlobalState } from './globalState';

export const GlobalStateProvider = {
  provide: GlobalState,
  useFactory: () => {
    return GlobalState.getInstance();
  },
};
