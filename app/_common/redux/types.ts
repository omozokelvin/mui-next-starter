export type ReduxLoading<T> = Partial<Record<keyof T, boolean>>;

export type ReduxError<T> = Partial<Record<keyof T, unknown>>;
