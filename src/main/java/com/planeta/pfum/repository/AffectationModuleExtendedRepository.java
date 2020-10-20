package com.planeta.pfum.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.AffectationModule;
import com.planeta.pfum.domain.enumeration.Semestre;


/**
 * Spring Data  repository for the AffectationModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AffectationModuleExtendedRepository extends AffectationModuleRepository {

    List<AffectationModule> findAllBySemestre(Semestre sem);

    List<AffectationModule> findAllWithModuleByProfesseurId(Long id);


}
