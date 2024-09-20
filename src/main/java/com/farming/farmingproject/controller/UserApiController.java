package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.User;
import com.farming.farmingproject.domain.UserResponse;
import com.farming.farmingproject.dto.AddUserRequest;
import com.farming.farmingproject.service.UserService;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class UserApiController {
    @Autowired
    private final UserService userService;



    // 회원가입 아이디 중복여부
//    @CrossOrigin(origins = "http://localhost:3000")
//    @GetMapping("/check_user_id")
////    @PermitAll // 이 메서드는 인증 없이 접근 가능
//    public ResponseEntity<Boolean> checkUserId(@RequestParam String userId) {
//        boolean isDuplicate = userService.checkUserIdDuplicate(userId);
//        return ResponseEntity.ok(isDuplicate);
//    }

    // 소비자 회원가입
    @PostMapping("/join_consumer")
    public ResponseEntity<Map<String, String>> signupConsumer(@RequestBody AddUserRequest request) {
        Map<String, String> response = new HashMap<>();
        try {
            request.setAuthority(1);  // 소비자 권한 설정
            userService.save(request);
            response.put("message", "회원가입 성공");
            return ResponseEntity.ok(response);  // 성공 응답
        } catch (Exception e) {
            response.put("message", "회원가입 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 판매자 회원가입
//    @PostMapping("/join_seller")
//    public String signupSeller(AddUserRequest request) {
//        request.setAuthority(2);
//        userService.save(request);  // 판매자 권한 2 설정
//        return "redirect:http://localhost:3000/login";   // 회원 가입이 완료된 이후에 로그인 페이지로 이동
//    }

    @PostMapping("/join_seller")
    public ResponseEntity<Map<String, String>> signupSeller(@RequestBody AddUserRequest request) {
        Map<String, String> response = new HashMap<>();
        try {
            request.setAuthority(2);  // 판매자 권한 설정
            userService.save(request);
            response.put("message", "회원가입 성공");
            return ResponseEntity.ok(response);  // 성공 응답
        } catch (Exception e) {
            response.put("message", "회원가입 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

//    @PostMapping("/user")
//    public String signup(AddUserRequest request) {
//        userService.save(request);  // 회원 가입 메서드 호출
//        return "redirect:http://localhost:3000/login";   // 회원 가입이 완료된 이후에 로그인 페이지로 이동
//    }

    // 사용자 정보 조회
    @GetMapping("/user")
    public ResponseEntity<UserResponse> getUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        // UserDetails에서 아이디를 추출하여 사용자 정보를 조회
        User user = userService.findByUserId(userDetails.getUsername());
        UserResponse response = new UserResponse(user.getId(), user.getUserId(), user.getName(), user.getAuthority());
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
