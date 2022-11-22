<script lang="ts">
    // @ts-nocheck
    import * as aw from '../../../aw.js'
    import { redirect } from "@sveltejs/kit"
    async function onSubmit(submission) {
        let data = new FormData(submission.target)
        let sucessful = aw.account.createEmailSession(data.get('email'), data.get('password'))
        .then(function(){ return true }, function() { return false });
        if(await Promise.resolve(sucessful)){
            console.log("signed in. hurrah!")
            window.location.href = "/"
        } else {
            alert("check your credentials")
        }
    }
</script>
<form on:submit|preventDefault={onSubmit}>
    <div>
        <label for="name">Email</label>
        <input
            type="text"
            id="email"
            name="email"
            value=""
        />
    </div>
    <div>
        <label for="name">Password</label>
        <input
        type="password"
        id="password"
        name="password"
        value=""
        />
    </div>
    <button type="submit">Submit</button>
</form>