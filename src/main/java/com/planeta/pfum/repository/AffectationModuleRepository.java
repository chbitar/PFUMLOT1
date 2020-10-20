package com.planeta.pfum.repository;

import com.planeta.pfum.domain.AffectationModule;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AffectationModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AffectationModuleRepository extends JpaRepository<AffectationModule, Long> {

}
