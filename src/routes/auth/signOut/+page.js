// @ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import * as aw from '../../../aw.js'; 

export const ssr = false

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  if (await Promise.resolve(aw.isSignedIn())) {
    await aw.account.deleteSession(await (await aw.account.getSession('current')).$id)
    throw redirect(307, '/')
  } else {
    console.log(await Promise.resolve(aw.isSignedIn()))
    throw redirect(307, '/')
  }
}