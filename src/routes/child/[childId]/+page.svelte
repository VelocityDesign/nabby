<script>
// @ts-nocheck

  /** @type {import('./$types').PageData} */  export let data;
  import { error, redirect } from '@sveltejs/kit';
</script>
<h1>{data.child.firstName} {data.child.lastName}</h1>