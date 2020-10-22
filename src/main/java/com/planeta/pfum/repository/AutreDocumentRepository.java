package com.planeta.pfum.repository;

import com.planeta.pfum.domain.AutreDocument;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AutreDocument entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AutreDocumentRepository extends JpaRepository<AutreDocument, Long> {

}
