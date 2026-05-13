package com.mysite.mysite.controller;

import com.mysite.mysite.model.Product;
import com.mysite.mysite.security.JwtUtil;
import com.mysite.mysite.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE, RequestMethod.OPTIONS })
public class ProductController {

    private final ProductService productService;
    private final JwtUtil jwtUtil;

    private boolean isAuthorized(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer "))
            return false;
        return jwtUtil.isTokenValid(authHeader.substring(7));
    }

    // GET all — public
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // GET single — public
    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(productService.getProductById(id));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Product not found");
        }
    }

    // GET by category — public
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getByCategory(@PathVariable("category") String category) {
        return ResponseEntity.ok(productService.getByCategory(category));
    }

    // GET search — public
    @GetMapping("/search")
    public ResponseEntity<List<Product>> search(@RequestParam("name") String name) {
        return ResponseEntity.ok(productService.searchByName(name));
    }

    // POST add — admin only
    @PostMapping
    public ResponseEntity<?> addProduct(
            @RequestHeader(value = "Authorization", required = false) String auth,
            @RequestBody Product product) {
        if (!isAuthorized(auth))
            return ResponseEntity.status(401).body("Unauthorized");
        try {
            return ResponseEntity.ok(productService.addProduct(product));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    // PUT update — admin only
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @RequestHeader(value = "Authorization", required = false) String auth,
            @PathVariable("id") Long id,
            @RequestBody Product product) {
        if (!isAuthorized(auth))
            return ResponseEntity.status(401).body("Unauthorized");
        try {
            return ResponseEntity.ok(productService.updateProduct(id, product));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    // DELETE — admin only
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(
            @RequestHeader(value = "Authorization", required = false) String auth,
            @PathVariable("id") Long id) {
        if (!isAuthorized(auth))
            return ResponseEntity.status(401).body("Unauthorized");
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok("Product deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}