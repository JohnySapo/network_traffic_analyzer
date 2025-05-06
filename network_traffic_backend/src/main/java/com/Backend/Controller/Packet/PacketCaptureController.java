package com.Backend.Controller.Packet;

import com.Backend.Model.Packet.PacketLogger;
import com.Backend.Service.Packet.PacketCaptureService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/network-packet")
public class PacketCaptureController {

    private final PacketCaptureService packetCaptureService;

    public PacketCaptureController(PacketCaptureService packetCaptureService) {
        this.packetCaptureService = packetCaptureService;
    }

    @GetMapping("/start-packet")
    public ResponseEntity<String> startPacketCapture() {
        packetCaptureService.startNetworkPacketCapture();
        return ResponseEntity.ok("Network Packet Capture has been started");
    }

    @GetMapping("/packet-report")
    public List<PacketLogger> getPacketLogs() {
        return packetCaptureService.getPacketLoggers();
    }
}
