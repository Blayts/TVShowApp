export interface ICountry {
  name: string,
  code: string,
  timezone: string
};

export interface IExternals {
  tvrage: number,
  thetvdb: number,
  imdb: string
};

export interface IImage {
  medium: string,
  original: string
}

export interface ILink {
  href: string
};

export interface ILinks {
  self: ILink,
  previousepisode: ILink
};

export interface INetwork {
  id: number,
  name: string,
  country: ICountry
};

export interface IRating {
  average: number
};

export interface IShedule {
  time: string,
  days: string[]
};

export interface IWebChannel {
  id: number,
  name: string,
  country: ICountry
};

export interface IShow {
  id: number,
  url: string,
  name: string,
  type: string,
  language: string,
  genres: string[],
  status: string,
  runtime: number,
  averageRuntime: number,
  premiered: string,
  officialSite": string,
  schedule: IShedule,
  rating: IRating,
  weight: number,
  network: INetwork,
  webChannel: IWebChannel,
  dvdCountry: number,
  externals: IExternals,
  image: IImage,
  summary: string,
  updated: number,
  _links: ILinks
};
