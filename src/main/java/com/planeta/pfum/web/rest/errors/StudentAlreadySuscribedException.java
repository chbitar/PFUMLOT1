package com.planeta.pfum.web.rest.errors;

public class StudentAlreadySuscribedException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public StudentAlreadySuscribedException() {
        super(ErrorConstants.EMAIL_ALREADY_USED_TYPE, "Email is already in use!", "userManagement", "studentexists");
    }
}
