# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

# Project Info
This is a sveltekit web application, with a server written in Go and Python microservices. Belowe are some requirements we would like you to implement.
The API returns some simulated time series data with a value and a timestamp.
There may be a few technical issues with this code, please do your best to resolve all that you find.

## Improvements

Add a few visualizations of the data returned from the API.

Utilize the "microservices" directory to assist with some data visualizations. We've included tests for one such visualization, a simple panel that displays, based on the data provided, if the host is "UP" or "DOWN". Please make all of these pass, and feel free
to add new ones for any others you want to add.

Add the ability to resize the charts, and have the new size persist when the page is refreshed.

Create a treeview component with host we provided, and add a few made-up hosts that would return a similar dashboard (but keep in mind our API only returns data for the one host)

Please add your own eye and style this page as you'd like!