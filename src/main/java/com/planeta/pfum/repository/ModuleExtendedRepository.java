package com.planeta.pfum.repository;

import com.planeta.pfum.domain.Module;
import com.planeta.pfum.domain.enumeration.Semestre;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Module entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ModuleExtendedRepository extends ModuleRepository{

    List<Module> findAllBySemestre(Semestre sem);
}
