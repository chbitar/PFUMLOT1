package com.planeta.pfum.repository;

import com.planeta.pfum.domain.AffectationModule;
import com.planeta.pfum.domain.enumeration.Semestre;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the AffectationModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AffectationModuleRepository extends JpaRepository<AffectationModule, Long> {

    List<AffectationModule> findAllBySemestre(Semestre sem);

    List<AffectationModule> findAllWithModuleByProfesseurId(Long id);

//	List<AffectationModule> findAllWithModule();

}
