<template>
    <div id="app">
        <div id="nav">
            <router-link to="/area-line-chart">Area Line Chart</router-link>
            |
            <router-link to="/scatter-plot">Scatter Plot</router-link>
            |
            <router-link to="/bar-graph">Bar Graph</router-link>
            |
            <router-link to="/column-chart">Column Chart</router-link>
        </div>
        <router-view/>
    </div>
</template>

<style lang="stylus">
    @import 'styles/main.styl';
</style>
