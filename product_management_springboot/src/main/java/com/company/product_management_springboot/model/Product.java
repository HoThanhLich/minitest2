package com.company.product_management_springboot.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "products")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

//    @Column(columnDefinition = "vachar(50)", nullable = false)
//    @NotEmpty
    private  String name;

//    @Column(nullable = false)
//    @NotNull
    private Double price;

//    @NotNull
    private Long quantity;

//    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String  description;

    @ManyToOne
    private Category category;

    private String image;

    public Product(String name, Double price, Long quantity, String description, Category category, String image) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.category = category;
        this.image = image;
    }
}
