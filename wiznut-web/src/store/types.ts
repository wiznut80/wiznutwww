export interface ConsentState {
  consentGiven: boolean;
}
export interface RootState {
  consent: ConsentState;
}
export interface ConsentAction {
  type: string;
  payload: boolean;
}
