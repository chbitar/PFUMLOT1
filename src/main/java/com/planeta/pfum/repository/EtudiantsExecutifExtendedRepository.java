package com.planeta.pfum.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.EtudiantsExecutif;
import com.planeta.pfum.domain.Filiere;
import com.planeta.pfum.domain.enumeration.Niveau;


/**
 * Spring Data  repository for the EtudiantsExecutif entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtudiantsExecutifExtendedRepository extends EtudiantsExecutifRepository {

    List<EtudiantsExecutif> findAllByFiliere(Filiere fil);

	List<EtudiantsExecutif> findAllByUserId(Long id);

	List<EtudiantsExecutif> findBySuffixeContainingOrNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(String mot,
			String mot2, String mot3);

	Optional<EtudiantsExecutif> findOneByCinPassIgnoreCase(String cinPass);

	List<EtudiantsExecutif> findAllByNiveau(Niveau niveau);

	Optional<EtudiantsExecutif> findOneByUserId(Long id);

}
