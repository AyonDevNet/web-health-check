pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKERHUB_USERNAME = 'ayon077' 
        IMAGE_NAME = 'web-health'
        VERSION_FILE = 'version.txt'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Get Version') {
            steps {
                script {
                    // Read current version or start with 1.0
                    if (fileExists(VERSION_FILE)) {
                        def currentVersion = readFile(VERSION_FILE).trim()
                        echo "Current version: ${currentVersion}"
                        
                        def versionParts = currentVersion.tokenize('.')
                        def major = versionParts[0].toInteger()
                        def minor = versionParts[1].toInteger()
                        
                        // Increment minor version
                        minor++
                        env.NEW_VERSION = "${major}.${minor}"
                    } else {
                        env.NEW_VERSION = "1.0"
                    }
                    
                    echo "Building NEW version: ${env.NEW_VERSION}"
                    
                    // Save new version to file
                    writeFile file: VERSION_FILE, text: env.NEW_VERSION
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building image: ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${env.NEW_VERSION}"
                    sh """
                        docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${env.NEW_VERSION} .
                        docker tag ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${env.NEW_VERSION} ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest
                    """
                    echo "Image built successfully with version ${env.NEW_VERSION}"
                }
            }
        }
        
        stage('Login to DockerHub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        
        stage('Push to DockerHub') {
            steps {
                script {
                    echo "Pushing version: ${env.NEW_VERSION}"
                    sh """
                        docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${env.NEW_VERSION}
                        docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest
                    """
                    echo "Successfully pushed ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${env.NEW_VERSION}"
                }
            }
        }
        
        stage('Run Container') {
            steps {
                script {
                    echo "Deploying container with version ${env.NEW_VERSION}"
                    sh """
                        # Stop and remove old container if exists
                        docker stop ${IMAGE_NAME} || true
                        docker rm ${IMAGE_NAME} || true
                        
                        # Run new container
                        docker run -d --name ${IMAGE_NAME} -p 5000:5000 ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${env.NEW_VERSION}
                    """
                    echo "Container running with version ${env.NEW_VERSION}"
                }
            }
        }
    }
    
    post {
        always {
            sh 'docker logout'
        }
        success {
            echo "=========================================="
            echo "Pipeline succeeded!"
            echo "New version: ${env.NEW_VERSION}"
            echo "Image: ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${env.NEW_VERSION}"
            echo "Check DockerHub: https://hub.docker.com/r/${DOCKERHUB_USERNAME}/${IMAGE_NAME}/tags"
            echo "=========================================="
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}
