package com.planeta.pfum.repository;

import com.planeta.pfum.domain.EtudiantsLicence;
import com.planeta.pfum.domain.EtudiantsMaster;
import com.planeta.pfum.domain.Filiere;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the EtudiantsMaster entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtudiantsMasterRepository extends JpaRepository<EtudiantsMaster, Long> {


    List<EtudiantsMaster> findAllByFiliere(Filiere fil);
}
