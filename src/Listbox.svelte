<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    
    export let value: string[] = [];
  
    const items = [
      { name: 'Medication' },
      { name: 'Symptom' },
      { name: 'Specialist' },
      { name: 'Care Tip' }
    ];
  </script>
  
  <style>
    .horizontal-listbox {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
  
    :global(.horizontal-listbox .listbox-item) {
      width: auto !important;
    }
  </style>
  
  <ListBox multiple class="horizontal-listbox">
    {#each items as item}
      <ListBoxItem bind:group={value} name="highlightCategories" value={item.name}>
        {item.name}
      </ListBoxItem>
    {/each}
  </ListBox>
  