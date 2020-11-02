package com.planeta.pfum.repository;

import java.util.List;
import java.util.Optional;

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

	List<EtudiantsMaster> findByNomOrPrenomAllIgnoreCase(String mot, String mot2);

	List<EtudiantsMaster> findBySuffixeContainingOrNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(String mot,
			String mot2, String mot3);

	Optional<EtudiantsMaster> findOneByCinPassIgnoreCase(String cinPass);
	
}
