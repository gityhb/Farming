package com.farming.farmingproject.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "QNA")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QNA {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qna_id", nullable = false)
    private Long qnaId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; //작성자 가져오기

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductRG product; //product_id

    @Column(name = "qna_content", nullable = false)
    private String qnaContent;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @Column(name = "qna_date", nullable = false)
    private Timestamp qnaAt;

    @Column(name = "qna_status", nullable = false)
    private String qnaStatus= "답변대기"; //답변 상태

    @Column(name = "qna_answer", nullable = true)
    private String qnaAnswer;  //판매자 답변
    

    @Builder
    public QNA(User user, ProductRG product, String qnaContent, String qnaStatus, String qnaAnswer) {
        this.user = user;
        this.product = product;
        this.qnaContent = qnaContent;
        this.qnaStatus = qnaStatus;
        this.qnaAnswer = qnaAnswer;
        this.qnaAt = new Timestamp(System.currentTimeMillis());
    }

}