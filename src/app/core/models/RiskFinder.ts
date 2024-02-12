export interface RiskFinder {
  database?: string
  address?: string;
  list?: string;
  name?: string;
  program?: string;
  score?: string;
  type?: string;

  entity?: string;
  jurisdiction?: string;
  linked_to?: string;
  source?: string;
}

export interface RiskFinderResponse {
  hits: string;
  results: Array<RiskFinder>
}
