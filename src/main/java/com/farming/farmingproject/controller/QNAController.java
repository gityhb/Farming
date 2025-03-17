package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.QNA;
import com.farming.farmingproject.dto.AddQNARequest;
import com.farming.farmingproject.repository.QNARepository;
import com.farming.farmingproject.service.QNAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/qna")
public class QNAController {

    @Autowired
    private QNAService qnaService;
    private QNARepository qnaRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createQNA(@RequestBody AddQNARequest qnaRequest) {
        try {
            QNA createdQNA = qnaService.createQNA(qnaRequest);
            return ResponseEntity.ok(createdQNA);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("QNA 생성 실패: " + e.getMessage());
        }
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<QNA>> getQNAsByProduct(@PathVariable("productId") Long productId) {
        List<QNA> qnaList = qnaService.getQNAsByProduct(productId);
        if (qnaList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(qnaList); // 204 No Content
        }
        return ResponseEntity.ok(qnaList);
    }

    /*@PostMapping("/{qnaId}/reply")
    public ResponseEntity<?> replyToQNA(@PathVariable("qnaId") Long qnaId, @RequestBody Map<String, String> request) {
        try {
            String qnaAnswer = request.get("qnaAnswer");
            QNA updatedQNA = qnaService.updateQNAAnswer(qnaId, qnaAnswer); // 답변 업데이트
            return ResponseEntity.ok(updatedQNA); // 업데이트된 QNA 반환
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("답변 저장 실패: " + e.getMessage());
        }
    }*/

    @PostMapping("/{qnaId}/reply")
    public ResponseEntity<?> replyToQNA(@PathVariable("qnaId") Long qnaId, @RequestBody Map<String, String> requestBody) {
        try {
            String qnaAnswer = requestBody.get("qnaAnswer");
            qnaService.replyToQNA(qnaId, qnaAnswer);
            return ResponseEntity.ok().body("답변이 성공적으로 저장되었습니다."); // 성공 응답 반환
        } catch (Exception e) {
            e.printStackTrace(); // 예외 상세 로그 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("답변 저장 실패: " + e.getMessage()); // 에러 메시지와 함께 500 오류 반환
        }
    }

}
