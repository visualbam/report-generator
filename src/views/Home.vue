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
    import ColumnChart from '../components/ColumnChart.vue';
    import BarGraph from '../components/BarGraph.vue';
    import ScatterPlot from '../components/ScatterPlot.vue';

    export default {
        name: 'home',
        components: {
            BarGraph,
            ColumnChart,
            ScatterPlot
        },
    };
</script>

<style lang="stylus">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    hr {
        border: 1px solid #efefef;
        margin: 6rem 0;
    }

    .base--scatter-plot {
        display: block;
        margin: 0 auto;
        text-align: center;
    }

    .base--scatter-plot .y {
        /*letter-spacing: 1px;*/
    }

    .base--scatter-plot .point {
        shape-rendering: crispEdges;
        fill-opacity: 0.75;
        stroke-opacity: 0.75;
        stroke-width: 1.5;
    }

    .gridline line, .gridline path {
        stroke: #C9C8C9;
        stroke-width: 1.5;
    }

    /* Utility classes */
    .heavy {
        font: bold 10pt 'Fi360 Sans Tabular';
    }
</style>
