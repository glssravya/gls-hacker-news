import axios from 'axios';
const ROOT_URL = 'https://hn.algolia.com/api/v1/search?';

export const FETCH_HACKER_NEWS = 'FETCH_HACKER_NEWS'

export function fetchHackerNews() {
    const url = `${ROOT_URL}tags=front_page`
    const request = axios.get(url);

    return {
        type:FETCH_HACKER_NEWS,
        payload:request
    }
}