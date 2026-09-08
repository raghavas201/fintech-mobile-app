import { useEffect, useState, useCallback } from 'react';
import { AsyncState } from '../types/marketplace';

export function useAsync<T>(fn: () => Promise<T>, deps: any[] = []): AsyncState<T> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' });

  const run = useCallback(() => {
    setState({ status: 'loading' });
    fn()
      .then((data) => setState({ status: 'success', data }))
      .catch((err) => setState({ status: 'error', message: err.message ?? 'Something went wrong' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { ...state, refetch: run } as AsyncState<T> & { refetch: () => void };
}
