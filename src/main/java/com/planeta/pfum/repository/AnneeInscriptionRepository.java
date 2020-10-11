package com.planeta.pfum.repository;

import com.planeta.pfum.domain.AnneeInscription;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AnneeInscription entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnneeInscriptionRepository extends JpaRepository<AnneeInscription, Long> {

}
