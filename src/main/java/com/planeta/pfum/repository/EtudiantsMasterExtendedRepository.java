package com.planeta.pfum.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.EtudiantsMaster;
import com.planeta.pfum.domain.Filiere;


/**
 * Spring Data  repository for the EtudiantsMaster entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtudiantsMasterExtendedRepository extends EtudiantsMasterRepository {


    List<EtudiantsMaster> findAllByFiliere(Filiere fil);

	List<EtudiantsMaster> findAllByUserId(Long id);
}
