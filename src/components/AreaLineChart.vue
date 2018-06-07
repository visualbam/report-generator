<template>
    <div class="container">
        <h1>Area Line Chart</h1>
        <br>
        <div class="base--area-line-chart"></div>
    </div>
</template>

<script>
    import * as d3 from 'd3';
    import { growthData } from '../mock-data/growthData';

    export default {
        name: "AreaLineChart",
        mounted: () => {
            // Growth of 10k Chart
            var data = growthData;
            var allInvestments = [];

            // Aggregate all investments to scale chart
            growthData.forEach(data => allInvestments.push(data.investments));
            allInvestments = [].concat(...allInvestments);

            // Chart dimensions ----------------------------------------------------------------------------------------
            var w = 573;
            var h = 170;

            // Configure chart margins ---------------------------------------------------------------------------------
            var margin = { top: 20, right: 40, bottom: 40, left: 30 };

            // Configure chart dimensions based on data in relation to the margins -------------------------------------
            var width = w - margin.left - margin.right;
            var height = h - margin.top - margin.bottom;

            var offSetMonthByOne = (allInvestments.length % 12 === 0) ? 1 : 0;

            // Get Domain Range Values
            var xDomain = [
                d3.min(allInvestments, i => new Date(i.monthEndDate)),
                d3.timeYear.offset(d3.max(allInvestments, i => new Date(i.monthEndDate)), offSetMonthByOne)
            ];

            var yDomain = [5000, Math.ceil(d3.max(allInvestments, i => i.amount) / 10000) * 10000];

            // Create Chart Scale --------------------------------------------------------------------------------------
            var xScale = d3.scaleTime()
                .domain(xDomain)
                .rangeRound([0, width]);

            var yScale = d3.scaleLinear()
                .domain(yDomain)
                .rangeRound([height, 0]);

            // Create path generators
            var areaGenerator = d3.area()
                .x(d => xScale(new Date(d.monthEndDate)))
                .y0(height)
                .y1(d => yScale(d.amount));

            var lineGenerator = d3.line()
                .x(d => xScale(new Date(d.monthEndDate)))
                .y(d => yScale(d.amount));

            // SVG Creation --------------------------------------------------------------------------------------------
            var svg = d3.select('.base--area-line-chart').append('svg')
                .attr('id', 'chart')
                .attr('width', w)
                .attr('height', h);

            var chart = svg.append('g')
                .classed('display', true)
                .attr('transform', `translate(${margin.left}, ${margin.top})`)

            // Create Axis ---------------------------------------------------------------------------------------------
            var xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10).ticks(d3.timeYear.every(1));
            var yAxis = d3.axisLeft(yScale).tickSize(0).tickPadding(10).ticks(3).tickFormat(d3.format('~s'));

            // Create Grid lines ---------------------------------------------------------------------------------------
            var yGridLines = d3.axisLeft(yScale)
                .tickSize(-width, 0, 0)
                .tickFormat('')
                .ticks(3);

            var xGridLines = d3.axisBottom(xScale)
                .tickSize(-height, 0, 0)
                .tickFormat('');

            // Plot Chart ----------------------------------------------------------------------------------------------
            plot.call(chart, {
                areaGenerator: areaGenerator,
                axis: {
                    x: xAxis,
                    y: yAxis
                },
                data: data,
                gridLines: {
                    x: xGridLines,
                    y: yGridLines
                },
                lineGenerator: lineGenerator,
                scale: {
                    x: xScale,
                    y: yScale
                }
            });

            function plot(params) {
                params.data.forEach((d, index) => {
                    var selector = d.investmentType.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z ]/g, '');
                    // enter()
                    this.selectAll(`${selector}-area`)
                        .data([d.investments])
                        .enter()
                        .append('path')
                        .classed(`${selector}-area area-line`, true);

                    // update()
                    this.selectAll(`.${selector}-area`)
                        .attr('d', d => params.areaGenerator(d))
                        .attr('fill', () => '#EFF4F9');
                });

                // Add grid lines to chart -----------------------------------------------------------------------------------
                this.append('g')
                    .call(params.gridLines.y)
                    .classed('grid-line grid-line-y', true);

                this.append('g')
                    .attr('transform', `translate(0, ${height})`)
                    .call(params.gridLines.x)
                    .classed('grid-line grid-line-x', true);

                params.data.forEach((d, index) => {
                    var selector = d.investmentType.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z ]/g, '');

                    // enter()
                    this.selectAll(`${selector}-line`)
                        .data([d.investments])
                        .enter()
                        .append('path')
                        .classed(`${selector}-line`, true);

                    // update()
                    this.selectAll(`.${selector}-line`)
                        .attr('d', d => params.lineGenerator(d))
                        .attr('fill', 'none')
                        .attr('stroke', () => params.data[index].color)
                        .attr('stroke-width', 2)
                });

                // Add axis to chart -----------------------------------------------------------------------------------
                this.append('g')
                    .classed('x axis', true)
                    .classed('heavy', true)
                    .attr('transform', `translate(0, ${height})`)
                    .call(params.axis.x);

                this.append('g')
                    .classed('y axis', true)
                    .classed('heavy', true)
                    .call(params.axis.y);

                this.selectAll('.x text')
                    .attr("x", 10)
                    .style("text-anchor", "start");

                // exit()
                this.selectAll('.area')
                    .data([params.data])
                    .exit()
                    .remove();

                this.selectAll('.poop-line')
                    .data([params.data])
                    .exit()
                    .remove();

                this.selectAll('.tick')
                    .filter(d => d === 5000)
                    .remove();
            }
        }
    }
</script>

<style scoped>

</style>