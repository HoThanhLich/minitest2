package com.company.product_management_springboot.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductForm {

    private Long id;
    private  String name;
    private Double price;
    private Long quantity;
    private String  description;
    private Category category;
    private MultipartFile image;

    public ProductForm(String name, Double price, Long quantity, String description, Category category, MultipartFile image) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.category = category;
        this.image = image;
    }
}
