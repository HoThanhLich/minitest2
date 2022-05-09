package com.company.product_management_springboot.repository;

import com.company.product_management_springboot.model.Category;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoryRepository extends PagingAndSortingRepository<Category, Long> {

    Iterable<Category> findByNameContaining(String name);
}
