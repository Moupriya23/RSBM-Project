package com.mysite.mysite.service;

import com.mysite.mysite.model.Product;
import com.mysite.mysite.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));
    }

    public List<Product> getByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public Product addProduct(Product product) {
        product.setId(null); // force insert
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updated) {
        // Check exists first
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found: " + id);
        }
        // Set the correct ID
        updated.setId(id);
        return productRepository.save(updated);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found: " + id);
        }
        productRepository.deleteById(id);
    }
}