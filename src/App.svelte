<script>
  import searchResults from './tmp.json';
  import Toggle from './Toggle.svelte';
  import { onMount } from 'svelte';
  import { onDestroy } from 'svelte';
  import overviews from "./overviews.json";
  import interleavedResults from "./interleaved.json";
  

  let viewMode = "default";
  let results = searchResults;
  let categories = {};
  
  let showMore = false;
  let highlightMedication = true;
  let highlightSymptom = true;
  let highlightSpecialist = true;
  let highlightCare = true;

  function filterResults() {
  const query = document.getElementById('search-bar').value.toLowerCase();
  const resultContainers = document.querySelectorAll('.result, .result-row');

  resultContainers.forEach(result => {
    const snippetElement = result.querySelector('.snippet');
    const originalSnippet = snippetElement.getAttribute('data-original-snippet') || snippetElement.innerHTML;

    if (!snippetElement.hasAttribute('data-original-snippet')) {
      snippetElement.setAttribute('data-original-snippet', originalSnippet); // Store the original content
    }

    if (query) {
      if (originalSnippet.toLowerCase().includes(query)) {
        result.style.display = 'block';
        snippetElement.innerHTML = highlightText(originalSnippet, query); // Apply highlighting
      } else {
        result.style.display = 'none';
      }
    } else {
      // Reset to original content when query is empty
      result.style.display = 'block';
      snippetElement.innerHTML = originalSnippet;
    }
  });
}

function highlightText(text, query) {
  if (!query) return text;

  const parts = text.split(/(<[^>]+>)/g); // Split into HTML tags and text
  return parts
    .map(part => {
      if (part.startsWith('<')) return part; // Leave HTML tags untouched
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return part.replace(regex, '<span class="search-highlight">$1</span>');
    })
    .join('');
}



  function switchView(mode) {
    viewMode = mode;
    if (mode === "interleaved") {
      organizeByCategory(interleavedResults);
    }
  }

  function organizeByCategory(data) {
  categories = {};
  Object.entries(data).forEach(([category, entries]) => {
    categories[category] = Object.entries(entries).map(([url, snippet]) => ({
      url,
      snippet,
      originalSnippet: snippet, // Store the original snippet for filtering
      page: new URL(url).hostname,
    }));
  });
}

function filterInterleavedResults() {
  const query = document.getElementById('search-bar').value.toLowerCase();

  Object.keys(categories).forEach(category => {
    categories[category] = categories[category].map(entry => {
      const matches = entry.originalSnippet.toLowerCase().includes(query);
      
      // If there's a search query, highlight it first
      let processedSnippet = matches && query 
        ? highlightText(entry.originalSnippet, query)
        : entry.originalSnippet;
        
      entry.snippet = processedSnippet;
      entry.hidden = !matches && query.length > 0; // Only hide if there's a query and no match
      return entry;
    });
  });

  // Force a reactive update
  categories = {...categories};
}



  onMount(() => {
    organizeByCategory(interleavedResults);
  });

  onDestroy(() => {
    console.log('Component is being destroyed');
  });
</script>



<style>
  .container {
    display: flex;
    justify-content: center;
    padding: 20px;
  }
  
  .main-content {
    width: 1000px;
  }
  
  .search-bar {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .search-results {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  
  .result {
    margin-bottom: 5px;
  }
  

  .page-link {
    flex: 1;
    text-align: right;
    /* margin-left: 10px; */
    color: #1a0dab;
    text-decoration: none;
  }

  .page-link:hover {
    text-decoration: underline;
  }

  .domain {
    color: #006621;
    font-size: 14px;
    margin-bottom: 4px;
  }

  .snippet {
    font-size: 14px;
    line-height: 1.4;
    flex: 5;
  }

  
  .show-more-btn {
      width: 100%; /* Full width */
      border: 2px solid #4A90E2; /* Blue border */
      background: transparent; /* Transparent background */
      color: #000; /* Black text */
      font-size: 15px;
      padding: 10px 0;
      border-radius: 25px; /* Rounded edges */
      cursor: pointer;
      text-align: center;
      font-weight: 400;
      transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
    }
  
    .show-more-btn:hover {
      background: #d3e2fe; /* Light blue hover effect */
    }
  
    .arrow {
      color: #4A90E2; /* Blue arrow */
      font-size: 14px;
      margin-left: 5px;
    }
  
    :global(.search-highlight) {
    @apply font-bold underline decoration-sky-500 decoration-2;
    /* cursor: pointer; */
  }
  
  </style>


<div class="container">

  <div class="main-content text">
    

      <div>
        <input type="text" id="search-bar" class="search-bar" placeholder="Search..." on:input={filterResults}>
      </div>

      <div class:highlight-medication={highlightMedication} class:highlight-symptom={highlightSymptom} class:highlight-specialist={highlightSpecialist} class:highlight-care={highlightCare}>

      <div class="text-[15px]">

        <div class="flex items-center gap-2 mb-4">
          <svg class="w-6 h-6 text-blue-600" viewBox="0 0 471 471" fill="currentColor">
            <path d="M235.5 471C235.5 438.423 229.22 407.807 216.66 379.155C204.492 350.503 187.811 325.579 166.616 304.384C145.421 283.189 120.498 266.508 91.845 254.34C63.1925 241.78 32.5775 235.5 0 235.5C32.5775 235.5 63.1925 229.416 91.845 217.249C120.498 204.689 145.421 187.811 166.616 166.616C187.811 145.421 204.492 120.497 216.66 91.845C229.22 63.1925 235.5 32.5775 235.5 0C235.5 32.5775 241.584 63.1925 253.751 91.845C266.311 120.497 283.189 145.421 304.384 166.616C325.579 187.811 350.503 204.689 379.155 217.249C407.807 229.416 438.423 235.5 471 235.5C438.423 235.5 407.807 241.78 379.155 254.34C350.503 266.508 325.579 283.189 304.384 304.384C283.189 325.579 266.311 350.503 253.751 379.155C241.584 407.807 235.5 438.423 235.5 471Z"></path>
          </svg>
          <h2 class="text-xl font-semibold">AI Overview</h2>
        </div>
        <!-- <h2 class="text-xl font-semibold">AI Overview</h2> -->
        <p>Lupus is a chronic condition that can be managed with medication and lifestyle changes.</p>
        
        <!-- Hidden content (expands when button is clicked) -->
        {#if showMore}
          <div class="grid grid-cols-2 gap-4 mt-4">
            {#each Object.entries(overviews) as [key, value]}
            <blockquote class="dark:text-white p-4 bg-[#f1f5ff] rounded-lg text-[14px] card-hover">
                <div class="flex items-center gap-2 mb-2">
                  <h3 class="text-lg font-semibold capitalize">{key}</h3>
                </div>
                <span class="inline text-[15px]">{@html value}</span>
              </blockquote>
            {/each}
          </div>
        {/if}
        <!-- "Show More" button with transparent background and blue outline -->
        <button 
          class="show-more-btn mt-4"
          on:click={() => showMore = !showMore}>
          {showMore ? "Show Less" : "Show More"} <span class="arrow">{showMore ? "▲" : "▼"}</span>
        </button>      
  
      </div>
      <hr class="mt-4">
      <br>

      <div class="search-results">
        {#each searchResults as result}
          <div class="result">
            <a href={result.url} class="page-link" target="_blank">{result.page}</a>
            <div class="domain">{result.domain}</div>
            <div class="snippet text-xs">{@html result.annotated_snippet}</div>
          </div>
        {/each}
      </div>
    </div>

  </div>
  
</div>