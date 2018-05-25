<template>
    <div class="home">
        <ScatterPlot></ScatterPlot>
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

    export default {
        name: 'home',
        components: {
            AreaLineChart,
            BarGraph,
            ColumnChart,
            ScatterPlot
        },
    };
</script>
