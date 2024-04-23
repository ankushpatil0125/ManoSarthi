package com.team9.manosarthi_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@SpringBootApplication
@EnableTransactionManagement
public class ManosarthiBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ManosarthiBackendApplication.class, args);
	}

}
