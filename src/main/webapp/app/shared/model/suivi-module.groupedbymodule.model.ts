export interface ISuiviModuleGroupedByMdoule {
  id?: number;
  nomModule?: string;
  volumeHoraire?: number;
  cumul?: number;
}

export const defaultValue: Readonly<ISuiviModuleGroupedByMdoule> = {};
