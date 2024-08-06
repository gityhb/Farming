package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.User;
import com.farming.farmingproject.domain.UserResponse;
import com.farming.farmingproject.dto.AddUserRequest;
import com.farming.farmingproject.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api")
public class UserApiController {
    private final UserService userService;

    @PostMapping("/user")
    public String signup(AddUserRequest request) {
        userService.save(request);  // 회원 가입 메서드 호출
        return "redirect:http://localhost:3000/login";   // 회원 가입이 완료된 이후에 로그인 페이지로 이동
    }

    // 사용자 정보 조회
    @GetMapping("/user")
    public ResponseEntity<UserResponse> getUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        // UserDetails에서 아이디를 추출하여 사용자 정보를 조회
        User user = userService.findByUserId(userDetails.getUsername());
        UserResponse response = new UserResponse(user.getUserId(), user.getName());
        return ResponseEntity.ok(response);

    }

//    @PostMapping("/logout")
//    public String logout(HttpServletRequest request, HttpServletResponse response) {
//        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
//        return "redirect:http://localhost:3000/main";
//    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());

        // 응답 헤더에 쿠키를 삭제하는 설정을 추가
        response.setHeader("Set-Cookie", "JSESSIONID=; Path=/; HttpOnly; Max-Age=0");

        // 로그아웃 후 200 OK 응답을 반환합니다.
        return ResponseEntity.ok().build();

    }
}