package com.company.product_management_springboot.service.category;

import com.company.product_management_springboot.model.Category;
import com.company.product_management_springboot.service.IGeneralService;

public interface ICategoryService extends IGeneralService<Category> {
    Iterable<Category> findByNameContaining(String name);
}
