package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.ProductRG;
import com.farming.farmingproject.domain.QNA;
import com.farming.farmingproject.domain.User;
import com.farming.farmingproject.dto.AddQNARequest;
import com.farming.farmingproject.repository.ProductRGRepository;
import com.farming.farmingproject.repository.QNARepository;
import com.farming.farmingproject.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QNAService {

    @Autowired
    private QNARepository qnaRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRGRepository productRepository;

    @Transactional
    public QNA createQNA(AddQNARequest qnaRequest) {
        User user = userRepository.findById(qnaRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        ProductRG product = productRepository.findById(qnaRequest.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        QNA qna = QNA.builder()
                .user(user)
                .product(product)
                .qnaContent(qnaRequest.getQnaContent())
                .qnaStatus("답변대기")
                .build();

        return qnaRepository.save(qna);
    }

    public List<QNA> getQNAsByProduct(Long productId) {
        return qnaRepository.findByProductProductIdOrderByQnaAtDesc(productId);
    }

   /*@Transactional
    public QNA updateQNAAnswer(Long qnaId, String qnaAnswer) {
        QNA qna = qnaRepository.findById(qnaId)
                .orElseThrow(() -> new RuntimeException("해당 QNA를 찾을 수 없습니다."));

        qna.setQnaAnswer(qnaAnswer);
        qna.setQnaStatus("답변 완료"); // 상태를 "답변 완료"로 변경
        return qnaRepository.save(qna); // 업데이트된 QNA 반환
    }*/

    @Transactional
    public void replyToQNA(Long qnaId, String qnaAnswer) {
        // QNA ID로 해당 QNA 엔티티를 찾습니다.
        QNA qna = qnaRepository.findById(qnaId)
                .orElseThrow(() -> new RuntimeException("QNA를 찾을 수 없습니다."));

        // QNA의 답변과 상태를 업데이트합니다.
        qna.setQnaAnswer(qnaAnswer);
        qna.setQnaStatus("답변 완료");

        // 변경 사항을 저장합니다.
        qnaRepository.save(qna);
    }
}
