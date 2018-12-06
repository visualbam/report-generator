<template>
    <div id="app">
        <div id="nav">
            <router-link to="/pie-chart">Pie Chart</router-link>
            |
            <router-link to="/area-line-chart">Area Line Chart</router-link>
            |
            <router-link to="/cross-scatter-plot">Cross Scatter Plot</router-link>
            |
            <router-link to="/scatter-plot">Scatter Plot</router-link>
            |
            <router-link to="/scatter-plot-score-summary">Scatter Plot Score Summary</router-link>
            |
            <router-link to="/bar-graph">Bar Graph</router-link>
            |
            <router-link to="/column-chart">Column Chart</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "Application",
        created() {
            this.$router.push('scatter-plot-score-summary');
        }
    }
</script>

<style lang="stylus">
    @import 'styles/main.styl';
</style>
