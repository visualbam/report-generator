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
            let data = investments;

            data.map(d => mapNegativeValuesToZero(d));

            // Chart dimensions ----------------------------------------------------------------------------------------

            let w = 700;
            let h = 275;

            // Configure chart margins ---------------------------------------------------------------------------------

            let margin = {top: 20, bottom: 65, left: 50, right: 20};

            // Configure chart dimensions based on data in relation to the margins -------------------------------------

            let width = w - margin.left - margin.right;
            let height = h - margin.top - margin.bottom;

            // Get Domain Range Values
            let genXValue = Math.ceil(((d3.max(data, d => d.StandardDeviatrionThreeYear) + 5) / 5) * 5);
            let genYValue = Math.ceil(((d3.max(data, d => d.ThreeYearReturn) + 5) / 5) * 5);
            let xDomain = [0, 2 * Math.round(genXValue / 2)];
            let yDomain = [0, 2 * Math.round(genYValue / 2)];

            // Create Chart Scale --------------------------------------------------------------------------------------

            let xScale = d3.scaleLinear()
                .domain(xDomain)
                .range([0, width])
                .nice();

            let yScale = d3.scaleLinear()
                .domain(yDomain)
                .range([height, 0])
                .nice();

            // Create Color Scale --------------------------------------------------------------------------------------

            let linearColorScale = d3.scaleLinear()
                .domain([0, data.length])
                .range(['#572500', '#f68026']);

            let ordinalColorScale = d3.scaleOrdinal(d3.schemeCategory10);

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
            let yTickValue = setTickValues(yDomain[1], 6);

            let formatXAxis = setFormatAxis(xTickValue);
            let formatYAxis = setFormatAxis(yTickValue);

            let xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10).ticks(xTickValue).tickFormat(formatXAxis);
            let yAxis = d3.axisLeft(yScale).tickSize(0).tickPadding(10).ticks(yTickValue).tickFormat(formatYAxis);

            // Create Grid lines ---------------------------------------------------------------------------------------

            let yGridLines = d3.axisLeft(yScale)
                .tickSize(-width, 0, 0)
                .tickFormat('')
                .ticks(yTickValue);

            let xGridLines = d3.axisBottom(xScale)
                .tickSize(-height, 0, 0)
                .tickFormat('')
                .ticks(xTickValue);

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

            function setFormatAxis(tickValue) {
                tickValue === 4 ? d3.format('') : d3.format('d');
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
                    .attr('r', 10)
                    .attr('stroke-width', 1)
                    .attr('fill', d => d.Color)
                    .attr('stroke', d => lighten(d.Color, 60))
                    .attr('cx', d => params.scale.x(d.StandardDeviatrionThreeYear))
                    .attr('cy', d => params.scale.y(d.ThreeYearReturn));

                this.select('.y.axis')
                    .append('text')
                    .attr('x', 0)
                    .attr('y', -10)
                    .classed('heavy', true)
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'black')
                    // Translate label to be positioned at half the height of the chart (middle) & rotate 90 degrees
                    .attr('transform', `translate(-30, ${height / 2}) rotate(-90)`)
                    .text('RETURN 3 YR %');

                this.select('.x.axis')
                    .append('text')
                    .attr('x', 0)
                    .attr('y', 0)
                    .classed('heavy', true)
                    .attr('text-anchor', 'middle')
                    .attr('transform', `translate(${width / 2}, 45)`)
                    .attr('fill', 'black')
                    .text('STANDARD DEVIATION 3 YR %');

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