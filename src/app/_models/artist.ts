import { ExternalUrl } from './external_url';

export interface Artist {
    external_urls: ExternalUrl,
    href: string,
    id: string,
    name: string,
    type: string,
    uri: string
}