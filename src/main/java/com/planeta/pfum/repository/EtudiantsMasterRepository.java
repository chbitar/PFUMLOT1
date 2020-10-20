package com.planeta.pfum.repository;

import com.planeta.pfum.domain.EtudiantsMaster;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EtudiantsMaster entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtudiantsMasterRepository extends JpaRepository<EtudiantsMaster, Long> {

}
