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

            // Chart dimensions ----------------------------------------------------------------------------------------
            let w = 573;
            let h = 170;

            // Configure chart margins ---------------------------------------------------------------------------------
            let margin = { top: 10, right: 20, bottom: 30, left: 30 };

            // Configure chart dimensions based on data in relation to the margins -------------------------------------
            let width = w - margin.left - margin.right;
            let height = h - margin.top - margin.bottom;

            // Get Domain Range Values
            let xDomain = d3.extent(data, d => new Date().setUTCFullYear(d.year));
            let yDomain = d3.extent(data, d => d.amount);

            // Create Chart Scale --------------------------------------------------------------------------------------
            let xScale = d3.scaleTime()
                .domain(xDomain)
                .range([0, width]);

            let yScale = d3.scaleLinear()
                .domain(yDomain)
                .range([height, 0]);

            let area = d3.area()
                .x(d => xScale(new Date().setUTCFullYear(d.year)))
                .y0(height)
                .y1(d => yScale(d.amount));

            let line = d3.line()
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
                .ticks(3);

            let xGridLines = d3.axisBottom(xScale)
                .tickSize(-height, 0, 0)
                .tickFormat('');

            console.log(JSON.stringify(data));

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
                // Build Chart -----------------------------------------------------------------------------------------
                this.append('g')
                    .call(params.gridLines.y)
                    .classed('grid-line', true);

                this.append('g')
                    .attr('transform', `translate(0, ${height})`)
                    .call(params.gridLines.x)
                    .classed('grid-line', true);

                this.append('g')
                    .classed('x axis', true)
                    .classed('heavy', true)
                    .attr('transform', `translate(0, ${height})`)
                    .call(params.axis.x);

                this.append('g')
                    .classed('y axis', true)
                    .classed('heavy', true)
                    .call(params.axis.y);

                // Add visual elements to chart ------------------------------------------------------------------------
                // enter()
                this.selectAll('.area')
                    .data([params.data])
                    .enter()
                    .append('path')
                    .classed('area', true);

                this.selectAll('.poop-line')
                    .data([params.data])
                    .enter()
                        .append('path')
                        .classed('poop-line', true);

                // update
                this.selectAll('.area')
                    .attr('d', d => area(d))
                    .attr('fill', '#80B3E1')
                    .attr('opacity', 0.75);

                this.selectAll('.poop-line')
                    .attr('d', d => line(d))
                    .attr('fill', 'none')
                    .attr('stroke', '#80B3E1')
                    .attr('stroke-width', 1)

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

            // OLD CHART CODE---------
            // -----------------------

            // Get Domain Range Values
            // var x = d3.scale.linear()
            //     .range([0, width]);
            //
            // var y = d3.scale.linear()
            //     .range([height, 0]);

            // var xAxis = d3.svg.axis()
            //     .scale(x)
            //     .ticks(7)
            //     .tickFormat("")
            //     .innerTickSize(-height)
            //     .outerTickSize(0)
            //     .tickPadding(10);
            //
            // var yAxis = d3.svg.axis()
            //     .scale(y)
            //     .ticks(7)
            //     .orient("left")
            //     .tickFormat(d3.format("s"))
            //     .innerTickSize(-width)
            //     .outerTickSize(0)
            //     .tickPadding(10);

            // var svg = d3.select("#placeholder2")
            //     .append("svg")
            //     .attr("width", width + margin.left + margin.right)
            //     .attr("height", height + margin.top + margin.bottom)
            //     .append("g")
            //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // var entries = d3.entries(data);
            //
            // var maxYear = Math.max.apply(null, (Object.keys(data.investmentMonthData).map(function(key) { return key.substr(0, 4); })));
            //
            // var sixYearsAgo = (maxYear - 5);
            //
            // var minX = d3.min(entries, function(kv) {
            //     return Number(sixYearsAgo);
            // });
            //
            // var maxX = d3.max(entries, function(kv) {
            //     return Number((maxYear));
            // });
            //
            // var minYdata = d3.min(entries, function(kv) {
            //     var entry = d3.entries(kv.value);
            //     return d3.min(entry, function(d) {
            //         if (d.value !== null){
            //             return Number(d.value);
            //         }
            //     });
            // });
            //
            // var maxYdata = d3.max(entries, function(d) {
            //     var entry = d3.entries(d.value);
            //     return d3.max(entry, function(d2) {
            //         return Number(d2.value);
            //     });
            //
            // });
            // var minY = minYdata - 5*(maxYdata - minYdata)/100;
            // var maxY = maxYdata + 5*(maxYdata - minYdata)/100;
            //
            // var lineFunction = d3.svg.line()
            //     .defined(function(d) {
            //         if(Number(d.value) !== null){
            //             if(Number(d.value) !== 0){
            //                 var res = Number(d.key.substr(0,4));
            //                 var res2 = Number(d.key.substr(5,2));
            //                 return res + (res2*.01) > (minX-.89);
            //             }
            //         }
            //     })
            //     .x(function(d) {
            //         var res = Number(d.key.substr(0,4));
            //         var res2 = Number(d.key.substr(5,2)) * .08333;
            //         return x(res + res2);
            //     })
            //     .y(function(d) {
            //         return y(d.value);
            //     });
            //
            // var area = d3.svg.area()
            //     .defined(function(d) {
            //         if(Number(d.value) !== null){
            //             if(Number(d.value) !== 0){
            //                 var res = Number(d.key.substr(0,4));
            //                 var res2 = Number(d.key.substr(5,2));
            //                 return res + (res2*.01) > (minX-.89);
            //             }
            //         }
            //     })
            //     .x(function(d) {
            //         var res = Number(d.key.substr(0, 4));
            //         var res2 = Number(d.key.substr(5, 2)) * .08333;
            //         return x(res + res2);
            //     })
            //     .y0(height)
            //     .y1(function(d) {
            //         return y(d.value);
            //     });
            //
            //
            //
            // x.domain([minX, maxX + 1]);
            // y.domain([minY, maxY]);
            //
            // var element = svg.selectAll(".element")
            //     .data(entries)
            //     .enter().append("g");
            // //.attr("class", "element");
            //
            // var element2 = svg.selectAll(".element2")
            //     .data(entries)
            //     .enter().append("g");
            // //.attr("class", "element2");
            //
            // var element3 = svg.selectAll(".element3")
            //     .data(entries)
            //     .enter().append("g");
            // //.attr("class", "element3");
            //
            // var element4 = svg.selectAll(".element4")
            //     .data(entries)
            //     .enter().append("g");
            // //.attr("class", "element4");
            //
            // var element5 = svg.selectAll(".element5")
            //     .data(entries)
            //     .enter().append("g");
            // //.attr("class", "element5");
            //
            // element.append("path")
            //     .attr("class", "area")
            //     .attr("d", function(d) {
            //         var entry = d3.entries(d.value);
            //         return area(entry);
            //     })
            //     .attr("fill", function(d) {
            //         var fill = "";
            //         if (d.key == "investmentMonthData") {
            //             fill = "#dbe2f2";
            //         }  else if (d.key == "bestFitIndexMonthBenchmark"){
            //             fill = "none";
            //         } else if (d.key == "broadIndexMonthBenchmark") {
            //             fill = "none";
            //         } else if (d.key == "peerGroupIndexMonthBenchmark") {
            //             fill = "none";
            //         }
            //         return fill;
            //     });
            //
            // element2.append("path")
            //     .attr("class", "area")
            //     .attr("d", function(d) {
            //         var entry = d3.entries(d.value);
            //         return lineFunction(entry);
            //     })
            //     .attr("class", function(d) {
            //         var cName = "";
            //         if (d.key == "investmentMonthData"){
            //             cName = "hide";
            //         }
            //         else if (d.key == "bestFitIndexMonthBenchmark"){
            //             cName = "hide";
            //         }
            //         else if (d.key == "broadIndexMonthBenchmark"){
            //             cName = "hide";
            //         }
            //         else if (d.key == "peerGroupIndexMonthBenchmark"){
            //             cName = "line4";
            //         }
            //         return cName;
            //     });
            //
            // element3.append("path")
            //     .attr("class", "area")
            //     .attr("d", function(d) {
            //         var entry = d3.entries(d.value);
            //         return lineFunction(entry);
            //     })
            //     .attr("class", function(d) {
            //         var cName = "";
            //         if (d.key == "investmentMonthData") {
            //             cName = "hide";
            //         } else if (d.key == "bestFitIndexMonthBenchmark") {
            //             cName = "line2";
            //         } else if (d.key == "broadIndexMonthBenchmark") {
            //             cName = "hide";
            //         } else if (d.key == "peerGroupIndexMonthBenchmark") {
            //             cName = "hide";
            //         }
            //         return cName;
            //     });
            // element4.append("path")
            //     .attr("class", "area")
            //     .attr("d", function(d) {
            //         var entry = d3.entries(d.value);
            //         return lineFunction(entry);
            //     })
            //     .attr("class", function(d) {
            //         var cName = "";
            //         if (d.key == "investmentMonthData") {
            //             cName = "hide";
            //         } else if (d.key == "bestFitIndexMonthBenchmark") {
            //             cName = "hide";
            //         } else if (d.key == "broadIndexMonthBenchmark") {
            //             cName = "line3";
            //         } else if (d.key == "peerGroupIndexMonthBenchmark") {
            //             cName = "hide";
            //         }
            //         return cName;
            //     });
            //
            // element5.append("path")
            //     .attr("class", "area")
            //     .attr("d", function(d) {
            //         var entry = d3.entries(d.value);
            //         return lineFunction(entry);
            //     })
            //     .attr("class", function(d) {
            //         var cName = "";
            //         if (d.key == "investmentMonthData") {
            //             cName = "line1";
            //         } else if (d.key == "bestFitIndexMonthBenchmark") {
            //             cName = "hide";
            //         } else if (d.key == "broadIndexMonthBenchmark") {
            //             cName = "hide";
            //         } else if (d.key == "peerGroupIndexMonthBenchmark") {
            //             cName = "hide";
            //         }
            //         return cName;
            //     });
            //
            // element.append("g")
            //     .attr("class", "x axis")
            //     .attr("transform", "translate(0," + height + ")")
            //     .call(xAxis);
            //
            // element.append("g")
            //     .attr("class", "y axis")
            //     .call(yAxis);
            //
            // element.selectAll("g").filter(function(d) {
            //     return d;
            // }).classed("minor", true);
            //
            // element.append("line")
            //     .attr("x1", 0)
            //     .attr("y1", 0)
            //     .attr("x2", 0)
            //     .attr("y2", height)
            //     .attr("stroke-width", 1)
            //     .attr("stroke", "black");
            //
            // element.append("line")
            //     .attr("x1", 0)
            //     .attr("y1", height-.5)
            //     .attr("x2", width+1)
            //     .attr("y2", height)
            //     .attr("stroke-width", 1)
            //     .attr("stroke", "black");
            //
            // element.append("line")
            //     .attr("x1", width)
            //     .attr("y1", 0)
            //     .attr("x2", width)
            //     .attr("y2", height)
            //     .attr("stroke-width", 1)
            //     .attr("stroke", "black");
            //
            //
            // element.append("line")
            //     .attr("x1", 0)
            //     .attr("y1", 0)
            //     .attr("x2", width)
            //     .attr("y2", 0)
            //     .attr("stroke-width", 1)
            //     .attr("stroke", "black");
            //
            // for (i = 1; i < 72; i++) {
            //     element2.append("line")
            //         .attr("x1", [i] * 6.04)
            //         .attr("y1", height - .2)
            //         .attr("x2", [i] * 6.04)
            //         .attr("y2", height - 3)
            //         .attr("stroke-width", 1)
            //         .attr("stroke", "#c3cad9")
            //         .attr("stroke-opacity", "1");
            // }
        }
    }
</script>

<style scoped>

</style>