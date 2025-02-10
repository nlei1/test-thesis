<script>
    import { createEventDispatcher } from 'svelte';
  
    export let color = '#000000';
    const dispatch = createEventDispatcher();
  
    function handleChange(event) {
      color = event.target.value;
      dispatch('colorChange', color);
    }
  </script>
  
  <input type="color" value={color} on:change={handleChange} />
  
  <style>
    input[type="color"] {
      -webkit-appearance: none;
      border: none;
      width: 32px;
      height: 32px;
      cursor: pointer;
    }
    input[type="color"]::-webkit-color-swatch-wrapper {
      padding: 0;
    }
    input[type="color"]::-webkit-color-swatch {
      border: none;
    }
  </style>
  