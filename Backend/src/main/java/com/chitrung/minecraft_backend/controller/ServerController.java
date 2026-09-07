package com.chitrung.minecraft_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class ServerController {
    @GetMapping("/api/server/status")
    public Map<String, String> status() {
    return Map.of("status", "offline");
    }
}
