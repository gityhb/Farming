package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.CustomerInquiries;
import com.farming.farmingproject.dto.AddCustomerInquiriesRequest;
import com.farming.farmingproject.service.CustomerInquiriesService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/customer_inquiries")
public class CustomerInquiriesController {
    @Autowired
    private CustomerInquiriesService customerInquiriesService;

    // 문의 등록하기
    @PostMapping("/register")
    public ResponseEntity<?> registerInquiries(@RequestBody AddCustomerInquiriesRequest request) {
        try {
            request.setInquiriesStatus(0);
            customerInquiriesService.save(request);

            return ResponseEntity.ok().body("문의 등록에 성공했습니다.");
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 모든 문의사항 가져오기
    @GetMapping("/all")
    public ResponseEntity<List<CustomerInquiries>> getAllCustomerInquiries() {
        List<CustomerInquiries> customerInquiries = customerInquiriesService.findAllInquiries();
        return ResponseEntity.ok(customerInquiries);
    }
}
