package com.planeta.pfum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.AnneeInscription;


/**
 * Spring Data  repository for the AnneeInscription entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnneeInscriptionRepository extends JpaRepository<AnneeInscription, Long> {

}
