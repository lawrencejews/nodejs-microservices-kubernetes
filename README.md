## MarketPlace-App 
The market-place application is built with `React`, `Typescript`, `Tailwindcss` for the Frontend and `NodeJS `for the backend
![NodeJS-Microservices-Kubernetes](project_architecture.png)
### Tools for project microservices
These services are required to be executed first so as to prevent errors when you start your microservices
- Killing running processes`sudo lsof -i :portNumber` and `sudo kill PID`
- Run one command to the start services: `docker compose up -d redis mongodb mysql postgres rabbitmq elasticsearch kibana`
- Stop the running services: `docker compose down redis mongodb mysql postgres rabbitmq elasticsearch kibana`
The `marketplace-k8s` folder contains the objects code needed to deploy the microservices to kubernetes.
The microservices are deployed to both `Minikube` and `AWS EKS Cluster`