import Vue from 'vue';
import Router from 'vue-router';
import BarGraph from './components/BarGraph';
import ColumnChart from './components/ColumnChart';
import ScatterPlot from './components/ScatterPlot';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/bar-graph',
            name: 'bar-graph',
            component: BarGraph,
        },
        {
            path: '/column-chart',
            name: 'column-chart',
            component: ColumnChart,
        },
        {
            path: '/scatter-plot',
            name: 'scatter-plot',
            component: ScatterPlot,
        },
    ],
});
