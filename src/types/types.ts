export interface IChannel {
  name: string
  tvg: {
    id: string
    name: string
    logo: string
    url: string
    rec: string
  }
  group: {
    title: string
  }
  http: {
    referrer: string
    'user-agent': string
  }
  url: string
  raw: string
  line: number
  catchup: {
    type: string
    days: string
    source: string
  }
  timeshift: string
}
