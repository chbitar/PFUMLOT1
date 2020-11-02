package com.planeta.pfum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.AutreDocument;


/**
 * Spring Data  repository for the AutreDocument entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AutreDocumentRepository extends JpaRepository<AutreDocument, Long> {

}
