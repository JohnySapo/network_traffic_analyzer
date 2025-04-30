package com.Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/*
 ** This Class - Network Traffic Analyzer Backend Application
 ** is the Main Entry Point of the application which launch all
 ** the features and API calls
*/
@SpringBootApplication
@EnableScheduling
public class NetworkTrafficAnalyzerBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(NetworkTrafficAnalyzerBackendApplication.class, args);
	}
}
