package com.planeta.pfum.repository;

import com.planeta.pfum.domain.EmploieDuTemps;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EmploieDuTemps entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmploieDuTempsRepository extends JpaRepository<EmploieDuTemps, Long> {

}
