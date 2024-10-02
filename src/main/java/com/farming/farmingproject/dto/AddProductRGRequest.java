package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class AddProductRGRequest {
    private long productId; //상품 id
    private String sellerId; //판매자 id
    private String productName; //상품명
    private String storeName;  //판매가게명
    private int productPrice1; // 중량 숫자
    private String productPrice2; //중량 단위
    private int productPrice3; //가격
    private String productOrigin; //원산지
    private String productDeliveryDate;  //배송날짜
    //위에거는 product 테이블에서 가져오기
    private String productimgPath;  //상품이미지
    private String productInfoimgPath;  //상품설명(이미지예정)
    private int productStatus; //관리자 승인여부
    private int sellcount; //판매건수
    private float astar; //평균 별점 <<리뷰 테이블에 있는 별점 평균으로 가져올건지~
    private int salenum; //세일 퍼센트
}
