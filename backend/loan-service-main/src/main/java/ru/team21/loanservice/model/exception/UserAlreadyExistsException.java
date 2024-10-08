package ru.team21.loanservice.model.exception;


import org.springframework.http.HttpStatus;

public class UserAlreadyExistsException extends AuthenticationException {

    public UserAlreadyExistsException() {
        super("Email already is use", HttpStatus.CONFLICT);
    }
}
