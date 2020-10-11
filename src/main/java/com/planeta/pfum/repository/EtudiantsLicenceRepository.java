package com.planeta.pfum.repository;

import com.planeta.pfum.domain.EtudiantsLicence;
import com.planeta.pfum.domain.Filiere;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the EtudiantsLicence entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtudiantsLicenceRepository extends JpaRepository<EtudiantsLicence, Long> {

    List<EtudiantsLicence> findAllByFiliere(Filiere fil);
}
