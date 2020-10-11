package com.planeta.pfum.repository;

import com.planeta.pfum.domain.CalendrierModule;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CalendrierModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CalendrierModuleRepository extends JpaRepository<CalendrierModule, Long> {

}
