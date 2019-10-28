import { Album } from './album';
import { Artist } from './artist';
import { ExternalUrl } from './external_url';

export interface Track {
    album: Album,
    artists: Artist[],
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_urls: ExternalUrl,
    href: string,
    id: string,
    is_local: boolean,
    name: string,
    popularity: number,
    prieview_url: string,
    track_number: number,
    type: string,
    uri: string
}