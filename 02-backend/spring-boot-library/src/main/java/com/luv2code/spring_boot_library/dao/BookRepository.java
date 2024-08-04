package com.luv2code.spring_boot_library.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import com.luv2code.spring_boot_library.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

    //to let the search bar work by typeing keywords for books/title
    Page<Book> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);

}
