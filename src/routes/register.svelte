<script lang="ts">
	import { authentication } from '$lib/auth'
	import type { AuthRegister } from '$lib/auth'
	import Guest from '$middleware/guest.svelte'

	const credentials: AuthRegister = {
		name: '',
		email: '',
		password: '',
		password_confirmation: ''
	}

	const { register, registerError } = authentication()
</script>

<Guest>
	<form on:submit|preventDefault={() => register(credentials)}>
		<input type="text" bind:value={credentials.name} placeholder="Name" />
		<input type="email" bind:value={credentials.email} placeholder="Email" />
		<input type="password" bind:value={credentials.password} placeholder="Password" />
		<input
			type="password"
			bind:value={credentials.password_confirmation}
			placeholder="Repeat Password"
		/>
		<button type="submit">Register</button>
		<a href="/login" class="href">
			<button>Login</button>
		</a>
	</form>

	{#if $registerError}
		<div style="margin-top: 15px; color: red;">{$registerError.response.data.message}</div>
		<ul>
			{#each Object.entries($registerError.response.data.errors) as [field, errors]}
				<li><b>{field}:</b> {errors[0]}</li>
			{/each}
		</ul>
	{/if}
</Guest>
