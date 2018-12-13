<template>
    <div class="container">
        <h1>Vue.js + Github</h1>
        <p class="lead">
            Página que lista issues de um repositório do Github, usando Vue.js.
        </p>

        <div v-if="response.status === 'error'" class="alert alert-danger">
            {{ response.message }}
        </div>

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

        <table class="table table-sm table-bordered">
            <thead>
            <tr>
                <th width="100">Número</th>
                <th>Título</th>
            </tr>
            </thead>

            <tbody>
            <tr v-if="showIssues">
                <td colspan="2" class="text-center"><img src="/static/loading.svg" alt="loading"></td>
            </tr>

            <template v-if="!loader.getIssue">
                <tr v-for="issue in issues" :key="issue.number">
                    <td>
                        <router-link :to="{name: 'GitHubIssue',
                                                params: {
                                                    name: username,
                                                    repo: repository,
                                                    issue:issue.number
                                                }}">
                            {{ issue.number }}
                        </router-link>
                    </td>

                    <td>{{ issue.title }}</td>
                </tr>
            </template>

            <tr v-if="noIssues">
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

        created(){

        },

        data(){
            return{
                username: '',
                repository: '',
                issues: [],
                response: {
                    status: '',
                    message: ''
                },

                loader: {
                    getIssues: false,
                    getIssue: false,
                },
            }
        },

        computed: {
            showIssues(){
                return this.loader.getIssues || this.loader.getIssue;
            },

            noIssues(){
                return !this.issues.length && !this.loader.getIssues
            }
        },

        methods: {
            reset(){
                this.username = '';
                this.repository = '';
                this.issues = [];
                this.resetResponse();
                localStorage.removeItem("gitHubIssues");
            },

            getIssues(){
                this.resetResponse();
                this.issues = [];

                if(this.username && this.repository){
                    localStorage.setItem('gitHubIssues', JSON.stringify({username: this.username, repository: this.repository}));
                    this.loader.getIssues = true;
                    this.issues = [];
                    const URL = `https://api.github.com/repos/${this.username}/${this.repository}/issues`;
                    axios.get(URL)
                        .then((response) => {
                            this.issues = response.data;

                        }).catch((error) => {
                            /* eslint-disable */
                            console.log(error);
                            this.response.status    = 'error';
                            this.response.message   = 'Repósitorio não existe!';
                        })
                        .finally(() => {
                        this.loader.getIssues = false;
                    });
                }
            },

            getLocalData(){
                const localData = JSON.parse(localStorage.getItem('gitHubIssues'));
                if(localData && localData.username && localData.repository){
                    this.username   = localData.username;
                    this.repository = localData.repository;
                    this.getIssues();
                }
            },

            resetResponse(){
                this.response.status = '';
                this.response.error  = '';
            }

        }
    }
</script>
