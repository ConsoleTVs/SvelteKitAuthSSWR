<script lang="ts">
	import { authentication } from '$lib/auth'
	import { goto } from '$app/navigation'

	const { isLoading, isAuthenticated } = authentication()

	$: if (!$isLoading && !$isAuthenticated) {
		goto('/login')
	}
</script>

{#if !$isLoading && $isAuthenticated}
	<slot />
{:else}
	<div>Loading...</div>
{/if}
