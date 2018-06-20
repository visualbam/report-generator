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

            // data.forEach(d => {
            //     let earliestInvestmentYear = d3.min(d.investments, i => i.monthEndDate.split(', ')[1]);
            //     let latestInvestmentYear = d3.max(d.investments, i => i.monthEndDate.split(', ')[1]);
            //
            //     d.investments = d.investments.filter(i => {
            //         if (latestInvestmentYear - earliestInvestmentYear > 10) {
            //             return i.monthEndDate.split(', ')[1] > (latestInvestmentYear - 10);
            //         }
            //         return true;
            //     });
            // });

            // Aggregate all investments to scale chart
            data.forEach((d, i) => allInvestments.push(d.investments));
            allInvestments = [].concat(...allInvestments);

            // Add beginning of year and end of year to get accurate start / end
            var earliestInvestmentYear = d3.min(allInvestments, i => i.monthEndDate.split(', ')[1]);
            var latestInvestmentYear = parseFloat(d3.max(allInvestments, i => i.monthEndDate.split(', ')[1]));
            var yearDifference = latestInvestmentYear - earliestInvestmentYear;

            if (yearDifference > 10) {
                // when we have a diff of 10, we need to show every 2 years.
                // this rounds to the nearest odd year value to scale chart evenly
                latestInvestmentYear = 2 * Math.floor(latestInvestmentYear / 2) + 1;
            }

            allInvestments.unshift({ amount: 10000, monthEndDate: `January 1, ${earliestInvestmentYear}` });
            allInvestments.push({ amount: 0, monthEndDate: new Date(`December 31, ${latestInvestmentYear}`) });

            // Chart dimensions ----------------------------------------------------------------------------------------
            var w = 446;
            var h = 150;

            // Configure chart margins ---------------------------------------------------------------------------------
            var margin = { top: 10, right: 20, bottom: 40, left: 32 };

            // Configure chart dimensions based on data in relation to the margins -------------------------------------
            var width = w - margin.left - margin.right;
            var height = h - margin.top - margin.bottom;

            // Get Domain Range Values
            var xDomain = d3.extent(allInvestments, i => new Date(i.monthEndDate));

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
            var tickValue = yearDifference > 10 ? 2 : 1;
            var xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10).ticks(d3.timeYear.every(tickValue));
            var yAxis = d3.axisLeft(yScale).tickSize(0).tickPadding(10).ticks(5).tickFormat(d3.format('~s'));

            // Create Grid lines ---------------------------------------------------------------------------------------
            var yGridLines = d3.axisLeft(yScale)
                .tickSize(-width, 0, 0)
                .tickFormat('')
                .ticks(5);

            var xGridLines = d3.axisBottom(xScale)
                .tickSize(-height, 0, 0)
                .tickFormat('')
                .ticks(d3.timeYear.every(tickValue));

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
                // Create area fill based on model. Check for benchmark in case we don't know array position
                var areaFillColor;

                params.data.forEach((d, index) => {
                    var selector = d.investmentType.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z ]/g, '');
                    // enter()
                    this.selectAll(`${selector}-area`)
                        .data([d.investments])
                        .enter()
                        .append('path')
                        .classed(`${selector}-area area-line`, true);

                    // update()
                    if (!d.investmentType.toLowerCase().includes('benchmark')) {
                        this.selectAll(`.${selector}-area`)
                            .attr('d', d => params.areaGenerator(d))
                            .attr('fill', () => areaFillColor = lighten(d.color, 98));
                    }
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

                function positionLabel(yearDifference){
                    switch(yearDifference){
                        case 4: return 22;
                        case 5: return 16;
                        case 6: return 12;
                        case 7: return 8;
                        case 8: return 6;
                        case 9: return 4;
                        case 10: return 2;
                        case 11: return 16;
                        case 12: return 12;
                        case 13: return 12;
                        case 14: return 8;
                        case 15: return 6;
                        case 16: return 4;
                        case 17: return 4;
                        case 18: return 4;
                        case 19: return 2;
                        case 20: return 0;
                    }
                }

                this.selectAll('.x text')
                    .attr("x", positionLabel(yearDifference))
                    .style("text-anchor", "start");

                this.selectAll('.y text')
                    .style("text-transform", "uppercase");

                // exit()
                this.selectAll('.area')
                    .data([params.data])
                    .exit()
                    .remove();

                this.selectAll('.poop-line')
                    .data([params.data])
                    .exit()
                    .remove();

                // this.selectAll('.tick')
                //     .filter(d => d === 0)
                //     .remove();
            }

            function lighten(hsla, lightness) {
                var color = hsla.split(', ');
                var h = color[0].replace(/\D/g,'');
                var s = color[1];
                var l = lightness ? `${lightness}%` : color[2];
                var a = color[3].replace(/\D/g,'');
                return `hsla(${h}, ${s}, ${l}, ${a})`;
            }

            function hex2(c) {
                c = Math.round(c);

                if (c < 0) c = 0;
                if (c > 255) c = 255;

                let s = c.toString(16);
                if (s.length < 2) s = "0" + s;

                return s;
            }

            function color(r, g, b) {
                return "#" + hex2(r) + hex2(g) + hex2(b);
            }

            function shade(col, light) {
                let r = parseInt(col.substr(1, 2), 16);
                let g = parseInt(col.substr(3, 2), 16);
                let b = parseInt(col.substr(5, 2), 16);

                if (light < 0) {
                    r = (1 + light) * r;
                    g = (1 + light) * g;
                    b = (1 + light) * b;
                } else {
                    r = (1 - light) * r + light * 255;
                    g = (1 - light) * g + light * 255;
                    b = (1 - light) * b + light * 255;
                }

                return color(r, g, b);
            }
        }
    }
</script>

<style scoped>

</style>