<template>
    <div class="container">
        <h1>Pie Chart</h1>
        <br>
        <div class="base--pie-chart"></div>
    </div>
</template>

<script>
    import * as d3 from 'd3';
    import { targetAllocation } from '../mock-data/targetAllocation';

    export default {
        name: "PieChart",
        mounted: () => {
            var data = targetAllocation;
            var pieChartColors = getPropertyValuesFromArray(data, 'Color');

            var width = 300,
                height = 250,
                radius = Math.min(width, height) / 2;

            var colorScale = d3.scaleOrdinal()
                .range(pieChartColors);

            var arc = d3.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);

            var pie = d3.pie()
                .sort(null)
                .value(d => d.Allocation);

            var svg = d3.select('.base--pie-chart').append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`);

            var g = svg.selectAll('.arc')
                .data(pie(data))
                .enter().append('g')
                .attr('class', 'arc');

            g.append('path')
                .attr('d', arc)
                .classed('pie-chart-stroke', true)
                .style('fill', (d, i) => colorScale(pieChartColors[i]));

            // exit()


            // helper functions
            function getPropertyValuesFromArray(array, value) {
                return array.reduce((carry, object) => {
                    if (typeof object === 'object' && value in object) {
                        carry.push(object[value]);
                    }

                    return carry;
                }, []);
            }
        }
    }
</script>

<style>
    .pie-chart-stroke {
        stroke: white;
        stroke-width: 4px;
        shape-rendering: auto;
    }
</style>