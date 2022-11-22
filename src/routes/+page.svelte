<script lang="ts">
    import { children } from 'svelte/internal';
    import * as aw from '../aw.js';
    /** @type {import('./$types').PageData} */  export let data: any;
</script>
<div class="flex flex-col">
{#if data.isSignedIn}
    <span class="text-gray-500 text-lg font-sans">Welcome Back,</span>
    <span class="text-black text-5xl font-bold">{data.user.name}</span>
    <hr class="w-1/122 my-2">
    <span class="text-gray-500 text-sm mt-0 mb-3 font-light"><a href="/auth/signOut">Sign Out</a> - <a href="/settings">Settings</a></span>
    <span class="text-2xl">Your Children</span>
    {#if data.children.length != 0}
        {#each data.children as child}
            <span>{child.firstName} {child.lastName}</span>
        {/each}
    {:else}
        <span>No Children</span>
    {/if}
{:else}
    <span class="text-2xl">Welcome to Nabby!</span><br>
    <a href="/auth/signIn">Sign In</a> - <a href="auth/signUp">Sign Up</a>
{/if}
</div>
<style>
    
</style>