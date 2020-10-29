package com.planeta.pfum.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.Filiere;

/**
 * Spring Data repository for the Filiere entity.
 */
@Repository
public interface FiliereExtendedRepository extends FiliereRepository {

	List<Filiere> findAllByEtablissementId(Long etab);

}
