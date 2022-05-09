package com.company.product_management_springboot.service.product;

import com.company.product_management_springboot.model.Product;
import com.company.product_management_springboot.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface IProductService extends IGeneralService<Product> {

    Page<Product> findAll(Pageable pageable);

    Page<Product> findByNameContaining(String name, Pageable pageable);
}
