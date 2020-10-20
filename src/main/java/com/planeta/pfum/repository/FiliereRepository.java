package com.planeta.pfum.repository;

import com.planeta.pfum.domain.Etablissement;
import com.planeta.pfum.domain.Filiere;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Filiere entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FiliereRepository extends JpaRepository<Filiere, Long> {

    List<Filiere> findAllByEtablissement(Etablissement etab);

	List<Filiere> findAllByEtablissementId(Long etab);
}
