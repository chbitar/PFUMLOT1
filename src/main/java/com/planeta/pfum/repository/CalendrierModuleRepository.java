package com.planeta.pfum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.CalendrierModule;


/**
 * Spring Data  repository for the CalendrierModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CalendrierModuleRepository extends JpaRepository<CalendrierModule, Long> {

}
