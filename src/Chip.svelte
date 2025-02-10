<script>
    export let label = '';
    export let active = false;
  </script>
  
  <style>
    .chip {
      display: inline-block;
      padding: 8px 16px;
      border-radius: 16px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s;
    }
  
    .inactive {
      background-color: #e0e0e0;
      color: #333;
    }
  
    .active {
      background-color: #2196f3;
      color: white;
    }
  </style>
  
  <div class="chip {active ? 'active' : 'inactive'}" on:click>
    {label}
  </div>
  