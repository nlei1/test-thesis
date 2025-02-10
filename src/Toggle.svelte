<script>
  import { SlideToggle } from '@skeletonlabs/skeleton';
  export let checked = false;
  export let label = '';
  export let active = '';
</script>

<div class="toggle-wrapper">
  <SlideToggle name={label} bind:checked size="sm" active={active}>{label}</SlideToggle>
</div>

<style>
  .toggle-wrapper :global(.slide-toggle-active) {
      background-color: var(--toggle-color) !important;
  }
</style>
