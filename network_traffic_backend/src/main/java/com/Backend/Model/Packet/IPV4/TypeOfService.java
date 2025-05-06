package com.Backend.Model.Packet.IPV4;

/*
 ** TOS header (TypeOfService) traffic class for PackerLogger
*/
public class TypeOfService {

    private int precedence;
    private int typeOfService;
    private int mustBeZero;

    public TypeOfService() {}

    public TypeOfService(int precedence, int typeOfService, int mustBeZero) {
        this.precedence = precedence;
        this.typeOfService = typeOfService;
        this.mustBeZero = mustBeZero;
    }

    public int getPrecedence() {
        return precedence;
    }

    public void setPrecedence(int precedence) {
        this.precedence = precedence;
    }

    public int getTypeOfService() {
        return typeOfService;
    }

    public void setTypeOfService(int typeOfService) {
        this.typeOfService = typeOfService;
    }

    public int getMustBeZero() {
        return mustBeZero;
    }

    public void setMustBeZero(int mustBeZero) {
        this.mustBeZero = mustBeZero;
    }
}
