<template>
    <div class="container">
        <h1>Cross Scatter Plot</h1>
        <div class="base--cross-scatter-plot"></div>
    </div>
</template>

<script>
    import * as d3 from 'd3';
    import { riskReturn } from '../mock-data/risk-return';

    export default {
        name: "CrossScatterPlot",
        mounted() {
            let data = [
                {
                    "Color": "#81B4DF",
                    "InvestmentType": "Model",
                    "Return": 5.49,
                    "StandardDeviation": 5.57
                },
                {
                    "Color": "#8CC978",
                    "InvestmentType": "Peer Group Benchmark",
                    "Return": 4.18,
                    "StandardDeviation": 4.12
                }
            ];

            // Chart dimensions ----------------------------------------------------------------------------------------
            var w = 300;
            var h = 200;
            var r = 6;

            // Configure chart margins ---------------------------------------------------------------------------------
            var margin = {top: 20, bottom: 65, left: 60, right: 20};

            // Configure chart dimensions based on data in relation to the margins -------------------------------------
            var width = w - margin.left - margin.right;
            var height = h - margin.top - margin.bottom;

            var sd;
            var re;

            // map this to peer group benchmark object
            data.forEach(d => {
                if (d.InvestmentType === 'Peer Group Benchmark') {
                    sd = d.StandardDeviation;
                    re = d.Return;
                }
            });

            var sdMax = d3.max(data, d => d.StandardDeviation);
            var reMax = d3.max(data, d => d.Return);

            var sdMin = d3.min(data, d => d.StandardDeviation);
            var reMin = d3.min(data, d => d.Return);

            var sdDiff = Math.max(Math.abs(sdMin - sd), Math.abs(sdMax - sd));
            var reDiff = Math.max(Math.abs(reMin - re), Math.abs(reMax - re));

            var sdLess = sd - sdDiff * 2;
            var sdMore = sd + sdDiff * 2;
            var reLess = re - reDiff * 2;
            var reMore = re + reDiff * 2;

            // Create Chart Scale --------------------------------------------------------------------------------------
            var xScale = d3.scaleLinear()
                .domain([sdLess, sdMore])
                .range([0, width]);

            var yScale = d3.scaleLinear()
                .domain([reLess, reMore])
                .range([height, 0]);

            // SVG Creation --------------------------------------------------------------------------------------------
            var svg = d3.select('.base--cross-scatter-plot').append('svg')
                .attr('id', 'chart')
                .attr('width', w)
                .attr('height', h);

            var chart = svg.append('g')
                .classed('display', true)
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            // Create Axis ---------------------------------------------------------------------------------------------
            var formatAxis = d3.format(''); //,.3r

            var xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10).tickFormat(formatAxis).tickValues([sdLess, sd, sdMore]);
            var yAxis = d3.axisLeft(yScale).tickSize(0).tickPadding(10).tickFormat(formatAxis).tickValues([reLess, re, reMore]);

            // Create Grid lines ---------------------------------------------------------------------------------------
            var yGridLines = d3.axisLeft(yScale)
                .tickSize(-width, 0, 0)
                .tickFormat('')
                .tickValues([reLess, re, reMore]);

            var xGridLines = d3.axisBottom(xScale)
                .tickSize(-height, 0, 0)
                .tickFormat('')
                .tickValues([sdLess, sd, sdMore]);

            // Plot Chart ----------------------------------------------------------------------------------------------
            plot.call(chart, {
                data: data,
                scale: {
                    x: xScale,
                    y: yScale
                },
                axis: {
                    x: xAxis,
                    y: yAxis
                },
                gridLines: {
                    x: xGridLines,
                    y: yGridLines
                }
            });

            function plot(params) {
                // enter()
                this.append('g')
                    .call(params.gridLines.y)
                    .classed('grid-line', true);

                this.append('g')
                    .attr('transform', `translate(0, ${height})`)
                    .call(params.gridLines.x)
                    .classed('grid-line', true);

                this.selectAll('.point')
                    .data(params.data)
                    .enter()
                    .append('circle')
                    .classed('point', true);

                this.append('g')
                    .classed('x axis', true)
                    .classed('heavy', true)
                    .attr('transform', `translate(0, ${height})`)
                    .call(params.axis.x);

                this.append('g')
                    .classed('y axis', true)
                    .classed('heavy', true)
                    .call(params.axis.y);

                // update()
                this.selectAll('.point')
                    .attr('r', r)
                    .attr('stroke-width', 1)
                    .attr('fill', d => d.Color)
                    .attr('cx', d => params.scale.x(d.StandardDeviation))
                    .attr('cy', d => params.scale.y(d.Return));

                this.select('.y.axis')
                    .append('text')
                    .attr('x', 0)
                    .attr('y', -10)
                    .classed('heavy', true)
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'black')
                    // Translate label to be positioned at half the height of the chart (middle) & rotate 90 degrees
                    .attr('transform', `translate(-40, ${height / 2}) rotate(-90)`)
                    .text('RETURN');

                this.select('.x.axis')
                    .append('text')
                    .attr('x', 0)
                    .attr('y', 0)
                    .classed('heavy', true)
                    .attr('text-anchor', 'middle')
                    .attr('transform', `translate(${width / 2}, 45)`)
                    .attr('fill', 'black')
                    .text('STANDARD DEVIATION');

                // exit()
                this.selectAll('.point')
                    .data(params.data)
                    .exit()
                    .remove();
            }
        }
    }
</script>

<style scoped>

</style>