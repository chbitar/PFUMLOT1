package com.planeta.pfum.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.CalendrierModule;
import com.planeta.pfum.domain.enumeration.Programme;


/**
 * Spring Data  repository for the CalendrierModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CalendrierModuleRepository extends JpaRepository<CalendrierModule, Long> {

	List<CalendrierModule> findAllByProgramme(Programme programme);

	List<CalendrierModule> findAllByModuleId(Long valueOf);

}
