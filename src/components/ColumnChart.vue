<template>
    <div class="container">
        <h1>Column Chart</h1>
        <div id="chart-area"></div>
    </div>
</template>

<script>
    import * as d3 from 'd3';
    import { revenue } from '../mock-data/revenue';

    export default {
        name: "ColumnChart",
        mounted: function () {
            // Set up chart dimensions
            let margin = {left: 80, right: 20, top: 50, bottom: 100};

            let width = 800 - margin.left - margin.right,
                height = 450 - margin.top - margin.bottom;

            // Create Svg Group
            let g = d3.select('#chart-area')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            // Add axis labels
            g.append('text')
                .attr('y', height + 50)
                .attr('x', width / 2)
                .attr('font-size', '20px')
                .attr('text-anchor', 'middle')
                .text('STANDARD DEVIATION 3 YR %');

            g.append('text')
                .attr('y', -60)
                .attr('x', -(height / 2))
                .attr('font-size', '20px')
                .attr('text-anchor', 'middle')
                .attr('transform', 'rotate(-90)')
                .text('RETURN 3 YR %');

            // Scale
            let x = d3.scaleBand()
                .domain(revenue.map(d => d.month))
                .padding(0.2)
                .range([0, width]);

            let y = d3.scaleLinear()
                .domain([0, d3.max(revenue, r => r.revenue)])
                .range([height, 0]);

            // Axis
            let xAxisCall = d3.axisBottom(x);
            g.append('g')
                .attr('class', 'x axis')
                .attr('transform', `translate(0, ${height})`)
                .call(xAxisCall);

            let yAxisCall = d3.axisLeft(y).tickFormat(d => `$${d}`);
            g.append('g')
                .attr('class', 'y axis')
                .call(yAxisCall);

            // Grid Lines
            g.append("g")
                .attr('class', 'grid-line')
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(x).tickSize(-height).tickFormat(''));

            g.append('g')
                .attr('class', 'grid-line')
                .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));

            // Bars
            let rects = g.selectAll('rect')
                .data(revenue);

            rects.enter()
                .append('rect')
                .attr('y', d => y(d.revenue))
                .attr('x', d => x(d.month))
                .attr('height', d => height - y(d.revenue))
                .attr('width', x.bandwidth)
                .attr('fill', 'pink');
        }
    }
</script>

<style>

</style>