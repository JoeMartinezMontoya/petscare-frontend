pipeline {
    agent any
    tools { nodejs "NodeJS 18.20.0" }
    environment {
        GITHUB_TOKEN = credentials('github-token') // Assure-toi que l'ID correspond à celui configuré dans Jenkins
    }
    stages {
        stage('Clone Repository') {
            steps {
                // Clonage avec le token en utilisant l'URL HTTPS
                git url: 'https://github.com/JoeMartinezMontoya/petscare-frontend.git', 
                    branch: 'main', 
                    credentialsId: 'github-token'
            }
        }
        stage('Install Dependencies') {
            steps {
                // Installation des dépendances
                dir('petscare-frontend') {
                    sh 'npm install'
                }
            }
        }
        stage('Run Tests') {
            steps {
                // Exécution des tests
                dir('petscare-frontend') {
                    sh 'npm test'
                }
            }
        }
        stage('Build for Production') {
            steps {
                // Construction pour la production
                dir('petscare-frontend') {
                    sh 'npm run build'
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
