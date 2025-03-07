FROM maven:3.9.8-eclipse-temurin-21

WORKDIR ./network_traffic_backend
COPY pom.xml .
COPY . .
RUN mvn clean install -DskipTests

CMD ["mvn", "spring-boot:run"]

#
##PRODUCTION CONFIGURATION
#

#FROM eclipse-temurin:21-jdk
#WORKDIR ./network_traffic_backend
#COPY --from=build ./target/network_traffic_backend-0.0.1-SNAPSHOT.jar app.jar
#ENTRYPOINT ["java", "-jar", "/app/app.jar"]
