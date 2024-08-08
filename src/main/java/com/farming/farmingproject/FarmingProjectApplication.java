package com.farming.farmingproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@EnableJpaAuditing
@SpringBootApplication
public class FarmingProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(FarmingProjectApplication.class, args);
	}

}

@RestController
class SlideController {

	@GetMapping("/api/slides")
	public List<Slide> getSlides() {
		return List.of(
				new Slide( "FARMING 파밍", "2024.04.30(TUES)", "저희는 직거래 국내산 농산물만 취급합니다.\n" +
						"신선하고 다양한 농산물을 만나보세요!", "img/main/main1.png"),
				new Slide("특가 타임 세일", "2024.04.30(TUES)", "16:00 - 17:00","img/main/main2.png"),
				new Slide("", "", "","img/main/main3.png")
		);
	}

	/*@GetMapping("/api/slides")
	public String[][] getSlides() {
		return new String[][]{
				{"2024.04.30(TUES)", "FARMING 파밍", "저희는 직거래 국내산 농산물만 취급합니다.\n" +
						"신선하고 다양한 농산물을 만나보세요!"},
				{"2024.04.30(TUES)", "특가 타임 세일", "16:00 - 17:00"},
				{"오늘의 추천", "Slide 3 - Text 2", "Slide 3 - Text 3"}
		};
	}*/
}