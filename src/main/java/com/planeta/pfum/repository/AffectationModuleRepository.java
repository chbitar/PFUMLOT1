package com.planeta.pfum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.AffectationModule;


/**
 * Spring Data  repository for the AffectationModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AffectationModuleRepository extends JpaRepository<AffectationModule, Long> {

}
