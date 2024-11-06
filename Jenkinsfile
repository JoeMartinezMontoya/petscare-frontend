pipeline {
    agent any
    environment {
        GIT_SSH_KEY = credentials('GitHub-SSH-Key')
    }
    stages {
        stage('Clone Repository') {
            steps {
                sshagent([env.GIT_SSH_KEY]) {
                    git url: 'git@github.com:ton-utilisateur/petscare-frontend.git', branch: 'main'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    dir('petscare-frontend') {
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    dir('petscare-frontend') {
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Build for Production') {
            steps {
                script {
                    dir('petscare-frontend') {
                        sh 'npm run build'
                    }
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for errors.'
        }
    }
}
