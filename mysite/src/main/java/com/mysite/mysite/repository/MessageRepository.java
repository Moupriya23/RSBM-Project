package com.mysite.mysite.repository;

import com.mysite.mysite.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m ORDER BY m.createdAt DESC")
    List<Message> findAllOrderByCreatedAtDesc();

    @Modifying
    @Transactional
    @Query("UPDATE Message m SET m.read = true WHERE m.id = :id")
    void markAsRead(@Param("id") Long id);

    long countByReadFalse();
}