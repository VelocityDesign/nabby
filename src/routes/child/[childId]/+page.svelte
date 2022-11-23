<script lang="ts">

  /** @type {import('./$types').PageData} */  export let data: any;
  import { error, redirect } from '@sveltejs/kit';
	import Layout from '../../+layout.svelte';
	import { children } from 'svelte/internal';
  import * as aw from '../../../aw.js';
  let toggleCheckText: "In" | "Out";
  if (data.child.checkedIn) {
    toggleCheckText = "Out"
  } else {
    toggleCheckText = "In"
  }
  async function toggleCheck() {
    if (data.child.checkedIn) {
      await aw.db.updateDocument('testing','children',data.child.$id, { checkedIn: false })
      .then(function(){data.child.checkedIn = false}, function(){console.log(error)})
    } else {
      await aw.db.updateDocument('testing','children',data.child.$id, { checkedIn: true })
      .then(function(){data.child.checkedIn = true}, function(){console.log(error)})
    }
    if (data.child.checkedIn) {
      toggleCheckText = "Out"
    } else {
      toggleCheckText = "In"
    }
  }
  let group: any = false;
  async function loadGroup() {
    await aw.db.getDocument('testing','groups', data.child.group)
    .then(function(result){group = result}, function(){console.log(error)})
  }
  if (data.child.group != undefined){
    loadGroup()
  }
  let showDR = false;
  let showDRText: "Hide" | "Show" = "Show";
  function toggleDR(){
    showDR = !showDR
    if (showDR) {
      showDRText = "Hide"
    } else {
      showDRText = "Show"
    }
  }
  function activateEditMode(){
    window.location.href = "/child/"+data.child.$id+"/edit/"
  }
</script>
<div class="flex flex-col md:flex-row items-center w-full h-full">
  <img class="w-full rounded-full sm:w-1/3 m-5" src="https://triton.novao.xyz/v1/storage/buckets/children-pictures/files/{data.child.picture}/view?project=xyz.judahbrown.nabby" alt="Image of {data.child.firstName}" />
  <div/>
  <div id="childStats" class="flex flex-col items-center md:items-start">
    <h1 class="text-black font-bold text-5xl">{data.child.firstName} {data.child.lastName}</h1>
    <div id="chips" class="flex flex-row justify-center items-center flex-wrap space-x-2">
    {#if !showDR}
      {#if data.child.checkedIn}
      <div class="chip mt-2 mb-0 text-center md:text-left w-fit bg-green-500 rounded-full p-1 px-4 text-green-900 font-bold"><span>Checked In</span></div>
      {:else}
      <div class="chip mt-2 mb-0 text-center md:text-left w-fit bg-red-500 rounded-full p-1 px-4 text-red-900 font-bold"><span>Checked Out</span></div>
      {/if}  
      {#if group}
      <div class="chip mt-2 mb-0 text-center md:text-left w-fit bg-{group.color}-500 rounded-full p-1 px-4 text-{group.color}-900 font-bold"><span>Group: {group.name}</span></div>
      {/if}
    {:else}
      {#if data.child.dietaryRestrictions.length == 0}
      <div class="chip mt-2 ml-0 mb-0 text-center md:text-left bg-gray-100 rounded-full p-1 px-4 text-black font-light"><span class="italic">No Dietary Restrictions to Show</span></div>
      {:else}
        {#each data.child.dietaryRestrictions as dr}
        <div class="chip mt-2 mb-0 text-center md:text-left bg-amber-300 rounded-full p-1 px-4 text-amber-900 font-bold"><span class="whitespace-nowrap">{dr}</span></div>
        {/each}
      {/if}
    {/if}
    </div>
    <hr class="w-full my-3">
    <h1 class="text-black mt-0 font-semibold text-3xl">Actions</h1>
    <div id="actionSheet" class="flex flex-row flex-wrap items-center justify-center space-x-2 space-y-2">
      <button on:click={toggleCheck} class="chip mt-2 mb-0 text-center md:text-left w-fit bg-gray-300 rounded-full p-1 px-4 text-gray-900 font-bold">Check {toggleCheckText}</button>
      <button class="chip mt-2 mb-0 text-center md:text-left w-fit bg-gray-300 rounded-full p-1 px-4 text-gray-900 font-bold">Contact Parents</button>
      <button on:click={toggleDR} class="chip mt-2 mb-0 text-center md:text-left w-fit bg-gray-300 rounded-full p-1 px-4 text-gray-900 font-bold">{showDRText} Dietary Restrictions</button>
      <button on:click={activateEditMode} class="chip mt-2 mb-0 text-center md:text-left w-fit bg-gray-300 rounded-full p-1 px-4 text-gray-900 font-bold">Edit</button>
    </div>
  </div>
</div>