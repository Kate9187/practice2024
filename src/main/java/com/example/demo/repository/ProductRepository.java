package com.example.demo.repository;

import java.util.List;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long c_Id);

    List<Product> findByNameContaining(String name);

    List<Product> findByPrice(Long price);

    @Transactional
    void deleteByCategoryId(long categoryId);
}