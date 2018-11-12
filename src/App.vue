<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Vue.js</a>
      <button class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
    <GitHubIssues></GitHubIssues>
  </div>
</template>

<script>
import GitHubIssues from './components/GitHubIssues.vue'

export default {
  name: 'app',
  components: {
      GitHubIssues
  }
}
</script>

<style>
</style>
