package com.planeta.pfum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.EmploieDuTemps;


/**
 * Spring Data  repository for the EmploieDuTemps entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmploieDuTempsRepository extends JpaRepository<EmploieDuTemps, Long> {

}
