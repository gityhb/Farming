package com.farming.farmingproject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {

    @GetMapping("/login")
    public String login(@RequestParam(value = "error", required = false) String error) {
        String redirectUrl = "http://localhost:3000/login";

        // 로그인 실패 시 메시지를 쿼리 파라미터로 전달
        if ("true".equals(error)) {
            redirectUrl += "?error=true";
        }

        return "redirect:" + redirectUrl;
    }
}