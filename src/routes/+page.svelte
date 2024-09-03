<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import TreeView from 'svelte-tree-view';
	import Grid, { GridItem } from 'svelte-grid-extended';
	
	let pieChartCanvas: HTMLCanvasElement;
	let lineChartModule : any;
	let graphiteData : any;
	let graphiteDataEndpoint : string;
	let graphiteDataDatapoints : any;
	let aliveData : number[];
	let offlineData: number[];
	let itemSize: object;

	async function retrieveGraphiteData() {
		try {
			const response = await fetch(window.location.href + "api/graphite"); // This would need to be updated if we 
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching graphite data:', error);
			return null;
		}
	}
	async function fetchGraphiteData() {
		graphiteData = await retrieveGraphiteData();
        // console.log('graphite data: ', graphiteData)
		if (graphiteData && Array.isArray(graphiteData[0]?.datapoints)) {
				graphiteDataDatapoints = graphiteData[0].datapoints;
				graphiteDataEndpoint = graphiteData[0].target;
		}
	}

	onMount(async () => {
		await retrieveGraphiteData();
		await fetchGraphiteData();
		aliveData = graphiteDataDatapoints.flatMap((item: any) => item[0] == 0 ? 1 : null);
		offlineData = graphiteDataDatapoints.flatMap((item: any) => item[0] != 0 ? 0 : null);

		let aliveDataPercent = Math.round((aliveData.filter(a => a == 1).length / graphiteDataDatapoints.length)* 100);
		let offlineDataPercent = Math.round((offlineData.filter(a => a == 0).length / graphiteDataDatapoints.length)* 100);

		



		// Pie Chart
		new Chart(pieChartCanvas, {
			type: 'pie',
			data: {
				labels: ['Offline (Percent)', 'Online (Percent)'],
				datasets: [
					{
						data: [offlineDataPercent, aliveDataPercent],
						backgroundColor: ['#FF6384', '#36A2EB']
					}
				]
			},
			options: {
				plugins: {
                    title: {
                        display: true,
                        text: "Uptime - Past 90 days"
                    }
				},
				responsive: true,
				maintainAspectRatio: false
			}
		});

		lineChartModule = (await import('$lib/components/lineChart.svelte')).default;
		itemSize = {width: (window.innerWidth / 5), height: 400}


	});

	itemSize = {width: 200, height: 400}; // placeholders for the onMount event
	
</script>




<body id="reportsPage">
	

	<div class="" id="home">
        <div class="container">
            <div class="row">
                <div class="col-12 text-white d-flex justify-content-center">
					<div class="tm-col tm-col-big">
						<h1 >Reports Dashboard</h1>
						<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
						<h2>Data For: vigilant-vino-iamr-02</h2>
					</div>

                    
                </div>
            </div>
            <!-- row -->
			 <Grid class="grid-reports" {itemSize} cols={4} rows={0}>
				<div class="row tm-content-row tm-mt-big">
					<div class="tm-col tm-col-big">
						<GridItem class="grid-item" activeClass="grid-item-active" x={0} y={0}>
							<div class="resizing" slot="resizeHandle" let:resizeStart>
								<div on:pointerdown={resizeStart} class="text-white"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></div>
							</div>
							<div class="bg-light tm-block h-100">
								<svelte:component this={lineChartModule} propValue={graphiteData}></svelte:component>
							</div>
						</GridItem>

					</div>
					<div class="tm-col tm-col-big">
						<GridItem class="grid-item" activeClass="grid-item-active" x={2} y={0}>
							<div class="resizing" slot="resizeHandle" let:resizeStart>
								<div on:pointerdown={resizeStart} class="text-white"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></div>
							</div>
							<div class="bg-light tm-block h-100">
								<canvas bind:this={pieChartCanvas} class="chartjs-render-monitor"></canvas>
							</div>
						</GridItem>

					</div>
				</div>
			 </Grid>

			<div class="row tm-content-row tm-mt-big d-flex justify-content-center">
				<div class="tm-col tm-col-xlbig d-flex justify-content-center">
                    <div class="bg-light tm-block h-100">
						<h2 class="tm-block-title">Tree view for {graphiteDataEndpoint ?? "Unknown host"}</h2>
						<TreeView
							class="tree-view-wrapper"
							data={graphiteData}
							showCopyButton
						/>
                    </div>
                </div>
			</div>
			<div class="row tm-content-row tm-mt-big d-flex justify-content-center">
				<div class="tm-col tm-col-xlbig d-flex justify-content-center">
                    <div class="bg-light tm-block h-100">
						<h2 class="tm-block-title">Tree-view for host2</h2>
						<TreeView
							class="tree-view-wrapper"
							data={graphiteData}
							showCopyButton
						/>
                    </div>
                </div>
			</div>
			<div class="row tm-content-row tm-mt-big d-flex justify-content-center">
				<div class="tm-col tm-col-xlbig d-flex justify-content-center">
                    <div class="bg-light tm-block h-100">
						<h2 class="tm-block-title">Tree-view for host3</h2>
						<TreeView
							class="tree-view-wrapper"
							data={graphiteData}
							showCopyButton
						/>
                    </div>
                </div>
			</div>
			
            <footer class="row tm-mt-small">
                <div class="col-12 font-weight-light">
                    <p class="d-inline-block tm-bg-black text-white py-2 px-4">
                        Copyright &copy; Reports Dashboard. Made by
                        <a rel="nofollow" href="https://www.github.com/13011brett" class="text-white tm-footer-link">Brett Scarlett</a>
                    </p>
                </div>
            </footer>
        </div>
    </div>
</body>

<style>

</style>
