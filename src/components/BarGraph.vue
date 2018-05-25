<template>
    <div class="container">
        <h1>Bar Graph</h1>
        <div class="bar-graph"></div>
    </div>
</template>

<script>
    import * as d3 from 'd3';
    import { donuts } from '../mock-data/donuts';

    /*
        Resources
        ----------------
        List of SVG Elements: https://developer.mozilla.org/en-US/docs/Web/SVG/Element
        List of SVG Attributes: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute

        Steps
        -----------------
        1. Configure chart/graph container properties
        2. Set xScale and yScale functions to data values
        3. Create SVG elements
            a. The entire chart/graph
            b. Elements that get placed on to the chart/graph
            c. Chart text lables
     */

    export default {
        name: "BarGraph",
        mounted() {
            let data = donuts;

            // Configuration ----------------------------------------

            // Chart dimensions
            let w = 800;
            let h = 450;

            // Configure chart margins
            let margin = {top: 40, bottom: 100, left: 80, right: 20};

            // Configure chart dimensions based on data in relation to the margins
            let width = w - margin.left - margin.right;
            let height = h - margin.top - margin.bottom;


            // Data Scale ----------------------------------------

            let yScale = d3.scaleLinear()
            // min - max values for x axis
                .domain([0, d3.max(data, function (d) {
                    return d.value;
                })])
                // scales the width of the data to the chart's width
                .range([height, 0]);

            let xScale = d3.scaleBand()
            // min - max values for y axis
                .domain(data.map(function (entry) {
                    return entry.key;
                }))
                // scales the height of the data to the chart's height
                .rangeRound([0, width]);

            // Color Scale --------------------------------------

            // let linearColorScale = d3.scaleLinear()
            //     .domain([0, data.length])
            //     .range(['#572500', '#f68026']);

            let ordinalColorScale = d3.scaleOrdinal(d3.schemeCategory10);

            // Create Axis --------------------------------------

            let xAxis = d3.axisBottom(xScale);

            let yAxis = d3.axisLeft(yScale);

            // Create Grid lines --------------------------------

            // By default the ticks are placed right to left, use negative width to do left to right
            let yGridLines = d3.axisLeft(yScale)
                .tickSize(-width, 0, 0)
                .tickFormat('');

            let xGridLines = d3.axisBottom(xScale)
                .tickSize(-height, 0, 0)
                .tickFormat('');

            // SVG Creation -------------------------------------

            let svg = d3.select('.bar-graph').append('svg')
                .attr('id', 'chart')
                .attr('width', w)
                .attr('height', h);

            // g element groups our SVG so that we can move the entire group of elements
            let chart = svg.append('g')
                .classed('display', true)
                // Transform allows us to move the group with x / y values
                .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

            // Create Plot ---------------------------------------

            plot.call(chart, {
                data: data,
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
                // Append group tp svg
                this.append('g')
                    .call(params.gridLines.y)
                    .classed('gridline', true);

                // X axis gridlines need to be translated
                this.append('g')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(params.gridLines.x)
                    .classed('gridline', true);

                // Create bars
                this.selectAll('.bar')
                    .data(params.data)
                    .enter()
                    .append('rect')
                    .classed('bar', true)
                    .attr('x', function (d) {
                        return xScale(d.key)
                    })
                    .attr('y', function (d) {
                        return yScale(d.value);
                    })
                    .attr('width', function () {
                        return xScale.bandwidth();
                    })
                    .attr('height', function (d) {
                        // scale y data to height of the chart then subtract 2 pixels for space between bars
                        return height - yScale(d.value);
                    })
                    .style('fill', function (d, i) {
                        return ordinalColorScale(i);
                        // return linearColorScale(i)
                    });

                // Add text labels
                // Move text using dx and dy attributes
                this.selectAll('.bar-label')
                    .data(params.data)
                    .enter()
                    .append('text')
                    .classed('bar-label', true)
                    .attr('x', function (d) {
                        return xScale(d.key) + (xScale.bandwidth() / 2);
                    })
                    .attr('dx', 0)
                    .attr('y', function (d) {
                        return yScale(d.value);
                    })
                    .attr('dy', -6)
                    .text(function (d) {
                        return d.value;
                    });

                // Add axis to the grid by appending a new group
                this.append('g')
                    .classed('x axis', true)
                    .attr('transform', 'translate(' + 0 + ', ' + height + ')')
                    .call(params.axis.x);

                // Y axis doesn't need  to be transformed
                this.append('g')
                    .classed('y axis', true)
                    .call(params.axis.y);

                this.select('.y.axis')
                    .append('text')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'black')
                    // Translate label to be positioned at half the height of the chart (middle) & rotate 90 degrees
                    .attr('transform', 'translate(-50, ' + height / 2 + ') rotate(-90)')
                    .text('Units sold');

                this.select('.x.axis')
                    .append('text')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('text-anchor', 'middle')
                    .attr('transform', 'translate(' + width / 2 + ', 50)')
                    .attr('fill', 'black')
                    .text('Donut Type')
            }
        }
    }
</script>

<style>

</style>