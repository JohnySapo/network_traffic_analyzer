FROM maven:3.9.8-eclipse-temurin-21
WORKDIR ./network_traffic_backend
COPY pom.xml .
COPY . .
RUN mvn clean install -DskipTests
CMD ["mvn", "spring-boot:run"]