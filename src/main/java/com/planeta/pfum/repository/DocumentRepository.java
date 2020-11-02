package com.planeta.pfum.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.Document;
import com.planeta.pfum.domain.enumeration.TypeDocument;


/**
 * Spring Data  repository for the Document entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

	List<Document> findAllByTypeDocument(TypeDocument type);

}
