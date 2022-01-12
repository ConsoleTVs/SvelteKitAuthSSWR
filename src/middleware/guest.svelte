<script lang="ts">
	import { authentication } from '$lib/auth'
	import { goto } from '$app/navigation'

	const { isLoading, isAuthenticated } = authentication()

	$: if (!$isLoading && $isAuthenticated) {
		goto('/')
	}
</script>

{#if !$isLoading && !$isAuthenticated}
	<slot />
{:else}
	<div>Loading...</div>
{/if}
