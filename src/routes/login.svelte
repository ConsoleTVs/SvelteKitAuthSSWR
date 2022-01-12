<script lang="ts">
	import { authentication } from '$lib/auth'
	import type { AuthLogin } from '$lib/auth'
	import Guest from '$middleware/guest.svelte'

	const credentials: AuthLogin = {
		email: '',
		password: ''
	}

	const { login, loginError } = authentication()
</script>

<Guest>
	<form on:submit|preventDefault={() => login(credentials)}>
		<input type="email" bind:value={credentials.email} placeholder="Email" />
		<input type="password" bind:value={credentials.password} placeholder="Password" />
		<button type="submit">Login</button>
		<a href="/register" class="href">
			<button>Register</button>
		</a>
	</form>

	{#if $loginError}
		<div style="margin-top: 15px; color: red;">{$loginError.response.data.message}</div>
		<ul>
			{#each Object.entries($loginError.response.data.errors) as [field, errors]}
				<li><b>{field}:</b> {errors[0]}</li>
			{/each}
		</ul>
	{/if}
</Guest>
