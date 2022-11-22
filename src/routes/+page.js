// @ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import * as aw from '../aw.js'; 

export const ssr = false

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  if (await Promise.resolve(aw.isSignedIn())) {
    let currentUser = await aw.account.get()
    let foundChildren = await aw.db.getDocument('637c58ff556d48edadc4', '637ce57b184a499ee385', currentUser.$id)
    // console.log(foundChildren)
    let children = [];
    for (let i in foundChildren.children) {
        // console.log(foundChildren.children[i])
        try {
          children.push(await aw.db.getDocument('637c58ff556d48edadc4', '637c640fc25e075dc862', foundChildren.children[i]))
        }
        catch(error) {
          // Nothing to do :{}
        }
    }
    // console.log(children)
    return { isSignedIn: true, user: currentUser, children: children }
  } else {
    console.log("Not Authenticated")
    return { isSignedIn: false }
  }
}