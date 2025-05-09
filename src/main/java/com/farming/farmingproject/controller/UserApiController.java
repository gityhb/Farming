package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.Product;
import com.farming.farmingproject.domain.User;
import com.farming.farmingproject.domain.UserResponse;
import com.farming.farmingproject.dto.AddUserRequest;
import com.farming.farmingproject.service.UserService;
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
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class UserApiController {
    @Autowired
    private final UserService userService;

    //아이디 중복 확인 API
    @GetMapping("/check_user_id")
    public ResponseEntity<Map<String,Object>> checkUserIdDuplicate(@RequestParam(name ="userId") String userId) {
        boolean isDuplicate = userService.checkUserIdDuplicate(userId);
        Map<String, Object> response = new HashMap<>();

        try {
            response.put("isDuplicate", isDuplicate);
            if (isDuplicate) {
                response.put("message", "이미 존재하는 아이디 입니다.");
            } else {
                response.put("message", "사용 가능한 아이디 입니다.");
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "아이디 중복 확인 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    //닉네임 중복 확인
    @PostMapping("/check_user_nickname")
    public ResponseEntity<Map<String,Object>> checkUserNicknameDuplicate(@RequestBody AddUserRequest request) {
        String nickname = request.getNickname();

        boolean isNicknameDuplicate = userService.checkUserNicknameDuplicate(nickname);
        Map<String, Object> response = new HashMap<>();

        try {
            response.put("isNicknameDuplicate", isNicknameDuplicate);
            if (isNicknameDuplicate) {
                response.put("message", "이미 존재하는 닉네임 입니다.");
            } else {
                response.put("message", "사용 가능한 닉네임 입니다.");
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "닉네임 중복 확인 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

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
        UserResponse response = new UserResponse(user.getId(), user.getUserId(), user.getName(),user.getEmail(), user.getPhoneNumber(), user.getStoreName(), user.getAddress(), user.getAuthority(), user.getBusinessNumber());
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
    // 모든 사용자 불러오기
    @GetMapping("/user/all")
    public ResponseEntity<List<User>> getAllProducts() {
        List<User> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }
}
