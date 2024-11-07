pipeline {
    stage('Clean workspace') {
        steps {
            cleanWs()
        }
    }
    agent any
    tools { nodejs "NodeJS" }
    environment {
        GITHUB_TOKEN = credentials('github-token')
    }
    stages {
        stage('Clone Repository') {
            steps {
                script {
                    // Clonage avec le token en utilisant l'URL HTTPS
                    git url: 'https://github.com/JoeMartinezMontoya/petscare-frontend.git', 
                        branch: 'develop', // Utiliser la branche active
                        credentialsId: 'github-token'
                }
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
            when {
                expression { BRANCH_NAME == 'develop' || BRANCH_NAME.startsWith('feature/') }
            }
            steps {
                // Exécution des tests uniquement pour `develop` et `feature/*`
                dir('petscare-frontend') {
                    sh 'npm test'
                }
            }
        }
        stage('Build for Production') {
            when {
                branch 'main' // ou 'master' si c'est ta branche de production
            }
            steps {
                // Construction pour la production uniquement pour la branche `main` (ou `master`)
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
