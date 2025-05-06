package com.Backend.Model.Packet.Protocol;

/*
 ** TCPFlag header traffic class for PackerLogger
*/
public class TCPFlag {

    private boolean URG;
    private boolean ACK;
    private boolean PSH;
    private boolean RST;
    private boolean SYN;
    private boolean FIN;

    public TCPFlag() {}

    public TCPFlag(boolean URG, boolean ACK, boolean PSH, boolean RST, boolean SYN, boolean FIN) {
        this.URG = URG;
        this.ACK = ACK;
        this.PSH = PSH;
        this.RST = RST;
        this.SYN = SYN;
        this.FIN = FIN;
    }

    public boolean isURG() {
        return URG;
    }

    public void setURG(boolean URG) {
        this.URG = URG;
    }

    public boolean isACK() {
        return ACK;
    }

    public void setACK(boolean ACK) {
        this.ACK = ACK;
    }

    public boolean isPSH() {
        return PSH;
    }

    public void setPSH(boolean PSH) {
        this.PSH = PSH;
    }

    public boolean isRST() {
        return RST;
    }

    public void setRST(boolean RST) {
        this.RST = RST;
    }

    public boolean isSYN() {
        return SYN;
    }

    public void setSYN(boolean SYN) {
        this.SYN = SYN;
    }

    public boolean isFIN() {
        return FIN;
    }

    public void setFIN(boolean FIN) {
        this.FIN = FIN;
    }
}
