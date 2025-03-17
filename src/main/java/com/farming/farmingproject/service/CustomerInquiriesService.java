package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.CustomerInquiries;
import com.farming.farmingproject.domain.User;
import com.farming.farmingproject.dto.AddCustomerInquiriesRequest;
import com.farming.farmingproject.repository.CustomerInquiriesRepository;
import com.farming.farmingproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CustomerInquiriesService {
    @Autowired
    private final CustomerInquiriesRepository customerInquiriesRepository;
    @Autowired
    private final UserRepository userRepository;

    public CustomerInquiries save(AddCustomerInquiriesRequest dto) {
        User userId = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

        CustomerInquiries customerInquiries = CustomerInquiries.builder()
                .userId(userId)
                .userName(dto.getUserName())
                .inquiriesTitle(dto.getInquiriesTitle())
                .inquiriesType(dto.getInquiriesType())
                .inquiriesContent(dto.getInquiriesContent())
                .inquiriesStatus(dto.getInquiriesStatus())
                .build();

        return customerInquiriesRepository.save(customerInquiries);
    }

    // 모든 문의사항 가져오기
    public List<CustomerInquiries> findAllInquiries() {return customerInquiriesRepository.findAll();}
}
