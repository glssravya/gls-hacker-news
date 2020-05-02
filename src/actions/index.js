import axios from 'axios';
const ROOT_URL = 'https://hn.algolia.com/api/v1/search?tags=story';

export const FETCH_HACKER_NEWS = 'FETCH_HACKER_NEWS'
export const FETCH_NEWS_BY_PAGE = 'FETCH_NEWS_BY_PAGE'

export function fetchHackerNews() {
    const url = `${ROOT_URL}`
    const request = axios.get(url);

    return {
        type:FETCH_HACKER_NEWS,
        payload:request
    }
}

export function fetchNewsByPage(id){
    const url = `${ROOT_URL}&page=${id}`;
    const request = axios.get(url);
    return {
        type:FETCH_NEWS_BY_PAGE,
        payload:request
    }
}