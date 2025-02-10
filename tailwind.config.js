
// @ts-check
import { join } from 'path';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';
import { SlideToggle } from '@skeletonlabs/skeleton';

/** @type {import('tailwindcss').Config} */
export default {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {},
	},

  safelist: [
		'bg-[#f4cccb]',
		'bg-[#fce5cd]',
		'bg-[#fef1cb]',
		'bg-[#d9ead3]',
	],

  plugins: [
    skeleton({
      themes: { preset: [ "wintry" ] }
    })
  ]  
}
						