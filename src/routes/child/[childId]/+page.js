// @ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import * as aw from '../../../aw'; 

export const ssr = false

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  if (await Promise.resolve(aw.isSignedIn())) {
    let resolved;
    console.log(params.childId)
    let found = aw.db.getDocument("637c58ff556d48edadc4","637c640fc25e075dc862", '637c667e184bd3bf1cbb')
    .then(function (result) {return result}, function (error) {return false})
    if (await found != false) {
      return { child: found }
    } else {
      throw error(404, 'Not found');
    } 
  } else {
    console.log(await Promise.resolve(aw.isSignedIn()))
    throw redirect(307, '/auth/signIn/')
  }
}