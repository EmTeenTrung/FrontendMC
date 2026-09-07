package com.chitrung.minecraft_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ServerController {
    private String serverStatus = "offline";
    @GetMapping("/api/server/status")
    public Map<String, String> status() {
        return Map.of("status", serverStatus);
    }
    @PostMapping("/api/server/start")
    public Map<String,String> start() {
        serverStatus = "online";
        return Map.of("status", serverStatus);
    }
    @PostMapping("/api/server/stop")
    public Map<String,String> stop() {
        serverStatus = "offline";
        return Map.of("status", serverStatus);
    }
    @PostMapping("/api/server/restart")
    public Map<String,String> restart() {
        serverStatus = "offline";
        return Map.of("status", serverStatus);
    }
}
