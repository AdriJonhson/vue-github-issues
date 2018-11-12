<template>
    <div class="container">
        <h1>Vue.js + Github</h1>
        <p class="lead">
            Página que lista issues de um repositório do Github, usando Vue.js.
        </p>

        <div class="row">
            <div class="col">
                <div class="form-group">
                    <input v-model="username" type="text" class="form-control" placeholder="github username">
                </div>
            </div>

            <div class="col">
                <div class="form-group">
                    <input v-model="repository" type="text" class="form-control" placeholder="github repositório">
                </div>
            </div>

            <div class="col-3">
                <div class="form-group">
                    <button @click.prevent.stop="getIssues()" class="btn btn-success">GO</button>
                    &nbsp;
                    <button @click.prevent.stop="reset()" class="btn btn-danger">LIMPAR</button>
                </div>
            </div>
        </div>

        <br><hr><br>

        <template v-if="selectedIssue.id">
            <h2>{{ selectedIssue.title }}</h2>
            <div>{{selectedIssue.body}}</div>
            <a href="" @click.prevent.stop="clearIssue()" class="btn btn-primary">Voltar</a>
        </template>

        <table class="table table-sm table-bordered" v-if="!selectedIssue.id">
            <thead>
            <tr>
                <th width="100">Número</th>
                <th>Título</th>
            </tr>
            </thead>

            <tbody>
                <tr v-if="loader.getIssues || loader.getIssue">
                    <td colspan="2" class="text-center"><img src="/static/loading.svg" alt="loading"></td>
                </tr>

                <template v-if="!loader.getIssue">
                    <tr  v-for="issue in issues" :key="issue.number">
                        <td>
                            <a href="" @click.prevent.stop="getIssue(issue.number)">{{ issue.number }}</a>
                            <img v-if="issue.is_loading" src="/static/loading.svg" alt="loading">
                        </td>
                        
                        <td>{{ issue.title }}</td>
                    </tr>
                </template>

                <tr v-if="!!!issues.length && !loader.getIssues">
                    <td class="text-center" colspan="2">Nenhuma issue encontrada!</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'GitHubIssues',

        data(){
            return{
                username: '',
                repository: '',
                issues: [],
                selectedIssue: {},

                loader: {
                    getIssues: false,
                    getIssue: false,
                },
            }
        },

        methods: {
            reset(){
                this.username = '';
                this.repository = '';
                this.issues = [];
            },

            getIssues(){
                if(this.username && this.repository){
                    this.loader.getIssues = true;
                    this.issues = [];
                    const URL = `https://api.github.com/repos/${this.username}/${this.repository}/issues`;
                    axios.get(URL)
                        .then((response) => {
                            this.issues = response.data;
                        }).finally(() => {
                            this.loader.getIssues = false;
                        });
                }
            },

            getIssue(issueId){
                if(this.username && this.repository){
                    //this.loader.getIssue = true;
                    const URL = `https://api.github.com/repos/${this.username}/${this.repository}/issues/${issueId}`;
                    axios.get(URL)
                        .then((response) => {
                            this.selectedIssue = response.data;
                        }).finally(() => {
                            //this.loader.getIssue = false;
                    });
                }
            },

            clearIssue(){
                this.selectedIssue = {};
            },
        }
    }
</script>
