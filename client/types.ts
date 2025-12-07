export interface WaitlistState {
  email: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
