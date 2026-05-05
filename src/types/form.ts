export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncFormState<T> {
  status: FormStatus;
  data?: T;
  error?: string;
}
