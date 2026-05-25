<script lang="ts">
	import { page } from '$app/state';
	import type { NavigationItem } from '$lib/types/navigation.types';
	import { slide } from 'svelte/transition';
	import Icon from '../ui/Icon.svelte';
	import { findParentIdByUrl } from '$lib/utils/navigation';
	
	interface Props {
		showNavigationBar: boolean;
		navigationItems: NavigationItem[];
	}

	const { showNavigationBar, navigationItems }: Props = $props();

	// svelte-ignore state_referenced_locally
	let expandedParentIndex = $state(findParentIdByUrl(page.url.pathname, navigationItems));
	function toggleParent(index: number) {
		if (expandedParentIndex === index) {
			expandedParentIndex = -1;
		} else {
			expandedParentIndex = index;
		}
	}
</script>

{#if showNavigationBar}
	<nav
		class="navbar-panel"
		aria-label="Sidebar navigation panel"
		aria-hidden={!showNavigationBar}
		inert={!showNavigationBar}
	>
		<div class="navbar-panel--content text-body">
			<ul class="navbar-list">
				{#each navigationItems as item}
					{#if item.status === 'active'}
						<li class="navbar-item" role="none">
							{#if item.children && item.children.length > 0}
								<button
									class="navbar-item--parent"
									class:active={expandedParentIndex === item.id}
									onclick={() => toggleParent(item.id)}
									aria-expanded={expandedParentIndex === item.id}
								>
									<span>{item.label}</span>
									<Icon
										name="chevron-right"
										class="nav-chevron"
										rotate={expandedParentIndex === item.id ? 90 : 0}
									/>
								</button>

								{#if expandedParentIndex === item.id}
									<ul transition:slide={{ duration: 200 }}>
										{#each item.children as child (child.id)}
											{#if child.status == 'active'}
												<li class="navbar-child-item">
													<a
														class="navbar-item--child-anchor"
														class:current={page.url.pathname === child.href}
														href={child.href}
													>
														{child.label}
													</a>
												</li>
											{/if}
										{/each}
									</ul>
								{/if}
							{:else if item.href}
								<a
									class="navbar-item--anchor"
									class:current={page.url.pathname === item.href}
									href={item.href}
									data-sveltekit-preload-data="hover"
								>
									{item.label}
								</a>
							{:else}
								<span class="navbar-item--inactive">{item.label}</span>
							{/if}
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</nav>
{/if}
