package com.planeta.pfum.repository;

import com.planeta.pfum.domain.ModalitePaiement;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ModalitePaiement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ModalitePaiementRepository extends JpaRepository<ModalitePaiement, Long> {

}
