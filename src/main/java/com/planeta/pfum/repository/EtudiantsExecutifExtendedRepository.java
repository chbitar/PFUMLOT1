package com.planeta.pfum.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.EtudiantsExecutif;
import com.planeta.pfum.domain.Filiere;


/**
 * Spring Data  repository for the EtudiantsExecutif entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtudiantsExecutifExtendedRepository extends EtudiantsExecutifRepository {

    List<EtudiantsExecutif> findAllByFiliere(Filiere fil);

	List<EtudiantsExecutif> findAllByUserId(Long id);
}
