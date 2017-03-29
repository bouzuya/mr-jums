// = spa-town RouteResult
export interface Route {
  name: string;
  params: Params;
}

export interface Params {
  [name: string]: string;
}

