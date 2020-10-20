package com.planeta.pfum.repository;

import com.planeta.pfum.domain.AutreDoc;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AutreDoc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AutreDocRepository extends JpaRepository<AutreDoc, Long> {

}
