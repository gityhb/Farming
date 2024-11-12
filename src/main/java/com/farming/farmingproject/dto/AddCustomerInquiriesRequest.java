package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddCustomerInquiriesRequest {
    private long id;
    private long userId;
    private String userName;
    private String inquiriesTitle;
    private String inquiriesType;
    private String inquiriesContent;
    private int inquiriesStatus;
}
