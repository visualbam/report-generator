<template>
    <div class="container">
        <h1>Scatter Plot</h1>
        <div class="base--scatter-plot"></div>
    </div>
</template>

<script>
    /* eslint-disable */
    import * as d3 from 'd3';
    import { investments } from '../mock-data/investments';
    import { assets } from '../mock-data/assets';

    /*
    * x-axis: STANDARD DEVIATION 3 YR %
    * ------------------------------------
    * 1. 3YrAnnualized
    * 2. 5YrAnnualized
    * */

    /*
    * y-axis: RETURN 3 YR %
    * ------------------------------------
    * 1. Model monthly returns by hypothetical or historical
    * 2. Peer group benchmark returns
    * 3. Blended benchmark returns
    * */

    export default {
        name: "ScatterPlot",
        mounted() {
            let data = assets.Points;

            let axisOptions = [
                { value: 'Fi360 Fiduciary Score'},
                { value: 'Fi360 Fiduciary Score: 1 Year Trend'},
                { value: 'Fi360 Fiduciary Score: 3 Year Trend'},
                { value: 'Fi360 Fiduciary Score: 5 Year Trend'},
                { value: 'Fi360 Fiduciary Score: 10 Year Trend'}
            ];

            // process data before we plot it
            data.map(d => mapNegativeValuesToZero(d));

            // Chart dimensions ----------------------------------------------------------------------------------------
            let w = 554;
            let h = 540;

            // Configure chart margins ---------------------------------------------------------------------------------
            let margin = {top: 20, bottom: 65, left: 50, right: 20};

            // Configure chart dimensions based on data in relation to the margins -------------------------------------
            let width = w - margin.left - margin.right;
            let height = h - margin.top - margin.bottom;

            // Get Domain Range Values
            let xDomain = [0, 100];
            let yDomain = [0, 100];

            // Create Chart Scale --------------------------------------------------------------------------------------
            let xScale = d3.scaleLinear()
                .domain(xDomain)
                .range([0, width]);

            let yScale = d3.scaleLinear()
                .domain(yDomain)
                .range([height, 0]);

            // SVG Creation --------------------------------------------------------------------------------------------
            let svg = d3.select('.base--scatter-plot').append('svg')
                .attr('id', 'chart')
                .attr('width', w)
                .attr('height', h);

            let chart = svg.append('g')
                .classed('display', true)
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            // Create Axis ---------------------------------------------------------------------------------------------
            let xTickValue = setTickValues(xDomain[1], 10);
            let yTickValue = setTickValues(yDomain[1], 10);

            let formatXAxis = d3.format('d');
            let formatYAxis = d3.format('d');

            let xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10).ticks(xTickValue).tickFormat(formatXAxis);
            let yAxis = d3.axisLeft(yScale).tickSize(0).tickPadding(10).ticks(yTickValue).tickFormat(formatYAxis);

            // Create Grid lines ---------------------------------------------------------------------------------------
            let yGridLines = d3.axisLeft(yScale)
                .tickSize(-width, 0, 0)
                .tickFormat('');

            let xGridLines = d3.axisBottom(xScale)
                .tickSize(-height, 0, 0)
                .tickFormat('');

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
                },
                scoreLine: {
                    green: 25,
                    yellow: 50,
                    red: 75
                }
            });

            function setTickValues(domain, threshold) {
                let value = null;

                if (domain > threshold) {
                    value = threshold;
                } else if (domain === 0) {
                    value = domain;
                } else {
                    value = 4;
                }

                return value;
            }

            function lighten(hsla, lightness) {
                var color = hsla.split(', ');
                var h = color[0].replace(/\D/g,'');
                var s = color[1];
                var l = lightness ? `${lightness}%` : color[2];
                var a = color[3].replace(/\D/g,'');
                return `hsla(${h}, ${s}, ${l}, ${a})`;
            }

            function mapNegativeValuesToZero(object) {
                for (let [key, value] of entries(object)) {
                    if (Math.sign(value) < 0) object[key] = 0;
                }
                return Object.assign({}, object);
            }

            function* entries(object) {
                for (let key of Object.keys(object)) {
                    yield [key, object[key]];
                }
            }

            function plot(params) {
                // enter()
                this.append('g')
                    .call(params.gridLines.y)
                    .classed('grid-line', true);

                this.append('g')
                    .attr('transform', `translate(0, ${height})`)
                    .call(params.gridLines.x)
                    .classed('grid-line', true);

                // green
                this.append('g')
                    .append('line')
                    .call(params.gridLines.x)
                    .attr('x1', 123)
                    .attr('y1', 340)
                    .attr('x2', 0)
                    .attr('y2', 340)
                    .style('stroke-width', 2)
                    .style('stroke', '#ABC977');

                this.append('g')
                    .append('line')
                    .attr('x1', 123)
                    .attr('y1', 455)
                    .attr('x2', 123)
                    .attr('y2', 340)
                    .style('stroke-width', 2)
                    .style('stroke', '#ABC977');

                // yellow
                this.append('g')
                    .append('line')
                    .call(params.gridLines.x)
                    .attr('x1', 243)
                    .attr('y1', 228)
                    .attr('x2', 0)
                    .attr('y2', 228)
                    .style('stroke-width', 2)
                    .style('stroke', '#FCC210');

                this.append('g')
                    .append('line')
                    .attr('x1', 243)
                    .attr('y1', 455)
                    .attr('x2', 243)
                    .attr('y2', 228)
                    .style('stroke-width', 2)
                    .style('stroke', '#FCC210');

                // red
                this.append('g')
                    .append('line')
                    .call(params.gridLines.x)
                    .attr('x1', 365)
                    .attr('y1', 114)
                    .attr('x2', 0)
                    .attr('y2', 114)
                    .style('stroke-width', 2)
                    .style('stroke', '#DB3B3B');

                this.append('g')
                    .append('line')
                    .attr('x1', 365)
                    .attr('y1', 455)
                    .attr('x2', 365)
                    .attr('y2', 114)
                    .style('stroke-width', 2)
                    .style('stroke', '#DB3B3B');

                this.selectAll('.point')
                    .data(params.data)
                    .enter()
                    .append('circle')
                    .classed('point', true);

                this.selectAll('.point-label')
                    .data(params.data)
                    .enter()
                    .append('text')
                    .classed('point-label', true)

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
                    .attr('r', d => d.AssetPercentage)
                    .attr('stroke-width', 1)
                    .attr('fill', d => d.Color)
                    .attr('stroke', d => lighten(d.Color, 60))
                    .attr('cx', d => params.scale.x(d.XValue))
                    .attr('cy', d => params.scale.y(d.YValue));

                this.selectAll('.point-label')
                    .attr('x', d => params.scale.x(d.XValue))
                    .attr('y', d => params.scale.y(d.YValue))
                    .attr('dy', '5')
                    .text(d => d.Id);

                this.select('.y.axis')
                    .append('text')
                    .attr('x', 0)
                    .attr('y', -10)
                    .classed('heavy', true)
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'black')
                    // Translate label to be positioned at half the height of the chart (middle) & rotate 90 degrees
                    .attr('transform', `translate(-30, ${height / 2}) rotate(-90)`)
                    .text(`${assets.XAxisColumnName}`);

                this.select('.x.axis')
                    .append('text')
                    .attr('x', 0)
                    .attr('y', 0)
                    .classed('heavy', true)
                    .attr('text-anchor', 'middle')
                    .attr('transform', `translate(${width / 2}, 45)`)
                    .attr('fill', 'black')
                    .text(`${assets.YAxisColumnName}`);

                // exit()
                this.selectAll('.point')
                    .data(params.data)
                    .exit()
                    .remove();
            }
        }
    }
</script>

<style>

</style>