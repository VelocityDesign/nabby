// @ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import * as aw from '../aw.js'; 

export const ssr = false

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  if (await Promise.resolve(aw.isSignedIn())) {
    let currentUser = await aw.account.get()
    return { isSignedIn: true, user: currentUser}
  } else {
    console.log("Not Authenticated")
    return { isSignedIn: false }
  }
}