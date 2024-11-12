package com.farming.farmingproject.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Getter
@Table(name = "customer_inquiries")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CustomerInquiries {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "FK_USER_ID"))  // 외래키로 설정
    private User userId;
    
    @Column(name = "user_name", nullable = false)
    private String userName;
    
    @Column(name = "inquiries_title", nullable = false)
    private String inquiriesTitle;
    
    @Column(name = "inquiries_type", nullable = false)
    private String inquiriesType;
    
    @Column(name = "inquiries_content", nullable = false)
    private String inquiriesContent;
    
    @Column(name = "inquiries_status", nullable = false)
    private int inquiriesStatus;
    
    @Column(name = "inquiries_created_date", nullable = false)
    private Timestamp inquiriesCreatedDate;

    @Builder
    public CustomerInquiries(Long id, User userId, String userName, String inquiriesTitle, String inquiriesType, String inquiriesContent, int inquiriesStatus) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.inquiriesTitle = inquiriesTitle;
        this.inquiriesType = inquiriesType;
        this.inquiriesContent = inquiriesContent;
        this.inquiriesStatus = inquiriesStatus;
        this.inquiriesCreatedDate = new Timestamp(System.currentTimeMillis());
    }
}
