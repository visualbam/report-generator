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
            let data = growthData;
            let allInvestments = [];

            // Aggregate all investments to scale chart
            growthData.forEach(data => allInvestments.push(data.investments));
            allInvestments = [].concat(...allInvestments);

            // Chart dimensions ----------------------------------------------------------------------------------------
            let w = 573;
            let h = 170;

            // Configure chart margins ---------------------------------------------------------------------------------
            let margin = { top: 10, right: 20, bottom: 30, left: 30 };

            // Configure chart dimensions based on data in relation to the margins -------------------------------------
            let width = w - margin.left - margin.right;
            let height = h - margin.top - margin.bottom;

            // Get Domain Range Values
            let xDomain = d3.extent(allInvestments, i => new Date().setUTCFullYear(i.year));
            let yDomain = [0, d3.max(allInvestments, i => i.amount)]

            // Create Chart Scale --------------------------------------------------------------------------------------
            let xScale = d3.scaleTime()
                .domain(xDomain)
                .rangeRound([0, width]);

            let yScale = d3.scaleLinear()
                .domain(yDomain)
                .rangeRound([height, 0]);

            // Create path generators
            let areaGenerator = d3.area()
                .x(d => xScale(new Date().setUTCFullYear(d.year)))
                .y0(height)
                .y1(d => yScale(d.amount));

            let lineGenerator = d3.line()
                .x(d => xScale(new Date().setUTCFullYear(d.year)))
                .y(d => yScale(d.amount));

            // SVG Creation --------------------------------------------------------------------------------------------
            let svg = d3.select('.base--area-line-chart').append('svg')
                .attr('id', 'chart')
                .attr('width', w)
                .attr('height', h);

            let chart = svg.append('g')
                .classed('display', true)
                .attr('transform', `translate(${margin.left}, ${margin.top})`)

            // Create Axis ---------------------------------------------------------------------------------------------
            let xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10).ticks(10).tickFormat(d3.timeFormat('%Y'));
            let yAxis = d3.axisLeft(yScale).tickSize(0).tickPadding(10).ticks(4).tickFormat(d3.format('~s'));

            // Create Grid lines ---------------------------------------------------------------------------------------
            let yGridLines = d3.axisLeft(yScale)
                .tickSize(-width, 0, 0)
                .tickFormat('')
                .ticks(4);

            let xGridLines = d3.axisBottom(xScale)
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
                // Add elements to chart ------------------------------------------------------------------------
                params.data.forEach((d, index) => {
                    let selector = d.investmentType.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z ]/g, '');

                    // enter()
                    this.selectAll(`${selector}-area`)
                        .data([d.investments])
                        .enter()
                        .append('path')
                        .classed(`${selector}-area area-line`, true);

                    this.selectAll(`${selector}-line`)
                        .data([d.investments])
                        .enter()
                        .append('path')
                        .classed(`${selector}-line`, true);

                    // update()
                    this.selectAll(`.${selector}-area`)
                        .attr('d', d => params.areaGenerator(d))
                        .attr('fill', () => '#EDF5FA');

                    this.selectAll(`.${selector}-line`)
                        .attr('d', d => lineGenerator(d))
                        .attr('fill', 'none')
                        .attr('stroke', () => params.data[index].color)
                        .attr('stroke-width', 2)
                });

                // Add axis to chart -----------------------------------------------------------------------------------
                this.append('g')
                    .call(params.gridLines.y)
                    .classed('grid-line grid-line-y', true);

                this.append('g')
                    .attr('transform', `translate(0, ${height})`)
                    .call(params.gridLines.x)
                    .classed('grid-line grid-line-x', true);

                this.append('g')
                    .classed('x axis', true)
                    .classed('heavy', true)
                    .attr('transform', `translate(0, ${height})`)
                    .call(params.axis.x);

                this.append('g')
                    .classed('y axis', true)
                    .classed('heavy', true)
                    .call(params.axis.y);

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
                .filter(d => d === 0)
                .remove();
            }
        }
    }
</script>

<style scoped>

</style>