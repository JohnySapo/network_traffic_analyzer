package com.Backend.Model.Packet.IPV4;

/*
 ** IPV4Flag header traffic class for PackerLogger
*/
public class IPV4Flag {

    private boolean reserved;
    private boolean dontFragment;
    private boolean moreFragments;

    public IPV4Flag() {}

    public IPV4Flag(boolean reserved, boolean dontFragment, boolean moreFragments) {
        this.reserved = reserved;
        this.dontFragment = dontFragment;
        this.moreFragments = moreFragments;
    }

    public boolean isReserved() {
        return reserved;
    }

    public void setReserved(boolean reserved) {
        this.reserved = reserved;
    }

    public boolean isDontFragment() {
        return dontFragment;
    }

    public void setDontFragment(boolean dontFragment) {
        this.dontFragment = dontFragment;
    }

    public boolean isMoreFragments() {
        return moreFragments;
    }

    public void setMoreFragments(boolean moreFragments) {
        this.moreFragments = moreFragments;
    }
}
