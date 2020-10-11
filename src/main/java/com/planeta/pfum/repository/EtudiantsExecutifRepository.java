package com.planeta.pfum.repository;

import com.planeta.pfum.domain.EtudiantsExecutif;
import com.planeta.pfum.domain.Filiere;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the EtudiantsExecutif entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtudiantsExecutifRepository extends JpaRepository<EtudiantsExecutif, Long> {

    List<EtudiantsExecutif> findAllByFiliere(Filiere fil);

	List<EtudiantsExecutif> findAllByUserId(Long id);
}
