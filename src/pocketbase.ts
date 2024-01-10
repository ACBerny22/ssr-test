import PocketBase from 'pocketbase';
import {cookies} from 'next/headers'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';


export const pb = new PocketBase(process.env.DB_POCKET);
export const store = pb.authStore;
export const isUserValid = pb.authStore.isValid

export async function getUser(cookieStore: ReadonlyRequestCookies) {
    const cookie = cookieStore.get('pb_auth');
    if (!cookie) {
        return false;
    }

    pb.authStore.loadFromCookie(cookie?.value || '');
    return pb.authStore.model;
}

export async function isAuthenticated(cookieStore: ReadonlyRequestCookies) {
    const cookie = cookieStore.get('pb_auth');
    if (!cookie) {
        return false;
    }

    // loadFromCookie applies the cookie data before checking the user is authenticated
    pb.authStore.loadFromCookie(cookie?.value || '');
    return pb.authStore.isValid || false
}



