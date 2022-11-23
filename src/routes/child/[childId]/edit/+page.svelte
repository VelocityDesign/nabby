<script lang="ts">
     /** @type {import('./$types').PageData} */  export let data: any;
     import * as aw from '../../../../aw.js';
     import "../../../../app.css";

     async function onSubmit(submission:any ) {
        console.log("d")
        let formStuff = new FormData(submission.target)
        let sucessful = aw.db.updateDocument('testing', 'children', data.child.$id, { firstName: formStuff.get("firstName"), lastName: formStuff.get("lastName"), group: formStuff.get("group"), })
        .then(function(){ return true }, function(error) { console.log(error) });
        if(await Promise.resolve(sucessful)){
            window.location.href = "/child/"+data.child.$id
        } else {
            alert("Something Went Wrong.")
        }
    }
</script>
<form class="flex flex-col" on:submit|preventDefault={onSubmit}>
    <span class="text-black font-bold text-lg">First Name</span>
    <input class="rounded-full text-gray-700 p-2 pl-3 my-3 bg-gray-200 w-full sm:w-1/3" type="text" name="firstName" value={data.child.firstName} />
    <span class="text-black font-bold text-lg">Last Name</span>
    <input class="rounded-full text-gray-700 p-2 pl-3 my-3 bg-gray-200 w-full sm:w-1/3" type="text" name="lastName" value={data.child.lastName} />
    <nobr><span class="text-black font-bold text-lg">Group</span> <a href="/groups/"><span class="text-black font-bold text-sm">(Edit)</span></a></nobr>
    {#each data.groups.documents as group}
        {#if group.$id == data.child.group}
            <div class="flex flex-row justify-begining space-x-2"><input checked={true} id="groupChoice{group}" value={group.$id} type="radio" name="group"/><div class="chip mt-2 mb-0 text-center md:text-left w-fit bg-white rounded-full p-1 px-4 text-black font-bold"><span>{group.name}</span></div></div>
        {:else}
            <div class="flex flex-row justify-begining space-x-2"><input id="groupChoice{group}" value={group.$id} type="radio" name="group"/><div class="chip mt-2 mb-0 text-center md:text-left w-fit bg-white rounded-full p-1 px-4 text-black font-bold"><span>{group.name}</span></div></div>
        {/if}
    {/each}
    <button type="submit" class="rounded-full bg-gray-300 my-5 h-10">Save</button>
</form>