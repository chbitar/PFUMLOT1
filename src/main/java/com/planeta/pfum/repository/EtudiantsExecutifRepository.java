package com.planeta.pfum.repository;

import com.planeta.pfum.domain.EtudiantsExecutif;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EtudiantsExecutif entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtudiantsExecutifRepository extends JpaRepository<EtudiantsExecutif, Long> {

}
