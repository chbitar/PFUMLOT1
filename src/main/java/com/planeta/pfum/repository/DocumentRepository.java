package com.planeta.pfum.repository;

import com.planeta.pfum.domain.Document;
import com.planeta.pfum.domain.Module;
import com.planeta.pfum.domain.enumeration.TypeDocument;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Document entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

	List<Document> findAllByTypeDocument(TypeDocument type);

}
