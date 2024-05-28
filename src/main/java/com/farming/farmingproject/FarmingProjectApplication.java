package com.farming.farmingproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class FarmingProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(FarmingProjectApplication.class, args);
	}

}

@RestController
class SlideController {

	@GetMapping("/api/slides")
	public String[][] getSlides() {
		return new String[][]{
				{"Slide 1 - Text 1", "Slide 1 - Text 2", "Slide 1 - Text 3"},
				{"Slide 2 - Text 1", "Slide 2 - Text 2", "Slide 2 - Text 3"},
				{"Slide 3 - Text 1", "Slide 3 - Text 2", "Slide 3 - Text 3"}
		};
	}
}