package com.planeta.pfum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.EtudiantsLicence;

/**
 * Spring Data repository for the EtudiantsLicence entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtudiantsLicenceRepository extends JpaRepository<EtudiantsLicence, Long> {

}
