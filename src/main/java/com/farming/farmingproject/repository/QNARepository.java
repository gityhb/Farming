package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.QNA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QNARepository extends JpaRepository<QNA, Long> {
    @Query("SELECT qna FROM QNA qna JOIN FETCH qna.product JOIN FETCH qna.user WHERE qna.product.productId = :productId ORDER BY qna.qnaAt DESC")
    List<QNA> findByProductProductIdOrderByQnaAtDesc(@Param("productId") Long productId);

}
