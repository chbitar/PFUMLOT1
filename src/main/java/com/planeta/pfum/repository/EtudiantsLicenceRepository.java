package com.planeta.pfum.repository;

import com.planeta.pfum.domain.EtudiantsLicence;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EtudiantsLicence entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtudiantsLicenceRepository extends JpaRepository<EtudiantsLicence, Long> {

}
