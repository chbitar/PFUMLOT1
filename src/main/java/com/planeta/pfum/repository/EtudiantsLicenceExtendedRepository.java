package com.planeta.pfum.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.EtudiantsLicence;
import com.planeta.pfum.domain.Filiere;


/**
 * Spring Data  repository for the EtudiantsLicence entity.
 */
@SuppressWarnings("unused")
@Repository("etudiantsLicenceExtendedRepository")
public interface EtudiantsLicenceExtendedRepository extends EtudiantsLicenceRepository{

    List<EtudiantsLicence> findAllByFiliere(Filiere fil);

	List<EtudiantsLicence> findAllByUserId(Long id);

	List<EtudiantsLicence> findByNomOrPrenomAllIgnoreCase(String mot, String mot2);

	List<EtudiantsLicence> findByNomContainingOrPrenomContainingAllIgnoreCase(String mot, String mot2);

	List<EtudiantsLicence> findBySuffixeContainingOrNomContainingOrPrenomContainingAllIgnoreCase(String mot,String mot2,String mot3);

	List<EtudiantsLicence> findBySuffixeContainingOrNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(String mot,
			String mot2, String mot3);

	Optional<EtudiantsLicence> findOneByCinPassIgnoreCase(String cinPass);
}
