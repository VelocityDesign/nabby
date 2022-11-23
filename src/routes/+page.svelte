<script lang="ts">
    import { children } from 'svelte/internal';
    import * as aw from '../aw.js';
    /** @type {import('./$types').PageData} */  export let data: any;

    let foundData;
    async function onSearchSubmit(submission: any) {
        foundData = [];

        let formData: any = new FormData(submission.target)
        await aw.db.listDocuments('637c58ff556d48edadc4', '637ce57b184a499ee385', [ aw.query.search('names', formData.get('searchTerm'))])
        .then(function(data){ foundData.push(data) }, function() { return false });
        await aw.db.listDocuments('637c58ff556d48edadc4', '637ce57b184a499ee385', [ aw.query.search('lastName', formData.get('searchTerm'))])
        .then(function(data){ foundData.push(data) }, function() { return false });
        await aw.db.listDocuments('637c58ff556d48edadc4', '637ce57b184a499ee385', [ aw.query.search('parentId',  formData.get('searchTerm'))])
        .then(function(data){ foundData.push(data) }, function() { return false });
        
    }
</script>
<div class="flex flex-col">
{#if data.isSignedIn}
    <span class="text-gray-500 text-lg font-sans">Welcome Back,</span>
    <span class="text-black text-5xl font-bold">{data.user.name}</span>
    <hr class="w-1/12 my-2">
    <span class="text-gray-500 text-sm mt-0 mb-3 font-light"><a href="/auth/signOut">Sign Out</a> - <a href="/settings">Settings</a></span>
    <form on:submit|preventDefault={onSearchSubmit}>
            <input placeholder="Search for a name or ID..." name="searchTerm" type="text" class="rounded-full text-gray-700 p-2 pl-3 bg-gray-200 w-full sm:w-1/2" required/>
    </form>
{:else}
    <span class="text-2xl">Welcome to Nabby!</span><br>
    <a href="/auth/signIn">Sign In</a>
{/if}
</div>
<style>
    
</style>