package com.Backend.Model.Packet.HEXHeader;

/*
 ** HEX header traffic class for PackerLogger
*/
public class HEXStream {

    private int length;
    private String hexStream;

    public HEXStream() {}

    public HEXStream(int length, String hexStream) {
        this.length = length;
        this.hexStream = hexStream;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public String getHexStream() {
        return hexStream;
    }

    public void setHexStream(String hexStream) {
        this.hexStream = hexStream;
    }
}
