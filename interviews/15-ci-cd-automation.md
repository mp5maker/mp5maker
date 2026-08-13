## CI/CD & Automation

1. CI vs CD

- CI
  - Continuous Integration
  - It means developers frequently integrate their changes into a shared repository and automation verifies those changes

```
Developer pushes code
        ↓
CI pipeline starts
        ↓
Install dependencies
        ↓
Lint
        ↓
Run tests
        ↓
Build
        ↓
Report result
```

- CD
  - Continous Delivery
  - Code is automatically prepared and made ready for deployment, but production deployment may require approval
  - Every change that passes the pipeline can automatically be deployed to production

```
Code
 ↓
Build
 ↓
Test
 ↓
Staging
 ↓
Manual approval
 ↓
Production
```

```
Code
 ↓
Build
 ↓
Test
 ↓
Deploy
 ↓
Production
```

2. CI/CD Pipeline


```
Git Push
   ↓
Checkout
   ↓
Install dependencies
   ↓
Lint
   ↓
Unit Tests
   ↓
Integration Tests
   ↓
Build
   ↓
Security Checks
   ↓
Docker Image
   ↓
Deploy Staging
   ↓
Smoke Tests
   ↓
Production
```

3. Jenins is an automation server commonly used to build CI/CD pipelines

- It pipeline can be represented conceptually as

```
Pipeline
 ├── Checkout
 ├── Install
 ├── Test
 ├── Build
 ├── Deploy
 └── Notify
```

- Jenkings can run these steps on agents


```
Jenkins Controller
       ↓
    Agent
       ↓
Run pipeline
```

4. Jenkins Pipeline

- a pipeline miht contain stages

```
pipeline {
    stages {
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh './deploy.sh'
            }
        }
    }
}
```

```
Stage
 ↓
Steps
 ↓
Agent
 ↓
Result
```

5. Travis CI
  - It is another CI/CD platform
  - traditionally uses .travis.yml
  - jenkins and travis ci, solves same automation problem but their configuration and infrastructure models differ

```
language: node_js

script:
  - npm test
```

6. Ansible

- It is an automation/configuration-management tool

```
SSH
 ↓
Install package
 ↓
Copy files
 ↓
Configure service
 ↓
Restart service
```

```
Ansible
   ↓
Target server
   ↓
Desired configuration
```

7. Ansible Inventory

- Inventory describes the machines ansible manages

```
[web]
web1
web2

[database]
db1
```

- We can organize servers into groups

```
web
database
redis
staging
production
```

8. Ansible Playbook

- A playbook describes what should happen.

```
- hosts: web
  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present
```

```
Playbook
   ↓
Hosts
   ↓
Tasks
   ↓
Modules
```

9. Ansible Tasks

- A Task reprsents an individual operation

```
Install package
Copy configuration
Create directory
Create user
Start service
Restart service
```

```
- name: Start nginx
  service:
    name: nginx
    state: started
```


10. Idempotency

- Running the same automation multiple times should result in the same desired state rather than repeated causing changes


11. Terraform

- It is a ifnrastructure as Code (IaC)
- Instead of manually creating infrastructure throw the AWS console

```
EC2
VPC
Subnet
Security Group
RDS
S3
```

12. Terraform vs Ansible

- Terraform
  - Manages infrastructure
```
VPC
Subnet
EC2
RDS
Load Balancer
S3
```

- Ansible
  - manages configuration and application/server state
```
Install Nginx
Configure Nginx
Install packages
Copy config
Deploy application
Restart service
```

```
Terraform files
      ↓
terraform init
      ↓
terraform plan
      ↓
Review changes
      ↓
terraform apply
      ↓
Infrastructure
```

13. Terraform Modules

- For larger infrastructure, we don't want one giant .tf file

```
modules/
├── vpc/
├── ec2/
├── database/
└── redis/
```