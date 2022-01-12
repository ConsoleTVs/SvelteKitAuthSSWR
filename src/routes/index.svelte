<script>
	import Auth from '$middleware/auth.svelte'
	import { authentication } from '$lib/auth'

	const { user, logout } = authentication()

	$: console.log($user)
</script>

<Auth>
	<div>Private Dashboard</div>
	<ul>
		<li>Name: {$user.name}</li>
		<li>Name: {$user.email}</li>
	</ul>
	<button on:click={logout}>Logout</button>
</Auth>
