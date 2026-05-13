package com.mysite.mysite.controller;

import com.mysite.mysite.model.Message;
import com.mysite.mysite.repository.MessageRepository;
import com.mysite.mysite.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE, RequestMethod.OPTIONS })
public class MessageController {

    private final MessageRepository messageRepository;
    private final JwtUtil jwtUtil;

    private boolean isAuthorized(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer "))
            return false;
        return jwtUtil.isTokenValid(authHeader.substring(7));
    }

    // POST — public (contact form)
    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody Map<String, String> body) {
        try {
            Message msg = new Message();
            msg.setName(body.getOrDefault("name", ""));
            msg.setEmail(body.getOrDefault("email", ""));
            msg.setMessage(body.getOrDefault("message", ""));
            msg.setRead(false);
            msg.setCreatedAt(LocalDateTime.now());
            messageRepository.save(msg);
            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // GET all — admin only
    @GetMapping
    public ResponseEntity<?> getAllMessages(
            @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAuthorized(auth))
            return ResponseEntity.status(401).body("Unauthorized");
        try {
            List<Message> messages = messageRepository.findAllOrderByCreatedAtDesc();
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // PUT mark read — admin only
    @PutMapping("/{id}/read")
    public ResponseEntity<?> markRead(
            @RequestHeader(value = "Authorization", required = false) String auth,
            @PathVariable("id") Long id) {
        if (!isAuthorized(auth))
            return ResponseEntity.status(401).body("Unauthorized");
        try {
            messageRepository.markAsRead(id);
            return ResponseEntity.ok(Map.of("success", true, "id", id));
        } catch (Exception e) {
            System.out.println("Mark read error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // DELETE — admin only
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(
            @RequestHeader(value = "Authorization", required = false) String auth,
            @PathVariable("id") Long id) {
        if (!isAuthorized(auth))
            return ResponseEntity.status(401).body("Unauthorized");
        try {
            messageRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            System.out.println("Delete error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}