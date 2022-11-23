// @ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import * as aw from '../../../../aw'; 

export const ssr = false

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  if (await Promise.resolve(aw.isSignedIn())) {
    let resolved;
    console.log(params.childId)
    let found = aw.db.getDocument("testing","children", params.childId)
    .then(function (result) {return result}, function (error) {return false})
    let groupsFound = await aw.db.listDocuments('testing', 'groups')
    .then(function (result) {return result}, function (error) {return false})
    console.log(groupsFound)
    if (await found != false) {
      return { child: found, groups: groupsFound }
    } else {
      throw error(404, 'Not found');
    } 
  } else {
    console.log(await Promise.resolve(aw.isSignedIn()))
    throw redirect(307, '/auth/signIn/')
  }
}