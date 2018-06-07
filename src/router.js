import Vue from 'vue';
import Router from 'vue-router';
import AreaLineChart from './components/AreaLineChart';
import BarGraph from './components/BarGraph';
import ColumnChart from './components/ColumnChart';
import ScatterPlot from './components/ScatterPlot';
import PieChart from './components/PieChart';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/pie-chart',
            name: 'pie-chart',
            component: PieChart,
        },
        {
            path: '/area-line-chart',
            name: 'area-line-chart',
            component: AreaLineChart,
        },
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
