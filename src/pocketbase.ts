import PocketBase from 'pocketbase';

export const pb = new PocketBase(process.env.DB_POCKET);
export const store = pb.authStore;
