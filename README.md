# Network Traffic Analyzer Application - TU765 Cyber Security

This Network Traffic Analyzer Application was developed as part of the TU765 Cyber Security project and specifically designed for Irish people and common users who wants to better understand and protect their personal network traffic and data. Whether at home or on a public WI-FI, this tool helps the user to spot unusual activity and detect potential threats, staying informed about their online security.

## Technologies

| Frontend | Backend |
|---|---|
| Shadcn UI | Java/JDK v21 |
| Node JS v20 | Maven v3.9 |
| Vite JS v6.2 | PostgreSQL v17 |
| JWT Decode v4.0 | JWT O.Auth0 |
| Tailwindcss v4.0.11 | Spring Boot & Security |
| Docker & Docker Compose | Docker & Docker Compose |
||

## Prerequisite

#### Mandatory

- **Git** - [Download](https://git-scm.com/downloads) - Help to clone the project to your machine
- **Docker** - Recommended [ [Docker Desktop](https://www.docker.com/products/docker-desktop/) ]

#### Optional - For Development

- Java 21 [ [JDK 21](https://www.oracle.com/ie/java/technologies/downloads/) ]
- Maven [ [v3.9.9](https://maven.apache.org/download.cgi)]
- Node JS [ [v20.19.0](https://nodejs.org/en/download) ]
- PostgreSQL [ [Version 17](https://www.postgresql.org/download/) ]
- An IDEA of Preference [ **Recommended**: [Vscode](https://code.visualstudio.com/download) ( **Frontend** ), [Intellij Community](https://www.jetbrains.com/idea/download/?section=windows) ( **Backend** ) ]

# Getting Started with the Application via Docker
### Follow the instruction below to initiate the application via docker container.

Open Git Bash & Clone the Repository to your local machine

```bash
git clone https://github.com/JohnySapo/network_traffic_analyzer.git
```
Open the Command-Line (CMD), System's shell or a similar Terminal, then change the directory to where the application is downloaded (Folder).

```bash
Disk C:/Users/Your-Machine-Name/Where-Saved/network_traffic_analyzer
```

Once inside the application directory, run the following Docker Command to remove any existing Container & Images of the application in your Docker/Docker Desktop. [ **Recommended**!! if you runned it before in an old version, do it to reset the configuration ]

```bash
docker compose down --rmi all
```
Mount & Start the application with the Docker Command.
```bash
docker compose up
```
Stop the application with the Docker Command
```bash
docker compose down
```

After the command **docker compose up**, wait the container to mount and verify if it finished with the same screenshot below.

![docker-start-up](https://github.com/JohnySapo/network_traffic_analyzer/blob/main/documents/screenshots/docker-start-up.jpg?raw=true)

Once the container is mounted, open a browser of your preference [ **Recommended**: Google Chrome ] and open the url below to access the application.

````bash
http://localhost:5123
````
![app-main-page](https://github.com/JohnySapo/network_traffic_analyzer/blob/main/documents/screenshots/app-main-page.jpg?raw=true)

## Backend - API Design

| Name | URL | Permission | HTTP Method |
|---|---|---|---|
| Login | http://network-traffic-backend:8080/auth/login/ | Role ALL | POST |
| Logout | http://network-traffic-backend:8080/auth/logout/ | Role ALL | POST |
| Register | http://network-traffic-backend:8080/auth/register/ | Role ALL | POST |
| User Info | http://network-traffic-backend:8080/user/hello/ | Role USER | GET |
| |