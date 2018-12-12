import Vue from 'vue'
import Router from 'vue-router'
import GitHubIssues from '@/components/GitHubIssues'
import GitHubIssue from  '@/components/GitHubIssue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'GitHubIssues',
            component: GitHubIssues
        },
        {
            path: '/:name/:repo/:issue',
            name: 'GitHubIssue',
            component: GitHubIssue
        },
    ]
})
