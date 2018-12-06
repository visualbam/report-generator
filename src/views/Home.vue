<template>
    <div class="home">
        <PieChart></PieChart>
        <hr>
        <CrossScatterPlot></CrossScatterPlot>
        <hr>
        <ScatterPlot></ScatterPlot>
        <hr>
        <ScatterPlotScoreSummary></ScatterPlotScoreSummary>
        <hr>
        <BarGraph></BarGraph>
        <hr>
        <ColumnChart></ColumnChart>
    </div>
</template>

<script>
    // @ is an alias to /src
    import AreaLineChart from '../components/AreaLineChart';
    import ColumnChart from '../components/ColumnChart.vue';
    import BarGraph from '../components/BarGraph.vue';
    import ScatterPlot from '../components/ScatterPlot.vue';
    import ScatterPlotScoreSummary from '../components/ScatterPlotScoreSummary.vue';
    import CrossScatterPlot from '../components/CrossScatterPlot.vue';
    import PieChart from '../components/PieChart';

    export default {
        name: 'home',
        components: {
            PieChart,
            AreaLineChart,
            BarGraph,
            ColumnChart,
            ScatterPlot,
            ScatterPlotScoreSummary,
            CrossScatterPlot
        },
    };
</script>
