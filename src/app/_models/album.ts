import { Artist } from './artist';
import { ExternalUrl } from './external_url';
import { Image } from './image';

export interface Album {
    album_type: string,
    artists: Artist[],
    available_markets: string[],
    external_urls: ExternalUrl,
    href: string,
    id: string,
    images: Image[],
    name: string,
    release_date: string,
    release_date_prediction: string,
    total_tracks: number,
    type: string,
    uri: string
}