package com.Backend.Model.Packet.Protocol;

/*
 ** DNS header traffic class for PackerLogger
*/
public class DNSHeader {

    private int transactionID;
    private String operationCode;
    private String responseCode;
    private int questionCount;
    private int answerRecordCount;

    public DNSHeader() {}

    public DNSHeader(
            int transactionID,
            String operationCode,
            String responseCode,
            int questionCount,
            int answerRecordCount
    ) {
        this.transactionID = transactionID;
        this.operationCode = operationCode;
        this.responseCode = responseCode;
        this.questionCount = questionCount;
        this.answerRecordCount = answerRecordCount;
    }

    public int getTransactionID() {
        return transactionID;
    }

    public void setTransactionID(int transactionID) {
        this.transactionID = transactionID;
    }

    public String getOperationCode() {
        return operationCode;
    }

    public void setOperationCode(String operationCode) {
        this.operationCode = operationCode;
    }

    public String getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(String responseCode) {
        this.responseCode = responseCode;
    }

    public int getQuestionCount() {
        return questionCount;
    }

    public void setQuestionCount(int questionCount) {
        this.questionCount = questionCount;
    }

    public int getAnswerRecordCount() {
        return answerRecordCount;
    }

    public void setAnswerRecordCount(int answerRecordCount) {
        this.answerRecordCount = answerRecordCount;
    }
}
