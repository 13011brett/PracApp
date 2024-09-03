<script lang="ts">
	import { onMount } from 'svelte';
	import {Chart, registerables} from 'chart.js';
	import ZoomPlugin from 'chartjs-plugin-zoom';
    export let propValue;

	let lineChartCanvas: HTMLCanvasElement;
	let lineChart: Chart;
    let aliveData: number[];
    let offlineData: number[];

	Chart.register(...registerables);
	Chart.register(ZoomPlugin);


	function updateLineChart(data: any) {
		if (lineChart) {
			lineChart.data.labels = data.map((item: any) => new Date(item[1] * 1000).toLocaleDateString()); // Would prefer to seperate the annotation and the times, would be an improvement.
			aliveData = data.flatMap((item: any) => item[0] == 0 ? 1 : null);
            offlineData = data.flatMap((item: any) => item[0] != 0 ? 0 : null);

            lineChart.data.datasets[0].data = aliveData;
            lineChart.data.datasets[1].data = offlineData;
			lineChart.update();
		}
	}

	function initLineChart(){
		lineChart = new Chart(lineChartCanvas, {
			type: 'line',
			data: {
				labels: [],
				datasets: [
					{
						label: 'Host Alive',
						data: [],
						borderColor: '#4BC0C0',
						tension: 0.01
					},
                    {
                        label: 'Host Offline',
						data: [],
						borderColor: '#FBC0C0',
						tension: 0.01
                    }
				]
			},
			options: {
				plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem, data){
                                return tooltipItem.raw == 1 ? "Online" : "Offline"; //Callback to check tooltip value to specify offline or online on hover.
                            },
                        }
                    },
                    title: {
                        display: true,
                        text: "Uptime - Past 90 Days"
                    },
					zoom: {
						zoom: {
							wheel: {
								enabled: true,
							},
							pinch: {
								enabled: true,
							},
							mode: 'x',
						}
					}
				},
                scales: {
                    y: {
                        display: false
                    }
                },
                
				responsive: true,
				maintainAspectRatio: false
			}
		});
	}

	onMount(async () => {
        
		// Line Chart setup
		initLineChart();
		
		// Use prop data to add data into line chart.
		if (Array.isArray(propValue)) {
				updateLineChart(propValue[0].datapoints);
		}
	});
</script>
<canvas bind:this={lineChartCanvas}></canvas>
