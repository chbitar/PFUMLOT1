package com.planeta.pfum.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.Module;
import com.planeta.pfum.domain.enumeration.Semestre;


/**
 * Spring Data  repository for the Module entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ModuleExtendedRepository extends ModuleRepository{

    List<Module> findAllBySemestre(Semestre sem);
}
