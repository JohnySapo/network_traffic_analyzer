# Network Traffic Analyzer Application - TU765 Cyber Security

This Network Traffic Analyzer Application was developed as part of the TU765 Cyber Security project and specifically designed for Irish people and common users who wants to better understand and protect their personal network traffic and data. Whether at home or on a public WI-FI, this tool helps the user to spot unusual activity and detect potential threats, staying informed about their online security.

## Technologies

| Frontend | Backend |
|---|---|
| Shadcn UI v4.1.3 | Java/JDK v21 |
| Radix UI v4.1.3 | Maven v3.9 |
| Node JS v20 | PostgreSQL v17 |
| Vite JS v6.2 | JWT O.Auth0 |
| JWT Decode v4.0 | Spring Boot & Security |
| Tailwindcss v4.0.11 |Pcap4J & Npcap|
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
- An IDEA of Preference [ **Recommended**: [Vscode](https://code.visualstudio.com/download) ( **Frontend** ), [IntelliJ Community](https://www.jetbrains.com/idea/download/?section=windows) ( **Backend** ) ]

# Getting Started with the Application

## Follow the instruction below to initiate the application via docker container without live network packet capture.

Open Git Bash & Clone the Repository to your local machine

```bash
git clone https://github.com/JohnySapo/network_traffic_analyzer.git
```
Open the Command-Line (CMD), System's shell or a similar Terminal, then change the directory to where the application is downloaded (Folder).

```bash
Example: C:/Users/Your-Machine-Name/Where-Saved/network_traffic_analyzer
```

Once inside the application directory, run the following Docker Command to remove any existing Container & Images of the application in your Docker/Docker Desktop. [ **Recommended**!! if you runned the application before in an old version, do it to reset the configuration ]

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

## Follow the instruction below to initiate the application manually with live network packet capture.

`WARNING`: This method required the `docker compose up` command installed and the Postgres container must be running ONLY.

The application with live network traffic needs at least two IDEs and Npcap installed and defined in the local machine's environment to start capturing all the network data and

- **IDEs Recommended**: [Vscode](https://code.visualstudio.com/download) ( **Frontend** ), [Intellij Community](https://www.jetbrains.com/idea/download/?section=windows) ( **Backend** )
- **Npcap**: [Download](https://npcap.com/#download)

**Installing and Defining Npcap to Windows environment**

After Npcap downloaded, go to windows system environment

```bash
Windows Key + Search `Edit environment variables for your account`
```

In "User variables for #your pc username" click on **NEW** button and add the values defined in the boxes one at the time below and save.

First value
```bash
Variable name: jna.library.path
Variable value: C:\Windows\System32\Npcap
```

Second value
```bash
Variable name: org.pcap4j.core.packetLibName
Variable value: C:\Windows\System32\Npcap\Packet.dll
```

Third value
```bash
Variable name: org.pcap4j.core.pcapLibName
Variable value: C:\Windows\System32\Npcap\wpcap.dll:
```
After the new variables are setup, proceed to the IDEs and open the following folders to run each application (Backend & Frontend)

### IntelliJ IDE 

**Step #1**  

Open Directory : your-pc-path/network_traffic_analyzer > network_traffic_backend  

**Step #2**  

Navigate to packages and select the App class: src > main > java > com.Backend > Service > `PacketCaptureService.java` and past your machine's local IP address.  

![packet-service-class](https://github.com/JohnySapo/network_traffic_analyzer/blob/main/documents/screenshots/packet-service-class.jpg?raw=true)

**Step #3** 

Navigate to packages and select the App class: src > main > java > com.Backend > `NetworkTrafficAnalyzerBackendApplication.java`  

Once selected press : `Left Shift + F9` to run the application.

### Vscode IDE

**Step #1**  

Open Directory : your-pc-path/network_traffic_analyzer > network_traffic_frontend  

**Step #2**  

Navigate to package and select **vite.config.ts** file : network_traffic_frontend > `vite.config.ts` 

Now uncomment the `localhost:8081` and comment the `network-traffic-backend:8080`.

![vite-proxy-port](https://github.com/JohnySapo/network_traffic_analyzer/blob/main/documents/screenshots/vite-proxy-port.jpg?raw=true)

In your VSCode open the terminal and run the command `npm run dev`

#### Now just open the in a browser the localhost to access the application

````bash
http://localhost:5123
````

# Backend - API Design

### Authentication API Endpoints

| Name | URL | Permission | HTTP Method |
|---|---|---|---|
| Login | http://network-traffic-backend:8080/auth/login/ | Role ADMIN & USER | POST |
| Logout | http://network-traffic-backend:8080/auth/logout/ | Role ADMIN & USER | POST |
| Register | http://network-traffic-backend:8080/auth/register/ | Role ADMIN & USER | POST |
| CSRF Token Provider | http://network-traffic-backend:8080/auth/csrf-token/ | Role ADMIN & USER | GET |
| |

### User Account API Endpoints

| Name | URL | Permission | HTTP Method |
|---|---|---|---|
| Account Info | http://network-traffic-backend:8080/user/account/ | Role USER | GET |
| Update Account | http://network-traffic-backend:8080/user/update-account/ | Role USER | PUT |
| Reset Password | http://network-traffic-backend:8080/user/update-password/ | Role USER | PUT |
| |

### Network Packet Capture API Endpoints

| Name | URL | Permission | HTTP Method |
|---|---|---|---|
| Start Packet Capture | http://network-traffic-backend:8080/network-packet/start-packet/ | Role ADMIN & USER | GET |
| Report Packet Logs | http://network-traffic-backend:8080/network-packet/packet-report/ | Role ADMIN & USER | GET |
| |

### Abuse IP Database API Endpoints

| Name | URL | Permission | HTTP Method |
|---|---|---|---|
| Blacklist IP Addresses| http://network-traffic-backend:8080/abuseIP/blacklist/ | Role ADMIN & USER | GET |
| Header Report | http://network-traffic-backend:8080/abuseIP/header-report/ | Role ADMIN & USER | GET |
| Check IP Address | http://network-traffic-backend:8080/abuseIP/check/ | Role ADMIN & USER | GET |
| |

#### API Endpoints Parameters

Check IP Address Parameters
```bash
/abuseIP/check?ipAddress=0.0.0.0
```
Blacklist IP Address Parameters
```bash
/abuseIP/blacklist?countryCode=IE&page=0&size=12&sort=lastReportedAt,desc
```
