<template>
    <div class="home">
        <PieChart></PieChart>
        <hr>
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
    import PieChart from '../components/PieChart';

    export default {
        name: 'home',
        components: {
            PieChart,
            AreaLineChart,
            BarGraph,
            ColumnChart,
            ScatterPlot
        },
    };
</script>
